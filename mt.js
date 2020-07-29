var mlog = require('./base.js').MLog
var callMT = function (){
    launchApp("美团");
    sleep(5000);

    var gy = desc("免费领水果").findOnce();
    if (gy) {
        click(gy.bounds().centerX(), gy.bounds().centerY());
    }else{
        mlog("没找到免费领水果入口");
        return;
    }

    sleep(10000);
    getWaterCheck();

    mlog("美团完成");
}


function getWaterCheck(){
    click(115,1818);
    sleep(2000);
    var x = 154;
    var times = 5;
    rowSignClick(x,times);
    checkGetWaterResult();
    click(897,1580);
    checkGetWaterResult();
    swipe(527,1821,527,721,1000);
    browse1GetWater();
}

function rowSignClick(x,times){
    if(times <= 0){
        return;
    }
    sleep(1000);
    click(x,972);
    rowSignClick(x+170,times-1);
}

//浏览砸金蛋
function browse1GetWater(){
    sleep(1000);
    click(888,1819);
    sleep(1000);
    back();
    sleep(1000);
    click(115,1818);
    sleep(2000);
    click(888,1819);
    sleep(2000);
    checkGetWaterResult();
}

function checkGetWaterResult(){
    click(384,1666);
    click(891,768);
}

module.exports = {
    CallMT: callMT
}