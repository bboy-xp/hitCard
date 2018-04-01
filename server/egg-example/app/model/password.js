module.exports = app => {
    const mongoose = app.mongoose;
    const PasswordSchema = new mongoose.Schema({
      name: { type: String },
      headImgUrl: { type: String },//用户头像
      sex: { type: Number },
      city: { type: String },
      province: { type: String },
      country: { type: String },
      openid: { type: String },
    },{
      timestamps: true,
    });
  
    return mongoose.model('Password', PasswordSchema);
  }