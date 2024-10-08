import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'iGFuqyt-C9IyswEhkqC6L2f29n8_vjr4qbtp3OMkm1fRIe2rZg';
const API_URL = '/api/v1/coffeeList';
const EXCHANGE_RATE = 2.70;

const ShopApp = ({ selectedCoffee }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(2);
  const [currency, setCurrency] = useState('₾');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      if (!selectedCoffee || !selectedCoffee._uuid) {
        console.error('Selected coffee or UUID is undefined.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/${selectedCoffee._uuid}`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching coffee details: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setIngredients(data.ingredients);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    if (selectedCoffee) {
      fetchIngredients();
    } else {
      navigate('/');
    }
  }, [selectedCoffee, navigate]);

  const calculateTotalPrice = () => {
    let ingredientTotal = 0;

    Object.keys(selectedIngredients).forEach((ingredientName) => {
      if (selectedIngredients[ingredientName]) {
        const ingredient = ingredients.find(ing => ing.name === ingredientName);
        if (ingredient) {
          ingredientTotal += parseFloat(ingredient.price);
        }
      }
    });

    let total = basePrice + ingredientTotal;

    if (currency === '$') {
      total = total / EXCHANGE_RATE;
    }

    return total.toFixed(2);
  };

  const handleIngredientChange = (ingredientName) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientName]: !prev[ingredientName],
    }));
  };

  const handleBuy = () => {
    alert(`შენ იყიდე ${selectedCoffee.name} ${calculateTotalPrice()}${currency}-ად`);
    navigate('/');
  };

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === '₾' ? '$' : '₾'));
  };

  const getIngredientPrice = (price) => {
    const priceInLocalCurrency = currency === '₾' ? price : price / EXCHANGE_RATE;
    return parseFloat(priceInLocalCurrency).toFixed(2);
  };

  if (!selectedCoffee) {
    return null;
  }

  return (
    <div>
      <h1>შერჩეული ყავა: {selectedCoffee.name}</h1>
      <p>აღწერა: {description}</p>

      <h2>ინგრედიენტები:</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={!!selectedIngredients[ingredient.name]}
              onChange={() => handleIngredientChange(ingredient.name)}
            />
            {ingredient.name} - {getIngredientPrice(ingredient.price)}{currency} ({ingredient.description})
          </label>
        </div>
      ))}

      <h2>სულ გადასახდელი: {calculateTotalPrice()}{currency}</h2>

      <button onClick={toggleCurrency}>
        {currency === '₾' ? '$' : '₾'}
      </button>

      <button onClick={handleBuy}>ყიდვა</button>
      <button onClick={() => navigate('/')}>მთავარ გვერდზე</button>
    </div>
  );
};

export default ShopApp;
