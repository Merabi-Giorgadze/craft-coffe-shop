import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

const EditIngredient = ({ ingredientList, onFormSubmit }) => {
  const { language } = useContext(LanguageContext);
  const { ingredientId } = useParams();
  const navigate = useNavigate();
  const ingredientToEdit = ingredientList.find((ingredient) => ingredient.id === ingredientId);

  const [name, setName] = useState(ingredientToEdit?.name || '');
  const [price, setPrice] = useState(ingredientToEdit?.price || '');
  const [description, setDescription] = useState(ingredientToEdit?.description || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!ingredientToEdit) {
      navigate('/');
    }
  }, [ingredientToEdit, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !description) {
      setErrorMessage(language === 'ge' ? 'გთხოვთ, შეავსოთ ყველა ველი.' : 'Please fill in all fields.');
      return;
    }

    onFormSubmit(ingredientId, { name, price, description });
    navigate('/');
  };

  return (
    <div>
      <h1>{language === 'ge' ? 'ინგრედიენტის შეცვლა' : 'Edit Ingredient'}</h1>
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">{language === 'ge' ? 'შენახვა' : 'Save'}</button>
      </form>
    </div>
  );
};

export default EditIngredient;
