import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {createLogin, getLogin} from "../data/loginData";
import {createPlayer} from '../data/playerData';
function Login(props) {
    const {option} = props;
    const options = new Object();
    options['signup']= {'message': `Already have an account? go to login`, 'link': '/login'};
    options['login']= {'message': `Don't have an account? go to sign up`, 'link': '/signup'};
    const history = useHistory();
    const [statusMessage, setStatusMessage] = useState('');
    const [password, setPassword] = useState('');
    const [logged, setLogged] = useState(true)
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      (
        async ()=>{
          const data = await getLogin();
          if(data.status===200) history.push('');
          else setLogged(false);
        }
      )();
      }, []);

    const confirmPassword = () => {
      if (option==="signup") {
        return (
          <>
            <label>Password confirmation: </label>
            <input className="form-control" type="password" onChange={(e)=>setPasswordConfirmation(e.target.value)} />
          </>
        );
      }
      return <></>;
    };

    const startLogin = async ()=>{
      const response = await createLogin(email, password);
        if(isNaN(response)) setStatusMessage(response);
        else {
          history.push('');
        }
    };

    const loginForm = async ()=>{
      if(option==="login"){
        await startLogin();
      }
      else if (password!=passwordConfirmation){
        setStatusMessage("password and password confirm must be equals");
      }
      else{
        const response = await createPlayer(email, password);
        if(isNaN(response)){
          setStatusMessage(response);
        } 
        else await startLogin();
      }
    };
  if(logged) return (<></>);
  else return (
    <div className="col-md-12 login-div">
                <div  className="form-login" >
                    <label>Email: </label>
                    <input  className="form-control" type="text" onChange={(e)=>setEmail(e.target.value)} />
                    <label>Password: </label>
                    <input className="form-control" type="password" onChange={(e)=>setPassword(e.target.value)} />
                    {confirmPassword()}
                </div>      
                <div><button className="form-control" onClick={loginForm}>{option}</button></div>
                <a href="" onClick={()=>history.push(options[option].link)}>{options[option].message}</a>
                <div>
                  <pre dangerouslySetInnerHTML={{ __html: statusMessage }}></pre>
                </div>
    </div>
  ); 
}

export default Login;