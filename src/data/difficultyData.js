export const getDifficultyData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}difficulty/get`, {
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