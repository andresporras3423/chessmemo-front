import ScoreInfo from './ScoreInfo';
import TopQuestions from './TopQuestions';
import RecentQuestions from './RecentQuestions';
import { nanoid } from 'nanoid';

function Feedback(props) {
  const {option} = props;


  const printTitle=()=>{
    if(option==='3') return (<h3>show top scores for current config</h3>);
    else if(option==='4') return (<h3>show top score all players</h3>);
    else if(option==='5') return (<h3>show recent personal for current config</h3>);
    else if(option==='6') return (<h3>show recent personal for all configs</h3>);
  };

  const printTable = ()=>{
    return (<ScoreInfo option={option} key={nanoid()} /> );
  }
  
  return (
    <div className="tableContainer">
      {printTitle()}
            <div>
              {printTable()}
            </div>
        </div>
  )
  }
  
  export default Feedback;