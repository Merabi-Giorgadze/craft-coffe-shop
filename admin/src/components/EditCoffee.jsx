import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIngredients } from '../api';
import { LanguageContext } from '../LanguageContext';

const EditCoffee = ({ coffeeList, onFormSubmit }) => {
  const { coffeeId } = useParams();
  const navigate = useNavigate();
  const coffee = coffeeList.find((coffee) => coffee.id === coffeeId) || {};

  const [title, setTitle] = useState(coffee.title || '');
  const [selectedIngredients, setSelectedIngredients] = useState(coffee.ingredients || []);
  const [description, setDescription] = useState(coffee.description || '');
  const [ingredientsList, setIngredientsList] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientsList(data.items);

        if (coffee.ingredients && coffee.ingredients.length > 0) {
          const validSelectedIngredients = coffee.ingredients.filter(ingredient =>
            data.items.some(item => item.name === ingredient.name)
          );
          setSelectedIngredients(validSelectedIngredients);
        }
      })
      .catch((err) => console.error('Error fetching ingredients:', err));
  }, [coffee.ingredients]);

  const handleCheckboxChange = (ingredient) => {
    if (selectedIngredients.some(item => item.name === ingredient.name)) {
      setSelectedIngredients(
        selectedIngredients.filter((selected) => selected.name !== ingredient.name)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || selectedIngredients.length === 0 || !description) {
      alert(language === 'ge' ? 'გთხოვთ, შეავსოთ ყველა ველი და აირჩიოთ მინიმუმ ერთი ინგრედიენტი.' : 'Please fill in all fields and select at least one ingredient.');
      return;
    }

    const ingredientData = selectedIngredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
      description: ingredient.description,
    }));

    console.log('Updating coffee with the following data:');
    console.log('Coffee ID:', coffeeId);
    console.log('Title:', title);
    console.log('Ingredients:', ingredientData);
    console.log('Description:', description);

    onFormSubmit(coffeeId, { title, ingredients: ingredientData, description });
    navigate('/coffees');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{language === 'ge' ? 'კოფის რედაქტირება' : 'Edit Coffee'}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={language === 'ge' ? 'კოფის სახელი' : 'Coffee Title'}
        required
      />
      <h3>{language === 'ge' ? 'აირჩიეთ ინგრედიენტები:' : 'Select Ingredients:'}</h3>
      {ingredientsList.map((ingredient) => (
        <div key={ingredient._uuid}>
          <label>
            <input
              type="checkbox"
              checked={selectedIngredients.some(item => item.name === ingredient.name)}
              onChange={() => handleCheckboxChange(ingredient)}
            />
            {ingredient.name} - {ingredient.price}
            <p>{ingredient.description}</p>
          </label>
        </div>
      ))}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={language === 'ge' ? 'აღწერა' : 'Description'}
        required
      />
      <button type="submit">{language === 'ge' ? 'განახლება' : 'Update'}</button>
    </form>
  );
};

export default EditCoffee;
