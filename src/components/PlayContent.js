import {useEffect, useRef, createRef} from 'react';
import useState from 'react-usestateref';
import PropTypes from 'prop-types';
import {getPositions} from '../data/positionData';
import {saveScore} from '../data/scoreData';

function PlayContent(props) {
  const {forceUpdate} = props;
  const [initialTime, setInitialTime] = useState(new Date());
  const [totalTime, setTotalTime] = useState(0);
  const [answer, setAnswer] = useState('');
  const [corrects, setCorrects, refCorrects] = useState(0);
  const [listQuestions, setListQuestions, refListQuestions] = useState([]);
  const [totalPieces, setTotalPieces, refTotalPieces] = useState(0);
  const [currentQuestion, setCurrentQuestion, refCurrentQuestion] = useState(0);
  const [sol, setSol] = useState(-1);
  const [messageAnswer, setMessageAnswer] = useState('');
  const [playingGame, setPlayingGame, refPlayingGame] = useState(1);
  const [position, setPosition, refPosition] = useState(null);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const [cells, setCells, refCells] = useState([]);
  const [level, setLevel, refLevel] = useState([]);
  const [ranking, setRanking] = useState(-1);
  const [personalRanking, setPersonalRanking] = useState(-1);
  const [pieces, setPieces, refPieces] = useState({
    "bp": "/assets/black-pawn.svg",
    "bn": "/assets/black-knight.svg",
    "bb": "/assets/black-bishop.svg",
    "br": "/assets/black-rook.svg",
    "bq": "/assets/black-queen.svg",
    "bk": "/assets/black-king.svg",
    "wp": "/assets/white-pawn.svg",
    "wn": "/assets/white-knight.svg",
    "wb": "/assets/white-bishop.svg",
    "wr": "/assets/white-rook.svg",
    "wq": "/assets/white-queen.svg",
    "wk": "/assets/white-king.svg",
    "": ""
  });

  const createBoardRefs = ()=>{
    let tempCells=[];
    for(let i=0; i<8;i++){
      tempCells.push([]);
      for(let j=0; j<8;j++){
        tempCells[i].push({piece:"", classes:""});
      }
    }
    setCells(tempCells);
  };

  const updateCurrentTime = ()=>{
    if(refPlayingGame.current!==1){
      return;
    }
    const new_value = Math.round((new Date() - initialTime.valueOf())/1000);
    setTotalTime(new_value);
    setTimeout(updateCurrentTime, 1000);
  };
  
  const getQuestions = async ()=>{
    const questions_and_level = await getPositions();
    setListQuestions(questions_and_level["positions"]);
    setLevel(questions_and_level["difficulty_id"]);
  };

  const saveNewScore = async ()=>{
    const nCorrects = refCorrects.current;
    const nSeconds = totalTime;
    const scores= await saveScore(nCorrects, nSeconds);
    setRanking(scores.global_position);
    setPersonalRanking(scores.personal_position);
  };

  const nextQuestion = async ()=>{
    if(refCurrentQuestion.current===refListQuestions.current.length){
      setPlayingGame(0);
      await saveNewScore();
      divRef.current?.focus();
      return;
    }
    const rows = refListQuestions.current[refCurrentQuestion.current].pieces_position.split("*");
    const piecesToAdd = [];
    rows.forEach((row)=> piecesToAdd.push(row.split(",")))
    let tempCells = [];
    for(let i=0; i<8;i++){
      tempCells.push([]);
      for(let j=0; j<8;j++){
        const classes = defineCellClasses(i, j);
        tempCells[i].push({piece:piecesToAdd[i][j], classes:classes});
      }
    }
    setCells(tempCells);
  };

  const giveAnswer = ()=>{
    if(parseInt(answer)===refListQuestions.current[refCurrentQuestion.current].movements_available){
      setCorrects(refCorrects.current+1);
      setMessageAnswer("correct answer");
    }
    else{
      setMessageAnswer(`Incorrect, the solution was ${refListQuestions.current[refCurrentQuestion.current].movements_available}`);
    }
    setAnswer("");
    setCurrentQuestion(refCurrentQuestion.current+1);
    nextQuestion();
    inputRef.current?.focus();
  };

  const defineCellClasses= (i, j)=>{
    const question = refListQuestions.current[refCurrentQuestion.current];
    const last_move_info = question.last_movement.split(",");
    if(i==0 && j==0 && question.black_long_castling){
      return "castling-cell";
    }
    else if(i==0 && j==7 && question.black_short_castling){
      return "castling-cell";
    }
    else if(i==7 && j==0 && question.white_long_castling){
      return "castling-cell";
    }
    else if(i==7 && j==7 && question.white_short_castling){
      return "castling-cell";
    }
    else if(i==last_move_info[1] && j==last_move_info[2]){
      return "last-move-cell";
    }
    else if(i==last_move_info[4] && j==last_move_info[5]){
      return "last-move-cell";
    }
    else if((i+j)%2==0){
      return "white-cell";
    }
    return "black-cell";
  };

  useEffect(async ()=>{
    const abortController = new AbortController();
    createBoardRefs();
    await getQuestions();
    setTotalPieces(refListQuestions.current[0].pieces_position.split("*").join("").split(",").reduce((counter, obj) => obj !== '' ? counter += 1 : counter, 0));
    nextQuestion();
    inputRef.current?.focus();
    updateCurrentTime();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const displayContent = ()=>{
    if(refPlayingGame.current===1){
      return (
        <>
          <div className="board">
          <h4>Total questions: {refListQuestions.current.length}</h4>
          <h4>level: {level}</h4>
          <h4>Total time: {totalTime}</h4>
          <h4>total corrects: {refCorrects.current}/{currentQuestion}</h4>
            {
              refCells.current.map(
                (row)=>{
                  return(
                    <div className="rowBoard">
                      {
                        row.map(
                          (cell)=>{
                            return(
                              <div className={"cell-properties "+cell.classes}>
                                <img className="pieceImage" src={pieces[cell.piece]} height="40px" width="40px" className={cell.piece==="" ? "invisible" : ""} />
                              </div>
                            )
                          }
                        )
                      }
                    </div>
                  )
                }
              )
            }
            <div className="messageHeight">{messageAnswer}</div>
            <div class="submit-buttons">
            <div class="grid-buttons">
              <input type="button" value="0" onClick={()=>setAnswer(answer+'0')} />
              <input type="button" value="1" onClick={()=>setAnswer(answer+'1')}/>
              <input type="button" value="2" onClick={()=>setAnswer(answer+'2')}/>
              <input type="button" value="3" onClick={()=>setAnswer(answer+'3')}/>
              <input type="button" value="4" onClick={()=>setAnswer(answer+'4')}/>
              <input type="button" value="5" onClick={()=>setAnswer(answer+'5')}/>
              <input type="button" value="6" onClick={()=>setAnswer(answer+'6')}/>
              <input type="button" value="7" onClick={()=>setAnswer(answer+'7')}/>
            </div>
            <div class="grid-submit">
            <input type="button" value="8" onClick={()=>setAnswer(answer+'8')}/>
              <input type="button" value="9" onClick={()=>setAnswer(answer+'9')}/>
              <input type="button" value="<" onClick={()=>setAnswer(answer.length==0 ? answer : answer.slice(0,-1))}/>
            <input className='form-control' onKeyPress={(e)=>{if (e.charCode === 13) giveAnswer()}} ref={inputRef} type="number" value={answer} onChange={(el)=>setAnswer(el.target.value)} disabled></input>
            <button className='btn btn-dark' onClick={giveAnswer}>send</button>
            </div>
            </div>
          </div>
          <div>
          </div>
          
        </>
      )
    }
    return (
      <div tabindex="0" onKeyPress={(e)=>{if (e.charCode === 13) forceUpdate()}} ref={divRef}>
      <h4>Final time: {totalTime}</h4>
      <h4>Final corrects: {refCorrects.current}/{refListQuestions.current.length}</h4>
      <h4>Ranking: {ranking}</h4>
      <h4>Personal ranking: {personalRanking}</h4>
      <button className='btn btn-dark' onClick={forceUpdate}>Play again</button>
      </div>
    );
  };

    return (
      <div>
        {displayContent()}
      </div>
    );
  }
  
    PlayContent.propTypes = {
    forceUpdate: PropTypes.func,
  };
  
  PlayContent.defaultProps = {
    forceUpdate: null,
  };
  
  export default PlayContent;