import { useTheme } from "@/context/themeContext/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 bg-primary text-white rounded-md cursor-pointer hover:text-black"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}
