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
          return  data.json();
            })
            .then((loginData)=>{
              let listData = loginData.split(",");
              if(listData.length==2){
                localStorage.setItem('id', listData[0]);
                localStorage.setItem('token', listData[1]);
              }
              dataResponse=listData[0];
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
      return data;
  };

  export const getLogin = async () => {
    const response = await fetch(`https://localhost:44311/api/login`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'id': localStorage.getItem('id'),
          'token': localStorage.getItem('token')
        },
      });
      const data = await response;
      return data;
  };

  export default {createLogin, destroyLogin, getLogin}