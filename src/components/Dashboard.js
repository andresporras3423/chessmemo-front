import {useState, useEffect} from 'react';
import '../App.css';
import Navbar from './Navbar'; 
import Instructions from './Instructions'; 
import Play from './Play'; 
import Settings from './Settings'; 
import Feedback from './Feedback';
import {getConfigData} from '../data/configData'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConfig } from '../actions/index';
import { useHistory } from "react-router-dom";
import {getLogin} from '../data/loginData';

function App(props) {
  const {handleGetConfig} = props;
const [page, setPage] = useState('0');
const [logged, setLogged]=useState(false);
const history = useHistory();

useEffect(() => {
  (
    async ()=>{
      const data = await getLogin();
      if(data.status!==200) history.push('/login');
      else{
        const data = await getConfigData();
          handleGetConfig({
            'DifficultyId': data['difficulty_id'],
            'questions': data['questions'],
          });
          setLogged(true);
      } 
    }
  )();
  }, []);


const setSelectedPage = ()=>{
  if(page==='0') return (<Instructions/>);
  else if(page==='1') return (<Play/>);
  else if(page==='2') return (<Settings/>);
  else  return (<Feedback option={page} />);
}
if(logged===false) return (<></>);
else return (
    <div className="App">
      <Navbar setPage={setPage}/>
      {setSelectedPage()}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  handleGetConfig: nConfig => {
    dispatch(getConfig(nConfig));
  }
});

App.propTypes = {
  handleGetConfig: PropTypes.func
};

App.defaultProps = {
  handleGetConfig: null
};

export default connect(null, mapDispatchToProps)(App);
