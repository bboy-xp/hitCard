module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
      name: { type: String },
      money: { type: Number },//累计投入的钱数
      createTime: { type: Date},//参与的时间
      hitCard: {type: Date},//签到的时间，做早起排行榜,hitCard时更新
      hitCardCount: { type: Number },//记录打卡的次数，做毅力排行榜,hitCard时更新
      
    },{
      timestamps: true,
    });
  
    return mongoose.model('User', UserSchema);
  }