import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const Chairman_REST_API_URL='http://localhost:8086/moviesite/api/chairman'
class ChairmanService{
    getChairman(){
       return axios.get(Chairman_REST_API_URL);
    }
}
export default new ChairmanService();