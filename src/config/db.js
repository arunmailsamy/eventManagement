const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
    console.log('connected to DB');
})
mongoose.connection.on('error', () => {
    console.log('error while connecting to DB');
})
try {
    mongoose.connect(process.env.MONGO_URI);
} catch (err) {
    console.log(err);
}