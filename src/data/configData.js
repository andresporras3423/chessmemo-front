export const getConfigData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API}config/get`, {
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
  const response = await fetch(`${process.env.REACT_APP_API}config/put`, {
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