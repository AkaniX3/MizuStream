import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./config/Routes";

import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Router />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
