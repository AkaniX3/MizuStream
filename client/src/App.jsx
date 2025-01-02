import React from 'react';
import { ThemeProvider } from './configs/ThemeContext'; // Import ThemeProvider
import ThemeToggle from './components/ThemeToggle'; // Import ThemeToggle
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <ThemeProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="p-4">
          <h1 className="text-3xl font-bold">React App with Theme Toggle</h1>
          <ThemeToggle />
        </header>
        <main className="p-4">
          <p>This is a simple app demonstrating dark and light mode toggle.</p>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
