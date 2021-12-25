export const getBestPersonal = async (signal) => {
  const response = await fetch(`http://localhost:3000/score/best_personal`, {
      signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    return data;
};

export const getBestGlobal = async (signal) => {
  const response = await fetch(`http://localhost:3000/score/best_global`, {
      signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    return data;
};

export const getRecentConfig = async (signal) => {
  const response = await fetch(`http://localhost:3000/score/recent_config`, {
      signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    return data;
};

export const getRecentPersonal = async (signal) => {
  const response = await fetch(`http://localhost:3000/score/recent_personal`, {
      signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    return data;
};

  export const saveScore = async (corrects, seconds) => {
    const response = await fetch(`http://localhost:3000/score/create`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
          },
          body: JSON.stringify({corrects, seconds}),
        });
        const data = await response.json();
        return data;
  };
  
  export default {getBestPersonal, getBestGlobal, getRecentConfig, getRecentPersonal, saveScore};