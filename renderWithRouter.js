import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
