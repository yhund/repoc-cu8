import { legacy_createStore as createStore } from 'redux';
import { formReducer } from './feedback/reducer';

export const store = createStore(formReducer);