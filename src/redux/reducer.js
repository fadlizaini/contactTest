import {GET_CONTACT} from './type';

const initialState = {
  kontak: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
       kontak:action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
