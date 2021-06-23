import {createStore, combineReducers} from 'redux';
import contactReducer from './reducer';

const rootReducer = combineReducers({contact: contactReducer});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
