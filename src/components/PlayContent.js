import {useEffect, useRef, createRef} from 'react';
import useState from 'react-usestateref';
import PropTypes from 'prop-types';
import {getPositions} from '../data/positionData';

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
  const levels=["noob", "easy", "hard", "professional"]

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
    const questions = await getPositions();
    setListQuestions(questions);
  };

  const nextQuestion = async ()=>{
    if(refCurrentQuestion.current===refListQuestions.current.length){
      divRef.current?.focus();
      return;
    }
    const rows = refListQuestions.current[refCurrentQuestion.current].board.split("*");
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
    if(parseInt(answer)===refListQuestions.current[refCurrentQuestion.current].available_moves){
      setCorrects(refCorrects.current+1);
    }
    setAnswer("");
    setCurrentQuestion(refCurrentQuestion.current+1);
    nextQuestion();
    inputRef.current?.focus();
  };

  const defineCellClasses= (i, j)=>{
    const question = refListQuestions.current[refCurrentQuestion.current];
    const last_move_info = question.last_move.split(",");
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
    setTotalPieces(refListQuestions.current[0].board.split("*").join("").split(",").reduce((counter, obj) => obj !== '' ? counter += 1 : counter, 0));
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
        <h4>Total questions: {refListQuestions.current.length}, level: {levels[Math.ceil(Math.log2(totalPieces))-2]}</h4>
          <h4>Total time: {totalTime}</h4>
          <h4>total corrects: {refCorrects.current}/{currentQuestion}</h4>
          <div className="board">
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
          </div>
          <div>
          </div>
          <div className="messageHeight">{messageAnswer}</div>
          <div className="form-group play-form">
            <input className='form-control' onKeyPress={(e)=>{if (e.charCode === 13) giveAnswer()}} ref={inputRef} type="number" value={answer} onChange={(el)=>setAnswer(el.target.value)}></input>
            <button className='btn btn-dark' onClick={giveAnswer}>submit</button>
          </div>
        </>
      )
    }
    return (
      <div tabindex="0" onKeyPress={(e)=>{if (e.charCode === 13) forceUpdate()}} ref={divRef}>
      <h4>Final time: {totalTime}</h4>
      <h4>Final corrects: {refCorrects.current}/{refListQuestions.current.length}</h4>
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