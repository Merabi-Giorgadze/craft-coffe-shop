import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

const CoffeeList = ({ coffeeList, onDeleteCoffee }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div>
      <h2>{language === 'ge' ? 'ყავის სია' : 'Coffee List'}</h2>
      <ul>
        {coffeeList.map((coffee) => (
          <li key={coffee.id}>
            <h3>{coffee.title}</h3>
            <p>{coffee.description}</p>
            <h4>{language === 'ge' ? 'არჩეული ინგრედიენტები:' : 'Selected Ingredients:'}</h4>
            <ul>
              {coffee.ingredients.length > 0 ? (
                coffee.ingredients.map((ingredient) => {
                  const key = `${ingredient.name}-${ingredient.price}`;
                  return (
                    <li key={key}>
                      <span>{ingredient.name}</span>
                      <span> - {language === 'ge' ? 'ფასი' : 'Price'}: {ingredient.price}</span>
                      <span> - {language === 'ge' ? 'აღწერა' : 'Description'}: {ingredient.description}</span>
                    </li>
                  );
                })
              ) : (
                <li>{language === 'ge' ? 'არ არსებობს არჩეული ინგრედიენტები.' : 'No ingredients selected.'}</li>
              )}
            </ul>
            <Link to={`/edit-coffee/${coffee.id}`}>
              <button>{language === 'ge' ? 'რედაქტირება' : 'Edit'}</button>
            </Link>
            <button onClick={() => onDeleteCoffee(coffee.id)}>
              {language === 'ge' ? 'წაშლა' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeeList;
