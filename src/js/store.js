import { applyMiddleware, createStore, combineReducers } from 'redux';
import { combineForms, createForms } from 'react-redux-form';

const initialUserState = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
};

const formState = {
  isSubmited: false,
  error: false
}

const store = createStore(combineReducers({
  reducer,
  ...createForms({
  userChoice: initialUserState
  })
})
);


function reducer(state=formState, action) {
  switch(action.type) {
    case "FORM_SUBMITED":
      return {
        ...state,
        isSubmited: true
      }
    case "SUBMIT_ERROR":
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default store;
