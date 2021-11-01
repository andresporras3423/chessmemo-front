import {useState, useEffect } from 'react';
import {updateConfigData} from '../data/configData';
import {getDifficultyData} from '../data/difficultyData';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConfig } from '../actions/index';
import { nanoid } from 'nanoid';

function Settings(props) {
  const {DifficultyId, questions, handleGetConfig} = props;
  const [levels, setLevels] = useState([]); 
  const [configData, setConfigData] = useState({
  'DifficultyId': DifficultyId,
  'questions': questions});
  const [messageStatus, setMessageStatus] = useState(0);

  useEffect(() => {
    (
      async ()=>{
        const difficultyData = await getDifficultyData();
         setLevels(difficultyData);
      }
    )();
    }, []);

  const updateSettings = async ()=>{
    const answ = await updateConfigData(configData['DifficultyId'], configData['questions']);
    if(answ.status===200) {
      setMessageStatus(1);
      handleGetConfig({
        'DifficultyId': configData['DifficultyId'],
        'questions': configData['questions'],
      });
    }
    else setMessageStatus(2);
  }

  const typeSetting = (property, val)=>{
    setConfigData((()=>{
      return {
        ...configData,
        [property]: parseInt(val),
      }
    })());
    setMessageStatus(0);
  }

  const successMessage = ()=>{
    if(messageStatus===1) return (<div className="alert alert-success">data successfully updated</div>)
    else if(messageStatus===2) return (<div className="alert alert-danger">an error occurs, data couldn't be saved</div>)
    else return (<></>)
  }
  if(levels.length===0) return <></>
  else return (
      <div className="settings-parent">
        <div className="settings">
        <label>Level: </label>
          <select value={configData['DifficultyId']} onChange={(e)=>typeSetting('DifficultyId', e.target.value)}>
                    {
                      levels.map(
                        (level)=>(
                          <option key={nanoid()} value={level.id}>{level.difficulty_name}</option>
                        )
                      )
                    }
          </select>
          <label>questions:</label>
          <input type="number" min="3" max="100" value={configData['questions']}  onChange={(e)=>typeSetting('questions', e.target.value)}></input>
          <button className="btn btn-dark" onClick={updateSettings}>Update</button>
        </div>
          {successMessage()}
      </div>
    );
  }

  const mapDispatchToProps = dispatch => ({
    handleGetConfig: nConfig => {
      dispatch(getConfig(nConfig));
    }
  });
  
  const mapStateToProps = state => ({
    DifficultyId: state.config.DifficultyId,
    questions: state.config.questions,
    });
  
  Settings.propTypes = {
    DifficultyId: PropTypes.number,
    questions: PropTypes.number,
    handleGetConfig: PropTypes.func,
  };
  
  Settings.defaultProps = {
    DifficultyId: 0,
    questions: 10,
    handleGetConfig: null,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);