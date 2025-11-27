import { connect } from 'mongoose';
import config from './config';

const connectDB = async () => {
  try {
    const conn = await connect(config.mongoUri);
    console.log('Mongo DB connected');
  } catch (error) {
    console.log(error);
    console.error('Unable to connect to Database');
    process.exit(1);
  }
};

export default connectDB;
