// CoffeeList.js
import React, { useEffect, useState } from 'react';

const API_KEY = 'iGFuqyt-C9IyswEhkqC6L2f29n8_vjr4qbtp3OMkm1fRIe2rZg';
const API_URL = '/api/v1/coffeeList';

const CoffeeList = () => {
  const [coffeeIds, setCoffeeIds] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);

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
      console.log('Coffee list data:', data);
      

      const ids = data.items.map(coffee => coffee._uuid);
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
          console.log('Fetching URL:', requestUrl);
          
          const response = await fetch(requestUrl, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Error fetching coffee name: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();
          console.log(`Coffee data for ID ${id}:`, data);
          return { id, name: data.title };
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
      </li>
    ))}
  </ul>
);

  if (coffeeList.length === 0) return <div>Loading...</div>;

  return (
    <ul>
      {coffeeList.map((coffee) => (
        <li key={coffee.id}>
          <h3>{coffee.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default CoffeeList;
