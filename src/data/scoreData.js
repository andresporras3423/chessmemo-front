export const getBestPersonal = async (signal) => {
  const response = await fetch(`${process.env.REACT_APP_API}score/best_personal`, {
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
  const response = await fetch(`${process.env.REACT_APP_API}score/best_global`, {
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
  const response = await fetch(`${process.env.REACT_APP_API}score/recent_config`, {
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
  const response = await fetch(`${process.env.REACT_APP_API}score/recent_personal`, {
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
    const response = await fetch(`${process.env.REACT_APP_API}score/create`, {
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