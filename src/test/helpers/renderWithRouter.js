import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(
      <Router navigator={history} location={historyEntries}>
        {component}
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
