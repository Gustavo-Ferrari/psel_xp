import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
