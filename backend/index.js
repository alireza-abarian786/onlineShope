require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

console.log('MONGO_URI is:', process.env.MONGO_URI);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


