export const getConfigData = async () => {
  const response = await fetch(`https://localhost:44311/api/config/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'id': localStorage.getItem('id'),
        'token': localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    return data;
};

export const updateConfigData = async (DifficultyId, questions) => {
  const response = await fetch(`https://localhost:44311/api/config/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'id': localStorage.getItem('id'),
        'token': localStorage.getItem('token'),
      },
      body: JSON.stringify({Questions: questions, DifficultyId: DifficultyId})
    });
    const data = await response;
    return data;
};

export default {getConfigData, updateConfigData}