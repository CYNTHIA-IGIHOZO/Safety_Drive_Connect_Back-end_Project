import mongoose from 'mongoose';

const reachoutSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reachout = mongoose.model('Reachout', reachoutSchema);

export default Reachout;