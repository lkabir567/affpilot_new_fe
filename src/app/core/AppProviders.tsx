import { ThemeProvider } from "../../context/themeContext/ThemeProvider";
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
