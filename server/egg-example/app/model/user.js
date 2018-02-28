module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      name: { type: String },
      money: { type: Number },
      createTime: { type: Array }
    });
  
    return mongoose.model('User', UserSchema);
  }