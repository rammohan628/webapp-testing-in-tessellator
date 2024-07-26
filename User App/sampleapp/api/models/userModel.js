import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const AutoIncrement = AutoIncrementFactory(connection);

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true},
  updated: Date,
  created: { type: Date, default: Date.now }
});

userSchema.plugin(AutoIncrement, { id: 'user_id_counter', inc_field: '_id', start_seq: 100 });

export default connection.model('User', userSchema);
