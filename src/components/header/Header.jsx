import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import classes from './header.module.css';
import Lowerheader from './Lowerheader';
import { datacontext } from '../data provider/Dataprovider';
import { auth } from '../../pages/firebase/firebase';

function Header() {
  const [{user, basket }, dispatch] = useContext(datacontext); // fixed useContext

  const totalItems = basket?.reduce((total, item) => total + item.amount, 0); // fixed reduce

  return (
    <section className={classes.headersticky}>
      <div>
        <header className={classes.header_container}>
          <div className={classes.inside_header_container}>
            <div className={classes.logo_section}>
              <div className={classes.logo}>
                <Link to="/">
                  <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="Logo" />
                </Link>
              </div>

              <div className={classes.location}>
                <div>
                  <span>
                    <FaLocationDot />
                  </span>
                </div>
              </div>

              <div className={classes.location_text}>
                <p className={classes.delivery}>Deliver to</p>
                <span className={classes.ethiopia}>Ethiopia</span>
              </div>
            </div>

            <div className={classes.search_bar}>
              <select><option value="">All</option></select>
              <input type="text" placeholder='search bar' />
              <button>
                <IoSearch />
              </button>
            </div>

            <div className={classes.right_side}>
              <div className={classes.language_selector}>
                <Link to="#">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png" alt="US Flag" />
                  <select name="" id="EN">
                    <option value="">EN</option>
                  </select>
                </Link>
              </div>

              <Link to={!user && "/signin"}>
                <div className={classes.sign_in}>

                  {
                  user?(<>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                          <span onClick={()=>{auth.signOut()}}>sign out</span>
                  </>
                ):(
                <>
                <p>Hello, sign in</p>
                   <span>Account & Lists</span>
                </>
                )
                }
                </div>
              </Link>

              <div className={classes.returns}>
                <Link to="/order">
                  <p>Returns</p>
                  <span>& Orders</span>
                </Link>
              </div>

              <div className={classes.cart}>
                <Link to="/cart">
                  <span>{totalItems}</span>
                  <div className={classes.cart_icon}>
                    <FaShoppingCart />
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </header>
        <Lowerheader />
      </div>
    </section>
  );
}

export default Header;
