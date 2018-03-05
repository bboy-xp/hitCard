<template>
    <div class="contain">
        <div class="head">
            <img src="../../static/picture/bg.jpg" alt="" class="bg">
            <div class="me">
                <img class="myHeadPic" src="../../static/picture/head.png" alt="">
                <div class="name">
                    newbility-xp
                </div>
            </div>
            <div class="infos">
                <div class="info">
                    <div class="infoTitle">我的付出(元)</div>
                    <div class="infoCount">20</div>
                </div>
                <div class="info">
                    <div class="infoTitle">我的付出(元)</div>
                    <div class="infoCount">20</div>
                </div>
                <div class="info">
                    <div class="infoTitle">我的付出(元)</div>
                    <div class="infoCount">20</div>
                </div>

                
            </div>
        </div>
        <div class="body">
            <div class="title">战绩明细</div>
            <div class="details">
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div><div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                <div class="detail">
                    <div class="date">01-12</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
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
        height: 200px;
        margin-bottom: 20px;

    }
    .bg{
        width: 100%;
        height: 200px;
        position: absolute;
        left: 0;
        z-index: -1;
    }
    .me{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    .myHeadPic{
        height:60px;
        width: 60px;
        border: 3px solid rgb(247, 236, 236);
        border-radius: 60px;
        overflow: hidden;
        margin-top: 10px;
        margin-left: 140px;
    }
    .name{
        font-size: 19px;
        
    }
    .infos{
        margin-top: -60px;
        display: flex;
        width: 100%;
    }
    .info{
        margin: 80px 20px 0 20px;
        width: 80px;
    }
    .body{
        flex: 1;
        width: 100%;
        overflow: hidden;
        display: flex;
        position: relative;
        flex-direction: column;
        
    }
    .title{
        margin: 0;
        /* margin-top: -10px; */
        font-size: 16px;
        font-weight: lighter;
        
        
        padding: 3px 15px;
        background-color: #eeeeee;
        width: 100%;
    }
    .detailS{
        overflow: scroll;
    }
    .detail{
        border-bottom: 1px solid #efefef;
        display: flex;
        height: 50px;
        align-items: center;
    }
    .date{
        margin: 0 10px 0 20px;
        color: #909090;
    }
    .hitCard{
        flex:1;
        color: #ffcb6c;
    }
    .money{
        margin-right: 20px;
        color: #7fb853;
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


