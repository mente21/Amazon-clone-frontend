import React, { useContext, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { datacontext } from '../../components/data provider/Dataprovider';
import classes from './payment.module.css';
import { Rating } from '@mui/material';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from '../../api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { type } from '../../components/utilities/ActionType';

function PaymentKey() {
  const [{ user, basket }, dispatch] = useContext(datacontext);

  const [error, seterror] = useState(null);
  const [processing, setprocessing] = useState(false);

  const total = basket.reduce((currentTotal, item) => {
    return item.price * item.amount + currentTotal;
  }, 0);

  const totalItems = basket?.reduce((total, item) => total + item.amount, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const Handelchange = (e) => {
    if (e.error) {
      seterror(e.error.message);
    } else {
      seterror("");
    }
  };

  const handlpayment = async (e) => {
    e.preventDefault();
    setprocessing(true);

    try {
      // get client secret from backend
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded ✅:", paymentIntent);

        // Clean basket (prevent Firestore undefined errors)
        const cleanBasket = basket.map((item) => ({
          ...item,
          category: item.category ?? null,
          rating: {
            rate: item.rating?.rate ?? 0,
            count: item.rating?.count ?? 0,
          },
        }));

        try {
          await db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: cleanBasket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

          console.log("Order stored in Firestore ✅");

          // Empty basket
          dispatch({ type: type.EMPTY_BASKET });

          // Navigate AFTER saving
          navigate("/order", {
            state: { msg: "you have placed new order" },
          });
        } catch (fireErr) {
          console.error("Firestore write error ❌", fireErr);
        }
      }

      setprocessing(false);
    } catch (error) {
      console.error("Payment error ❌", error);
      setprocessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.checkout}>checkout ({totalItems}) items</div>

      {/* payment */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.adress}>
          <h3>Delivery address</h3>
          <div>
            <div>{user?.email}</div>
            <div>maping</div>
            <div>Ethiopia A.A</div>
          </div>
        </div>
        <hr />

        {/* product review */}
        <div className={classes.productreview}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <div key={item.id || index} className={classes.ProductList}>
                <div className={classes.ProductProduct}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={classes.ProductImage}
                  />

                  <div className={classes.ProductDetails}>
                    <h4>{item.title}</h4>

                    <div>
                      <Rating
                        value={item.rating?.rate ?? 0}
                        precision={0.1}
                        readOnly
                      />
                      <span>({item.rating?.count ?? 0} reviews)</span>
                    </div>

                    <div>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* card/payment form */}
        <div className={classes.pay}>
          <h3> payment method</h3>

          <div className={classes.form}>
            <form onSubmit={handlpayment}>
              <CardElement onChange={Handelchange} />
              {error && <div className={classes.error}>{error}</div>}
              <div className={classes.total}>
                <span>Total order | ${total}</span>
              </div>
              <button type="submit" className={classes.button}>
                {processing ? (
                  <div className={classes.lodder}>
                    <ClipLoader color="#000" size={12} />
                    <p>please wait....</p>
                  </div>
                ) : (
                  "pay now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PaymentKey;
