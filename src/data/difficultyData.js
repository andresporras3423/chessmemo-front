export const getDifficultyData = async () => {
    const response = await fetch(`https://localhost:44311/api/difficulty/`, {
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

  export default {getDifficultyData}