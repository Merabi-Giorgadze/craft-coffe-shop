// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import IngredientList from './components/IngredientList';
import AddIngredient from './components/AddIngredient';
import EditIngredient from './components/EditIngredient';
import CoffeeList from './components/CoffeeList';
import AddCoffee from './components/AddCoffee';
import EditCoffee from './components/EditCoffee';
import Header from './components/Header';
import useForApp from './components/useForApp';
import './App.css';

function App() {
  const {
    ingredientList,
    coffeeList,
    handleAddIngredient,
    handleEditIngredient,
    handleDeleteIngredient,
    handleAddCoffee,
    handleEditCoffee,
    handleDeleteCoffee,
  } = useForApp();

  return (
    <LanguageProvider>
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <IngredientList
                ingredientList={ingredientList}
                onDeleteIngredient={handleDeleteIngredient}
              />
            }
          />
          <Route
            path="/add-ingredient"
            element={<AddIngredient onFormSubmit={handleAddIngredient} />}
          />
          <Route
            path="/edit-ingredient/:ingredientId"
            element={
              <EditIngredient
                ingredientList={ingredientList}
                onFormSubmit={handleEditIngredient}
              />
            }
          />
          <Route
            path="/coffees"
            element={
              <CoffeeList
                coffeeList={coffeeList}
                onDeleteCoffee={handleDeleteCoffee}
              />
            }
          />
          <Route
            path="/add-coffee"
            element={<AddCoffee onFormSubmit={handleAddCoffee} />}
          />
          <Route
            path="/edit-coffee/:coffeeId"
            element={
              <EditCoffee
                coffeeList={coffeeList}
                onFormSubmit={handleEditCoffee}
              />
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
