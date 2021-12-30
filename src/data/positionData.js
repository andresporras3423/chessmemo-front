export const getPositions = async () => {
    let message="";  
    const response = await fetch(`${process.env.REACT_APP_API}position/get`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token'),
          },
        }).then((data)=>{
          return data.json()
        }).then((data)=>{
          message=data;
        });
        await response;
        return message;
  };

  
  export default {getPositions}