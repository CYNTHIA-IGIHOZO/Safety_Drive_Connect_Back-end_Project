// service.model.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
   
  name: { type: String, required: true },      
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now () }
});
const Service = mongoose.model('service',serviceSchema);
export default Service;