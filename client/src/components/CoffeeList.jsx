import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'iGFuqyt-C9IyswEhkqC6L2f29n8_vjr4qbtp3OMkm1fRIe2rZg';
const API_URL = '/api/v1/coffeeList';

const CoffeeList = ({ setSelectedCoffee }) => {
  const [coffeeIds, setCoffeeIds] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoffeeIds = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const ids = data.items.map((coffee) => coffee._uuid);
        setCoffeeIds(ids);
      } catch (error) {
        console.error('Error fetching coffee IDs:', error);
      }
    };

    fetchCoffeeIds();
  }, []);

  useEffect(() => {
    if (coffeeIds.length > 0) {
      const fetchCoffeeNames = async () => {
        try {
          const coffeePromises = coffeeIds.map(async (id) => {
            const requestUrl = `${API_URL}/${id}`;

            const response = await fetch(requestUrl, {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
              },
            });

            if (!response.ok) {
              throw new Error(`Error fetching coffee name: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return { id, name: data.title || data.name || data.description, _uuid: id };
          });

          const coffeeData = await Promise.all(coffeePromises);
          setCoffeeList(coffeeData);
        } catch (error) {
          console.error('Error fetching coffee names:', error);
        }
      };

      fetchCoffeeNames();
    }
  }, [coffeeIds]);

  if (coffeeList.length === 0) return <div>Loading...</div>;

  return (
    <ul>
      {coffeeList.map((coffee) => (
        <li key={coffee.id}>
          <h3>{coffee.name}</h3>
          <button onClick={() => {
            setSelectedCoffee(coffee);
            navigate('/shop');
          }}>
            არჩევა
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CoffeeList;
