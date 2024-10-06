import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import CoffeeList from './components/CoffeeList';
import AddCoffee from './components/AddCoffee';
import EditCoffee from './components/EditCoffee';
import Header from './components/Header';
import { getCoffees, addCoffee, editCoffee, deleteCoffee } from './api'; // API ფუნქციების შემოტანა

function CoffeeApp() {
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
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
            coffee.id === id ? { ...coffee, ...updatedCoffee } : coffee
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
        <Header /> {}

        <Routes>
          <Route
            path="/"
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

export default CoffeeApp;
