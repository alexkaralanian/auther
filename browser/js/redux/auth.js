import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER'


/* ------------   ACTION CREATORS     ------------------ */

const setUser  = (user) => ({ type: SET_CURRENT_USER, user });


/* ------------       REDUCER     ------------------ */

export default function reducer (user, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    default:
      return user;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const setCurrentUser = user => dispatch => {
  axios.post('/login', user)
       .then(res => {
         if (res.data.success) {
          return dispatch(setUser(res.data.user))
         }
       })
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

