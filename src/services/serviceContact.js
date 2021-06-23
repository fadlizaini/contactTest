import http from '../http';
const getContact = t => {
  return http.get(`/contact`);
};
const saveContact = (firstName, lastName,age, photo )=> {
  return http.post(`/contact`, {firstName:firstName, lastName:lastName, age:age, photo:photo}, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const editContact = (firstName, lastName,age, photo, id )=> {
  return http.put(`/contact/${id}`, {firstName:firstName, lastName:lastName, age:age, photo:photo}, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteContact = (id )=> {
  return http.delete(`/contact/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export {getContact, saveContact, editContact, deleteContact};
