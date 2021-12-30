export const createPlayer = async (email, password) => {
    let status="";
    let body="";
    const response = await fetch(`${process.env.REACT_APP_API}player/create`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password, password_confirmation: password, name: email}),
        }).then((data)=>{
          status=data.status;
          return data.json();
            })
            .then((loginData)=>{
              body=loginData;
            });
            await response;
            return {status, body};
  };
  
  export default {createPlayer}