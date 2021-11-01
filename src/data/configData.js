export const getConfigData = async () => {
  const response = await fetch(`http://localhost:3000/config/get`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    return data;
};

export const updateConfigData = async (difficulty_id, questions) => {
  const response = await fetch(`http://localhost:3000/config/put`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      },
      body: JSON.stringify({questions: questions, difficulty_id: difficulty_id})
    });
    const data = await response;
    return data;
};

export default {getConfigData, updateConfigData}