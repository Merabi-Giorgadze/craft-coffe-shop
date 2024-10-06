import React, { useState, useContext } from 'react';
import { LanguageContext } from '../LanguageContext';

const AddIngredient = ({ onFormSubmit }) => {
  const { language } = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(name, price, description);
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div>
      <h1>{language === 'ge' ? 'დავამატოთ ახალი ინგრედიენტი' : 'Add New Ingredient'}</h1>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder={language === 'ge' ? 'ინგრედიენტის სახელი' : 'Ingredient Name'} 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder={language === 'ge' ? 'ფასი' : 'Price'} 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <textarea 
          placeholder={language === 'ge' ? 'აღწერა' : 'Description'} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">{language === 'ge' ? 'ინგრედიენტის დამატება' : 'Add Ingredient'}</button>
      </form>
    </div>
  );
};

export default AddIngredient;
