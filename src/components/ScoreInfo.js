import {useEffect, useState} from 'react';
import {getBestPersonal, getBestGlobal, getRecentConfig, getRecentPersonal} from '../data/scoreData';
function ScoreInfo(props) {
    const {option, key} = props;
    const [listData, setListData] = useState([]);

  useEffect(async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    let data=[];
    if(option==='3')  data = await getBestPersonal(signal); 
    else if(option==='4') data = await getBestGlobal(signal);
    else if(option==='5') data = await getRecentConfig(signal);
    else if(option==='6') data = await getRecentPersonal(signal);
    console.log(data);
    setListData(data);
    return function cleanup() {
        abortController.abort();
      };
  }, [key]);
    return (
        <table className="table tableContent">
        <thead className="thead-dark">
            <tr>
                <th>Corrects</th>
                <th>Seconds</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {
                listData.map(
                    (data)=>(
                        <tr>
                            <td>{data.corrects} out of {data.questions}</td>
                            <td>{data.seconds}</td>
                            <td>{data.created_at}</td>
                        </tr>
                    )
                )
            }
        </tbody>
    </table>

    );
  }
  
  export default ScoreInfo;