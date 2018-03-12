module.exports = app => {
    const mongoose = app.mongoose;
    const RecordSchema = new mongoose.Schema({
      name: { type: String },
      money: { type: Number },//累计投入的钱数，做毅力排行榜
      createTime: {type: Date},
      hitCardTime: {type: Date},
      use: {type: Boolean},//记录支付的一元钱是否被用了，hitCard时更新
      getMoney: {type: Number}//获得的钱，最后打完卡更新
      
    },{
      timestamps: true,
    });
  
    return mongoose.model('Record', RecordSchema);
  }