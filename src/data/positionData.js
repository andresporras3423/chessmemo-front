export const getPositions = async () => {
    let message="";  
    const response = await fetch(`https://localhost:44311/api/position`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'id': localStorage.getItem('id'),
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