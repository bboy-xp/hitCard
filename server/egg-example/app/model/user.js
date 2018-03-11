module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      name: { type: String },
      money: { type: Number },//累计投入的钱数，做毅力排行榜
      createTime: { type: Date},//参与的时间
      hitCard: {type: Date},//签到的时间，做早起排行榜
      getMoney:{type: Array}//每一次获得的钱数，做运气排行榜
    },{
      timestamps: true,
    });
  
    return mongoose.model('User', UserSchema);
  }