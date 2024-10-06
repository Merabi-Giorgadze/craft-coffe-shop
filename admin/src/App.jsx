import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import IngredientList from './components/IngredientList';
import AddIngredient from './components/AddIngredient';
import EditIngredient from './components/EditIngredient';
import CoffeeList from './components/CoffeeList';
import AddCoffee from './components/AddCoffee';
import EditCoffee from './components/EditCoffee';
import Header from './components/Header';
import { getIngredients, addIngredient, editIngredient, deleteIngredient } from './api';
import { getCoffees, addCoffee, editCoffee, deleteCoffee } from './coffeeapi';

function App() {
  const [ingredientList, setIngredientList] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientList(
          data.items.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
            description: ingredient.description,
            id: ingredient._uuid,
          }))
        );
      })
      .catch((err) => console.error(err));

    getCoffees()
      .then((data) => {
        setCoffeeList(
          data.items.map((coffee) => ({
            title: coffee.title,
            ingredients: coffee.ingredients,
            description: coffee.description,
            id: coffee._uuid,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddIngredient = (name, price, description) => {
    addIngredient(name, price, description)
      .then((data) => {
        setIngredientList((prev) => [
          {
            name: data.items[0].name,
            price: data.items[0].price,
            description: data.items[0].description,
            id: data.items[0]._uuid,
          },
          ...prev,
        ]);
      })
      .catch((err) => console.log(err));
  };

  const handleEditIngredient = (id, updatedIngredient) => {
    editIngredient(id, updatedIngredient)
      .then(() => {
        setIngredientList((prev) =>
          prev.map((ingredient) =>
            ingredient.id === id
              ? { ...ingredient, ...updatedIngredient }
              : ingredient
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteIngredient = (id) => {
    deleteIngredient(id)
      .then(() => {
        setIngredientList((prev) =>
          prev.filter((ingredient) => ingredient.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAddCoffee = (title, ingredients, description) => {
    addCoffee(title, ingredients, description)
      .then((data) => {
        setCoffeeList((prev) => [
          {
            title: data.items[0].title,
            ingredients: data.items[0].ingredients,
            description: data.items[0].description,
            id: data.items[0]._uuid,
          },
          ...prev,
        ]);
      })
      .catch((err) => console.log(err));
  };

  const handleEditCoffee = (id, updatedCoffee) => {
    editCoffee(id, updatedCoffee)
      .then(() => {
        setCoffeeList((prev) =>
          prev.map((coffee) =>
            coffee.id === id
              ? { ...coffee, ...updatedCoffee }
              : coffee
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCoffee = (id) => {
    deleteCoffee(id)
      .then(() => {
        setCoffeeList((prev) =>
          prev.filter((coffee) => coffee.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

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
