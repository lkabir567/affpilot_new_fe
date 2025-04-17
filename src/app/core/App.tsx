import { RouterProvider } from "react-router-dom";

import { router } from "../config/router";
import { AppProviders } from "./AppProviders";

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
