import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './WeatherApp.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });


  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const [data,setData] = React.useState("");
  const [weather,setWeather] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e)=>{
    setData(e.target.value)
    console.log(data)
  }
  const handleClick = ()=>{
    const apiKey = "bcf71a78f2714a1c84e85029242402";
    setIsLoading(true)
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}&aqi=no`)
    .then((res)=>{
      setIsLoading(false)
      console.log(res);
      const current = res.data.current;
      const location = res.data.location;
      setWeather({...weather,
        name: location.name,
        region: location.region,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        humidity: current.humidity,
        temp_c: current.temp_c,
        temp_f: current.temp_f
      })
    
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className="title">
          <Toolbar>
            <Typography variant="h6" component="div" className='header'>
              Weather App by Miloni Shah
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box className="box">
      <Container className='container'>
      

        <TextField
          id="outlined-search-input"
          label="Search"
          type="search"
          onChange={(e)=>{handleChange(e)}}
        />
        <br/><br/>
        <Button variant="contained" onClick={()=>{handleClick()}}>Search</Button>
        <br/><br/><br/>
        <center>
        {isLoading?(<div><AutorenewIcon /></div>):(weather && (<div >
          <Card sx={{ maxWidth: 345 }}>
        <CardActionArea className='card2'>
        <CardContent className='card1'>
          <Typography gutterBottom variant="h5" component="div" className='body'>
            {weather.name},{weather.region}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='body'>
            Feels like <sup>o</sup>C: {weather.feelslike_c}<br/>
            Feels like <sup>o</sup>F: {weather.feelslike_f}<br/>
            Humidity: {weather.humidity}<br/>
            Temparature <sup>o</sup>C: {weather.temp_c}<br/>
            Temparature <sup>o</sup>F: {weather.temp_f}<br/>
          </Typography>
        </CardContent>
      </CardActionArea>
        </Card>
        </div>))}
        </center>
        

      </Container>
      </Box>
    </React.Fragment>
  );
}