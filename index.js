const express = require('express');
const allRoutes = require('./src/app');
const cors = require('cors');

require('dotenv').config();
require('./src/db/config')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/keshaveBlog-files', express.static('src/uploads'));
app.use('/api', allRoutes);




app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port', process.env.PORT);
});