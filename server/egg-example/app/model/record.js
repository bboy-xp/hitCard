module.exports = app => {
    const mongoose = app.mongoose;
    const RecordSchema = new mongoose.Schema({
      name: { type: String },
      headPicUrl: { type: String },
      money: { type: Number },//投入的钱数
      createTime: {type: Date},
      hitCardTime: {type: Date},
      use: {type: Boolean},//记录支付的一元钱是否被用了，hitCard时更新
      getMoney: {type: Number},//获得的钱，最后打完卡更新
      got: {type: Boolean}//是否获得了钱，先在hitCard初始化，再在successHitCard时更新
      
    },{
      timestamps: true,
    });
  
    return mongoose.model('Record', RecordSchema);
  }