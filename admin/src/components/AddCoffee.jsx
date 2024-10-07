import React, { useState, useEffect, useContext } from 'react';
import { getIngredients } from '../api';
import { LanguageContext } from '../LanguageContext';

const AddCoffee = ({ onFormSubmit }) => {
  const { language } = useContext(LanguageContext);
  const [title, setTitle] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [description, setDescription] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientsList(data.items);
      })
      .catch((err) => {
        console.error(err);
        setMessage(language === 'ge' ? 'ინგრედიენტების ჩატვირთვა ვერ მოხერხდა.' : 'Failed to load ingredients.');
      });
  }, [language]);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prev) => {
      const alreadySelected = prev.find((item) => item._uuid === ingredient._uuid);
      if (alreadySelected) {
        return prev.filter((item) => item._uuid !== ingredient._uuid);
      }
      return [...prev, ingredient];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || selectedIngredients.length === 0 || !description) {
      setMessage(language === 'ge' ? 'გთხოვთ, შეავსოთ ყველა ველი და აირჩიოთ მინიმუმ ერთი ინგრედიენტი.' : 'Please fill in all fields and select at least one ingredient.');
      return;
    }

    const ingredientData = selectedIngredients.map(ingredient => ({
      name: ingredient.name,
      price: ingredient.price,
      description: ingredient.description,
    }));

    onFormSubmit(title, ingredientData, description);
    setTitle('');
    setSelectedIngredients([]);
    setDescription('');
    setMessage(language === 'ge' ? 'კოფი წარმატებით დაემატა!' : 'Coffee added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{language === 'ge' ? 'კოფის დამატება' : 'Add Coffee'}</h1>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
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
              checked={selectedIngredients.some(item => item._uuid === ingredient._uuid)}
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
        rows="4"
        cols="50"
        required
      />
      <button type="submit">{language === 'ge' ? 'დამატება' : 'Add'}</button>
    </form>
  );
};

export default AddCoffee;
