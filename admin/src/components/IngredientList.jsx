import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

const IngredientList = ({ ingredientList, onDeleteIngredient }) => {
  const { language } = useContext(LanguageContext);

  const handleDelete = (ingredientId) => {
    onDeleteIngredient(ingredientId);
  };

  return (
    <div>
      <h1>{language === 'ge' ? 'ინგრედიენტების სია' : 'Ingredient List'}</h1>
      {ingredientList.map((ingredient) => (
        <div key={ingredient.id}>
          <h3>{ingredient.name}</h3>
          <p>{language === 'ge' ? 'ფასი' : 'Price'}: {ingredient.price}</p>
          <p>{language === 'ge' ? 'აღწერა' : 'Description'}: {ingredient.description}</p>
          <Link to={`/edit-ingredient/${ingredient.id}`}>
            {language === 'ge' ? 'ინგრედიენტის შეცვლა' : 'Edit Ingredient'}
          </Link>
          <button onClick={() => handleDelete(ingredient.id)}>
            {language === 'ge' ? 'წაშლა' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
