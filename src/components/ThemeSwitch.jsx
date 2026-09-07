import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import useStore from "../store";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStore((state) => state);

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";

    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="outline-none">
      {isDarkMode ? (
        <LuSunMoon
          size={26}
          className="text-amber-400 hover:text-amber-500 cursor-pointer transition-colors"
        />
      ) : (
        <IoMoonOutline
          size={26}
          className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        />
      )}
    </button>
  );
};

export default ThemeSwitch;
