<template>
    <div class="contain">
        <div class="head">
            <img class="bg" src="../../static/picture/bg2.jpg" alt="">
            <div class="info">
                <div class="infoText1">明早参与打卡挑战的人数</div>
                <div class="peopleCount">111111</div>
                <div class="infoText2">当前共有{{totalMoney}}元打卡金</div>

            </div>
        </div>
        <div class="body">
            <div class="join">
                <div class="joinText">
                    参与打卡挑战
                </div>
                <div class="joinRule">
                    挑战规则 >>
                </div>
            </div>
            <div class="situation">
                <div class="todaySituation">
                    <div class="title">今日打卡战况</div>
                    <div class="situationText">
                        {{successPeople}}人打卡成功,{{faliPeople}}人打卡失败
                    </div>
                </div>
                <div class="users">
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle">早起之星</div>
                        <div class="name">{{name}}</div>
                        <div class="describe">{{hitCardTime}}打卡</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle">运气之星</div>
                        <div class="name">{{name}}</div>
                        <div class="describe">{{hitCardTime}}元</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle">毅力之星</div>
                        <div class="name">{{name}}</div>
                        <div class="describe">连续{{hitCardTime}}次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/home.png" alt="">
                <div class="tabName">首页</div>
            </div>
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/me.png" alt="">
                <div class="tabName">我的</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style>
    .contain{
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .head{
        height: 270px;
        margin-bottom: 20px;
    }
    .bg{
        width: 100%;
        position: absolute;
        left: 0;
        z-index: -1;
    }
    .info{
        z-index: 10px;
        color: white;
        margin: 80px;
        text-align: center;
        font-size: 13px;
        font-weight: lighter;
    }
    .peopleCount{
        font-size: 40px;
        font-weight: normal;
    }
    .body{
        flex: 1;
        overflow: hidden;
    }
    
    .join{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .joinText{
        padding: 10px 100px;
        box-shadow: 5px 5px 5px #ffe4b3;
        border-radius: 10px;
        background-color: #ffc351;
    }
    .joinRule{
        font-size: 12px;
        padding-top: 10px;
        color: grey;
    }
    
    .title{
        font-size: 20px;
        font-family: '黑体';
        font-weight: bolder;
        margin: 20px 0 0 85px;
        width: 150px;
    }
    .situationText{
        margin: 5px 0 20px 65px;
        font-size: 13px;
        font-family: '黑体';
    }
    
    .headPic{
        height:60px;
        border: 3px solid #d3cfcf;
        border-radius: 60px;
        overflow: hidden;
    }
    .users{
        display: flex;
        justify-content: space-around;
    }
    .user{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .userTitle{
        margin-top: -5px;
        font-size: 10px;
        padding: 1px 10px;
        font-weight: lighter;
        background-color: #008001;
        color: white;
    }
    .describe{
        font-size: 11px;
    }
    .foot{
        display: flex;
        justify-content: space-around;
        height: 50px;
        width:100%;

    }
    .tabIcon{
        height: 20px;
        margin-left: 3px;
    }
    .tabName{
        font-size: 13px;
    }
</style>


