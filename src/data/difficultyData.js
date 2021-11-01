export const getDifficultyData = async () => {
    const response = await fetch(`http://localhost:3000/difficulty/get`, {
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

  export default {getDifficultyData}