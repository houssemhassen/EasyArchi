const express = require('express');
const articleApi = require('./routes/article');
const architectApi = require('./routes/architect');
const cors = require('cors');
require('./config/connect');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/article' , articleApi);
app.use('/architect', architectApi);
app.use('/getimage' , express.static('./uploads'));






const PORT = 3000; 
app.listen(3000, () => {
    console.log('Server is running on port ' + 3000);
});