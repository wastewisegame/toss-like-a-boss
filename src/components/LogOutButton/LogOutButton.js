import React from 'react';
import { connect } from 'react-redux';

//This component is the logout button which is featured to help a user log out of their profile
const LogOutButton = props => (
  <button
  
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
     
  >
    Log Out
  </button>
);

export default connect()(LogOutButton);
