require('dotenv').config(); 
const express = require('express');
const app = express();
require('./config/db')

const userRoutes = require('./routes/user');
const eventsRoutes = require('./routes/events');
const venueRoutes = require('./routes/venue');
const bookingRoutes = require('./routes/booking');


const httpErrorRequests = require('./middlewares/http-error-handlers'); //http error handler

const PORT = process.env.PORT || 8000;
//app.use(logRequests); //to log requests in console
app.use(express.json());
console.log("test00")
app.use('/api/v1',userRoutes);
app.use('/api/v1',eventsRoutes);
app.use('/api/v1',venueRoutes);
app.use('/api/v1',bookingRoutes);
app.use(httpErrorRequests.httpErrors);
app.use(httpErrorRequests.genericErrors);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})