import { RouterProvider } from "react-router-dom";

import { router } from "../config/routes";
import { AppProviders } from "./AppProviders";

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
