import { useEffect, useState } from 'react';
import { getIngredients, addIngredient, editIngredient, deleteIngredient } from '../api';
import { getCoffees, addCoffee, editCoffee, deleteCoffee } from '../coffeeapi';

const useForApp = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredientsData = await getIngredients();
        setIngredientList(
          ingredientsData.items.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
            description: ingredient.description,
            id: ingredient._uuid,
          }))
        );

        const coffeesData = await getCoffees();
        setCoffeeList(
          coffeesData.items.map((coffee) => ({
            title: coffee.title,
            ingredients: coffee.ingredients,
            description: coffee.description,
            id: coffee._uuid,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleAddIngredient = async (name, price, description) => {
    try {
      const data = await addIngredient(name, price, description);
      setIngredientList((prev) => [
        {
          name: data.items[0].name,
          price: data.items[0].price,
          description: data.items[0].description,
          id: data.items[0]._uuid,
        },
        ...prev,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditIngredient = async (id, updatedIngredient) => {
    try {
      await editIngredient(id, updatedIngredient);
      setIngredientList((prev) =>
        prev.map((ingredient) =>
          ingredient.id === id
            ? { ...ingredient, ...updatedIngredient }
            : ingredient
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await deleteIngredient(id);
      setIngredientList((prev) => prev.filter((ingredient) => ingredient.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCoffee = async (title, ingredients, description) => {
    try {
      const data = await addCoffee(title, ingredients, description);
      setCoffeeList((prev) => [
        {
          title: data.items[0].title,
          ingredients: data.items[0].ingredients,
          description: data.items[0].description,
          id: data.items[0]._uuid,
        },
        ...prev,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCoffee = async (id, updatedCoffee) => {
    try {
      await editCoffee(id, updatedCoffee);
      setCoffeeList((prev) =>
        prev.map((coffee) =>
          coffee.id === id ? { ...coffee, ...updatedCoffee } : coffee
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCoffee = async (id) => {
    try {
      await deleteCoffee(id);
      setCoffeeList((prev) => prev.filter((coffee) => coffee.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    ingredientList,
    coffeeList,
    handleAddIngredient,
    handleEditIngredient,
    handleDeleteIngredient,
    handleAddCoffee,
    handleEditCoffee,
    handleDeleteCoffee,
  };
};

export default useForApp;
