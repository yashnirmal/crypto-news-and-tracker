import React from 'react'
import './Coinlist.css';
import {useState,useEffect} from 'react';
import {
  TextField,
  TableContainer,
  LinearProgress,
} from "@material-ui/core";
import {  Pagination } from "@material-ui/lab";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {useNavigate} from 'react-router-dom'

export default function Coinlist() {

  const navigate = useNavigate();

  const [coins, setCoins ] = useState([]);
  const [coinListToShow,setCoinListToShow]=useState([]);
  const [searchText,setSearchText] = useState('');
  const [loading,setLoading]=useState(true);
  const [page,setPage] = useState(1);
  
  function fetchCoins(){

    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
      'X-RapidAPI-Key': 'ecb580c7abmsh3c86003d6b33c29p1051f6jsnc95b28b7d36c'
      }
    };

  fetch('https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=200&order=market_cap_desc', options)
    .then(response => response.json())
    .then((result) => {
      console.log(result);
      setCoins(result);
      setCoinListToShow(result);
      setLoading(false);
    })
    .catch(err => console.error(err));

  }


  function searchCoin(name){
    if(name===""){
      setCoinListToShow(coins);
    }
    let coinlist = [];

    name = name.toLowerCase();
    for(let c of coins){
      if (
        c.name.toLowerCase().includes(name) ||
        c.symbol.toLowerCase().includes(name) ||
        c.id.toLowerCase().includes(name)
      ) {
        coinlist.push(c);
      }
    }

    setPage(1);
    setCoinListToShow(coinlist);
    return coinlist;
  }


  useEffect(()=>{
    fetchCoins();
  },[]);

  return (
    <div className="coinlist">
      <h1 className="coinlist-title">Coin List</h1>
      <TextField
        label="Search crytpocurrencies"
        size="small"
        variant="outlined"
        style={{ width: "100%", marginBottom: 20, marginTop: 20 }}
        onChange={(e) => searchCoin(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "blue" }}>
              <TableRow>
                {[
                  "Symbol",
                  "Rank",
                  "Name",
                  "Price",
                  "24h Change",
                  "Market Cap",
                ].map((el) => (
                  <TableCell
                    key={el}
                    style={{ fontWeight: "bold", color: "white" }}
                  >
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {coinListToShow.slice((page - 1) * 20, (page - 1) * 20 + 20).map((el) => (
                <TableRow className="tablebody-row" onClick={(e)=>{navigate("/coin/"+el.id,{state:el.id})}}>
                  <TableCell>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img src={el.image} alt="imgage" style={{width:"13%",marginRight:10}} />
                      {el.symbol.toUpperCase()}
                    </div>
                    </TableCell>
                  <TableCell>{el.market_cap_rank}</TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>$ {el.current_price}</TableCell>
                  <TableCell
                    style={
                      el.price_change_percentage_24h < 0
                        ? { color: "red" }
                        : { color: "green" }
                    }
                  >
                    {el.price_change_percentage_24h}%
                  </TableCell>
                  <TableCell>$ {el.market_cap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination
        count={(coinListToShow.length%20===0)?parseInt(coinListToShow.length/20):parseInt(coinListToShow.length/20)+1}
        style={{ marginTop: 100 }}
        onChange={(e, value) => {
          setPage(value);
        }}
      />
    </div>
  );
}
