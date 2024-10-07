import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoffeeList from './components/CoffeeList';
import ShopApp from './components/ShopApp';
import './App.css';

const App = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CoffeeList setSelectedCoffee={setSelectedCoffee} />}
        />
        <Route
          path="/shop"
          element={<ShopApp selectedCoffee={selectedCoffee} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
