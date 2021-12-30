export const createPlayer = async (email, password) => {
    let message="";  
    const response = await fetch(`${process.env.REACT_APP_API}player/create`, {
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