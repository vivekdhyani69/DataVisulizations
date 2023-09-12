// db.js
const mongoose = require('mongoose');

//const MONGODB_URI = "mongodb+srv://vivek_64:OEy3Pe1xN8O8Ka4B@cluster0.qyqwkwo.mongodb.net/DataVisulization?retryWrites=true&w=majority";
const MONGODB_URI =   "mongodb+srv://vivek_64:0YBX5QiguEZLWYL9@cluster0.mwce7ia.mongodb.net/DataVisulization?retryWrites=true&w=majority";

const DATABASE_NAME = 'DataVisulization';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);
});
