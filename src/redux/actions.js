import {GET_CONTACT} from './type';

export function actionsContact(payload) {
  return {
    type: GET_CONTACT,
    payload: payload,
  };
}
