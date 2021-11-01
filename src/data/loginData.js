export const createLogin = async (email, password) => {
    let dataResponse="";
    const response = await fetch(`http://localhost:3000/login/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password}),
      })
      .then((data)=>{
          return  data.json();
            })
            .then((loginData)=>{
              localStorage.setItem('token', loginData["token"]);
              dataResponse="ok";
            });
            await response;
            return dataResponse;
  };

  export const destroyLogin = async (email, password) => {
    const response = await fetch(`http://localhost:3000/login/destroy`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token'),
        },
      });
      const data = await response;
      return data;
  };

  export const getLogin = async () => {
    const response = await fetch(`http://localhost:3000/login/get`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
      });
      const data = await response;
      return data;
  };

  export default {createLogin, destroyLogin, getLogin}