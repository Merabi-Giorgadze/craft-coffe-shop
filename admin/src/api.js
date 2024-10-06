const API_KEY = 'iGFuqyt-C9IyswEhkqC6L2f29n8_vjr4qbtp3OMkm1fRIe2rZg';
const API_URL = '/api/v1/ingredientList';

export const getIngredients = () => {
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to get ingredients');
    }
    return res.json();
  });
};

export const addIngredient = (name, price, description) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify([{ name, price, description }]),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to create ingredient');
    }
    return res.json();
  });
};

export const editIngredient = (id, updatedIngredient) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(updatedIngredient),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to update ingredient');
    }
    return res.json();
  });
};

export const deleteIngredient = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to delete ingredient');
    }
    return res;
  });
};
