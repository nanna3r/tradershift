import React from "react";
import "./App.css";

import logo from "./app-icon.svg";
import { SearchForm } from "../components/SearchForm";

function Header() {
  return (
    <header className="App-header">
      <img className="logo" src={logo} alt="Tradeshift fe tech" />
      <h3 className="title">Tradeshift Search</h3>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <SearchForm />
    </div>
  );
}

export default App;
