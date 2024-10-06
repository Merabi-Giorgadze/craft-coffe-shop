import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

const Header = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <header>
      <button onClick={toggleLanguage}>
        {language === 'ge' ? 'English' : 'ქართული'}
      </button>
      <nav>
        <Link to="/">{language === 'ge' ? 'ინგრედიენტების სია' : 'Ingredient List'}</Link>
        <Link to="/add-ingredient">{language === 'ge' ? 'ინგრედიენტის დამატება' : 'Add Ingredient'}</Link>
        <Link to="/coffees">{language === 'ge' ? 'ყავის სია' : 'Coffee List'}</Link>
        <Link to="/add-coffee">{language === 'ge' ? 'ყავის დამატება' : 'Add Coffee'}</Link>
      </nav>
    </header>
  );
};

export default Header;
