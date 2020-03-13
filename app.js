const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

require('dotenv').config();

// import routes

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tickerRoutes = require('./routes/ticker');
const liveTradeRoutes = require('./routes/liveTrade');
const inboxRoutes = require('./routes/inbox');
const securityRoutes = require('./routes/securities');
const equityRoutes = require('./routes/equity');
const brokersRoutes = require('./routes/brokers');
const nasdsecurityRoutes = require('./routes/security');
const annualreportRoutes = require('./routes/annualreport');
const participantRoutes = require('./routes/participant');
const mailRoutes = require('./routes/mail');







// create mysql connection



//app
const app = express();

// db

mongoose.connect(process.env.DATABASE, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(() =>console.log("DB Connected"))
.catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

// middleware;
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());
  app.use(cors());


//routes middlewares

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',tickerRoutes);
app.use('/api',liveTradeRoutes);
app.use('/api',inboxRoutes);
app.use('/api',securityRoutes);
app.use('/api',equityRoutes);
app.use('/api',brokersRoutes);
app.use('/api',nasdsecurityRoutes);
app.use('/api',annualreportRoutes);
app.use('/api',participantRoutes);
app.use('/api',mailRoutes);









const port =  process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})