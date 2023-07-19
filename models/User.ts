import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    username: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    favorites: {
      type: [String]
    }
  }, { timestamps: true });
  
export default mongoose.models.User || mongoose.model('User', userSchema);