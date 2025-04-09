import { ThemeProvider } from "@/providers/theme-provider/ThemeProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
