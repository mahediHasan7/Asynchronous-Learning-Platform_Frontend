import React from 'react';

export const AuthContext = React.createContext({
  isLogin: false,
  loggedInUser: null,
  updateLoggedInUser: (user, token) => {},
  login: () => {},
  logout: () => {},
  // for asynchronous learning platform
  setSubject: (subject) => {},
  isLogin_asynchronous: null,
  loggedInUser_asynchronous: null,
  login_asynchronous: () => {},
  logout_asynchronous: () => {},
});
