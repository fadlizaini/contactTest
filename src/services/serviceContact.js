import http from "../http";
const getContact = t => {
  return http.get(`/contact`);
};
const saveContact = t => {
  return http.post(`/contact`);
};

export {getContact, saveContact}