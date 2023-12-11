import { ACTION_TYPE } from "../constants/action-type";

const initialProductState = {
  _id: "",
  title: "",
  description: "",
  image: "",
  category: "",
  prise: "",
  discount: "",
  avalible: "",
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.ERASE_PRODUCT:
      return initialProductState;
    default:
      return state;
  }
};
