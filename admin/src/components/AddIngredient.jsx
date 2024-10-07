import React, { useState, useContext } from 'react';
import { LanguageContext } from '../LanguageContext';

const AddIngredient = ({ onFormSubmit }) => {
  const { language } = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage(language === 'ge' ? 'გთხოვთ, შეიყვანეთ ინგრედიენტის სახელი.' : 'Please enter the ingredient name.');
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setMessage(language === 'ge' ? 'გთხოვთ, შეიყვანეთ სწორი ფასი.' : 'Please enter a valid price.');
      return;
    }

    if (!description.trim()) {
      setMessage(language === 'ge' ? 'გთხოვთ, შეიყვანეთ ინგრედიენტის აღწერა.' : 'Please enter the ingredient description.');
      return;
    }

    onFormSubmit(name, parseFloat(price), description);
    setName('');
    setPrice('');
    setDescription('');
    setMessage(language === 'ge' ? 'ინგრედიენტი წარმატებით დაემატა!' : 'Ingredient added successfully!');
  };

  return (
    <div>
      <h1>{language === 'ge' ? 'დავამატოთ ახალი ინგრედიენტი' : 'Add New Ingredient'}</h1>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
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
        <button type="submit">{language === 'ge' ? 'დამატება' : 'Add'}</button>
      </form>
    </div>
  );
};

export default AddIngredient;
