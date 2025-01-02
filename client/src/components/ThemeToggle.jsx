import React, { useState, useEffect } from 'react';
import { useTheme } from '../configs/ThemeContext'; // Correct import path
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
    >
      {theme === 'dark' ? (
        <FaSun size={30} />
      ) : (
        <FaMoon size={30} />
      )}
      <span className="sr-only">Theme Toggle</span>
    </button>
  );
};

export default ThemeToggle;
