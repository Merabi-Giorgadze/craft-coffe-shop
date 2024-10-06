const API_KEY = 'iGFuqyt-C9IyswEhkqC6L2f29n8_vjr4qbtp3OMkm1fRIe2rZg';
const API_URL = '/api/v1/coffeeList';

export const getCoffees = () => {
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to get coffees');
    }
    return res.json();
  });
};

export const addCoffee = (title, ingredients, description) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify([{ title, ingredients, description }]),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to create coffee');
    }
    return res.json();
  });
};

export const editCoffee = (id, updatedCoffee) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(updatedCoffee),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to update coffee');
    }
    return res.json();
  });
};

export const deleteCoffee = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to delete coffee');
    }
    return res;
  });
};
