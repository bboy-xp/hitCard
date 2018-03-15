module.exports = app => {
    const mongoose = app.mongoose;
    const PasswordSchema = new mongoose.Schema({
      name: { type: String },
      password: { type: String }
      
    },{
      timestamps: true,
    });
  
    return mongoose.model('Password', PasswordSchema);
  }