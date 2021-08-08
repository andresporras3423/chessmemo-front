export const createLogin = async (email, password) => {
    let dataResponse="";
    const response = await fetch(`https://localhost:44311/api/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password}),
      })
      .then((data)=>{
          dataResponse=data;
          return  data.json();
            })
            .then((loginData)=>{
              dataResponse=loginData;
            });
            await response;
            return dataResponse;
  };

  export const destroyLogin = async (email, password) => {
    const response = await fetch(`https://localhost:44311/api/login`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'id': localStorage.getItem('id'),
          'token': localStorage.getItem('token'),
        },
      });
      const data = await response;
      localStorage.removeItem('id')
      localStorage.removeItem('token');
      return data;
  };

  export const getLogin = async () => {
    const response = await fetch(`https://localhost:44311/api/login`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const data = await response;
      return data;
  };

  export default {createLogin, destroyLogin, getLogin}