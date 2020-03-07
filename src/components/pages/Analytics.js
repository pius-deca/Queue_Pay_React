import React from 'react'
import Histogram from 'react-chart-histogram';
import { useHistory } from "react-router-dom";

function Analytics(){
    let history = useHistory();
    if (!localStorage['auth']) {
      history.push("/");
    }
    const labels = ['2016', '2017', '2018', '2017', '2018', '2017', '2018'];
    const data = [324, 45, 672, 45, 672, 45, 672];
    const options = { fillColor: 'green', strokeColor: 'gray' };
    return (
      <div>          
        <div className="container">
            <Histogram
                xLabels={labels}
                yValues={data}
                width='600'
                height='300'
                options={options}
            />
        </div>
      </div>
    )
}

export default Analytics
