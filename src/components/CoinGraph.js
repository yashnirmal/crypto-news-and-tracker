import React from 'react'
import { useState,useEffect} from 'react';
import {CircularProgress} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function CoinGraph(props) {

    const [graphData,setGraphData] = useState();
    const [days,setDays] = useState(1);
    const [loading,setLoading] = useState(true);

    function fetchCoinGraph(){
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
            "X-RapidAPI-Key":
              "ecb580c7abmsh3c86003d6b33c29p1051f6jsnc95b28b7d36c",
          },
        };

        fetch(
          `https://coingecko.p.rapidapi.com/coins/${props.coinid}/market_chart?vs_currency=usd&days=${days}`,
          options
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result.prices)
            setGraphData(result.prices);
            setLoading(false);
          })
          .catch((err) => console.error(err));
    }


    function handleDaysChange(event){
      setDays(event.target.value);
    }

    useEffect(()=>{
        fetchCoinGraph();
    },[days]);

    if(!graphData)
    return <CircularProgress />

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ padding: 20}}>

          {/* Number of days selector */}
          <FormControl variant="outlined" >
            <InputLabel id="coin-graph-input-label">Days</InputLabel>
            <Select
              labelId="coin-graph-input-label"
              id="coin-graph-selector"
              value={days}
              onChange={handleDaysChange}
              label="Days"
            >
              <MenuItem value={1}>Last 24 hours</MenuItem>
              <MenuItem value={7}>Last week</MenuItem>
              <MenuItem value={30}>Last month</MenuItem>
              <MenuItem value={365}>Last year</MenuItem>
              <MenuItem value={1825}>Last 5 years</MenuItem>
            </Select>
          </FormControl>


          <Line
            data={{
              labels: graphData.map((el, index) => {
                let date = new Date(el[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                if (days == 1) return time;
                else return date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `Price(for past ${days} days)`,
                  data: graphData.map((el, index) => {
                    return el[1];
                  }),
                  borderColor: "#0000ff",
                },
              ],
            }}
            options={{
              responsive: true,
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
}
