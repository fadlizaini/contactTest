import {GET_CONTACT} from './type';

const initialState = {
  contact: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
       contact:action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
