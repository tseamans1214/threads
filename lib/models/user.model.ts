import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  follows: [
        {
            //type: String
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
  ],
});

// First checks if the model of the user exist on the Database,
//  if not, it creates one using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;