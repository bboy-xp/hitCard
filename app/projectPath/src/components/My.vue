<template>
    <div class="contain">
        <div class="head">
            <img src="../../static/picture/bg.jpg" alt="" class="bg">
            <div class="me">
                <img class="myHeadPic" src="../../static/picture/head.png" alt="">
                <div class="name">
                    {{name}}
                </div>
            </div>
            <div class="infos">
                <div class="info">
                    <div class="infoTitle">我的付出(元)</div>
                    <div class="infoCount">{{pay}}</div>
                </div>
                <div class="info">
                    <div class="infoTitle">我的收获(元)</div>
                    <div class="infoCount">{{harvest}}</div>
                </div>
                <div class="info">
                    <div class="infoTitle">累计打卡(天)</div>
                    <div class="infoCount">{{hitCard}}</div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title">战绩明细</div>
            <div class="details">
                <div class="detail" v-for = '(info,index) in infos' :key="index">
                    <div class="date">{{info.createTime[index].month}}-{{info.createTime[index].day}}</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+1.02</div>
                </div>
                
            </div>
        </div>
        <div class="foot">
            <router-link to="/">
                <div class="tab">
                    <img class="tabIcon" src="../../static/picture/home.png" alt="">
                    <div class="tabName Home">首页</div>
                </div>
            </router-link>
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/me.png" alt="">
                <div class="tabName My">我的</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return{
            name: "newbility-xp",
            pay: 0,
            harvest: 0,
            hitCard: 0,
            infos:[]
        }
    },
    mounted: async function(){
        axios.post("/meGetInfo",{name: this.name}).then(res => {
            console.log(res);
            this.pay = res.data[0].createTime.length;
            //这里需要修改，将打卡的情况也加入数据库里，在这里渲染
            this.harvest = res.data[0].createTime.length;
            this.hitCard = res.data[0].createTime.length;
            this.infos = res.data;
        })
    }
};
</script>

<style scoped>
    .contain{
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .head{
        height: 200px;
        

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
        height: 60px;
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
        margin-top: -65px;
        display: flex;
        width: 100%;
        color: white;
    }
    .info{
        margin: 80px 20px 0 20px;
        width: 80px;
        text-align: center;
    }
    .infoTitle{
        width: 100px;
        font-size: 15px;
    }
    .infoCount{
        
        font-size: 20px;
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
        font-size: 16px;
        font-weight: lighter;
        font-size: 14px;        
        padding: 3px 15px;
        background-color: #eeeeee;
        width: 100%;
    }
    .details{
        overflow: scroll;
    }
    .detail{
        border-bottom: 1px solid #efefef;
        display: flex;
        height: 50px;
        align-items: center;
        font-size: 14px;
    }
    .date{
        margin: 0 10px 0 15px;
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
    
    .foot {
        background-color: #f2f2f2;
        display: flex;
        justify-content: space-around;
        height: 50px;
        width: 100%;
    }
    .tabIcon {
        height: 20px;
        margin-left: 3px;
        margin-top: 4px;
    }
    .tabName{
        font-size: 13px;
    }
    .Home{
        color:hsl(202, 100%, 50%);
    }
    
</style>