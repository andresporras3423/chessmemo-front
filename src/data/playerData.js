export const createPlayer = async (email, password) => {
    let message="";  
    const response = await fetch(`https://localhost:44311/api/player`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        }).then((data)=>{
          return data.json()
        }).then((data)=>{
          message=data;
        });
        await response;
        return message;
  };
  
  export default {createPlayer}