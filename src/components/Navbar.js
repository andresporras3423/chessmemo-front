import {destroyLogin} from "./../data/loginData";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  const {setPage} = props;
  const history = useHistory();

  const logout = async ()=>{
    await destroyLogin();
    history.push("/login");
  };

  return (
    <div className="myNavbar">
      <div className="subnav">
      <button className="subnavbtn" onClick={()=>setPage('0')}>Instructions</button>
      </div>
    <div className="subnav">
      <button className="subnavbtn" onClick={()=>setPage('1')}>Play</button>
    </div>
    <div className="subnav">
      <button className="subnavbtn" onClick={()=>setPage('2')}>Settings</button>
    </div> 
    <div className="subnav">
      <button className="subnavbtn">Game feedback <i className="fa fa-caret-down"></i></button>
      <div className="subnav-content">
      <button onClick={()=>setPage('3')}>Best personal</button>
      <button onClick={()=>setPage('4')}>Best global</button>
      <button onClick={()=>setPage('5')}>Recent config</button>
      <button onClick={()=>setPage('6')}>Recent personal</button>
    </div> 
    </div>
    <div className="subnav">
      <button className="subnavbtn" onClick={()=>logout()}>Exit</button>
    </div>
  </div>
  );
}

export default Navbar;