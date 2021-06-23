import thunk from 'redux-thunk';
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux';
export default function configureStore() {
  return createStore(reducer, applyMiddleware(thunk));
}
