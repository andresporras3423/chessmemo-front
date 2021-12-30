export const createLogin = async (email, password) => {
    let status="";
    let body="";
    const response = await fetch(`${process.env.REACT_APP_API}create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password}),
      })
      .then((data)=>{
          status=data.status;
          return data.json();
            })
            .then((loginData)=>{
              if(status===202)  localStorage.setItem('token', loginData["token"]);
              body=loginData;
            });
            await response;
            return {status, body};
  };

  export const destroyLogin = async () => {
    localStorage.removeItem('token');
  };

  export const getLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}login/get`, {
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