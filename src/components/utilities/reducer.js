import { type } from "./ActionType";    

export const initialvalue = {
  basket: [],
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET: {
      const existingProduct = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingProduct) {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );

        return {
          ...state,
          basket: updatedBasket
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }]
        };
      }
    }

    case type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      const updatedBasket = [...state.basket];

      if (index >= 0) {
        if (updatedBasket[index].amount > 1) {
          updatedBasket[index] = { 
            ...updatedBasket[index], 
            amount: updatedBasket[index].amount - 1 
          };
        } else {
          updatedBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: updatedBasket
      };
    }
    case type.EMPTY_BASKET:
      return{
         ...state,
         basket:[],
              }
    case type.SET_USER:
      return{
      ...state,user:action.user

    }
  
    

    default:
      return state;
  }
};
