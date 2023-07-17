let mlog = require('./base.js').MLog
let checkTextTextAndClick2 = require('./base.js').checkTextTextAndClick2
let checkTextAndClick = require('./base.js').checkTextAndClick
let checkIDAndClick = require('./base.js').checkIDAndClick
let containTextAndClick = require('./base.js').containTextAndClick
let checkTextPosAndClick = require('./base.js').checkTextPosAndClick

const base = require('./base.js');

//进入果园
function enterGuoYuan(){
    launchApp("拼多多");
    sleep(2000)
    var in_gy = false;
    for (let i = 0; i < 10; i++) {
    var duoduogy = text("多多果园").findOnce();
    if (duoduogy) {
        click(duoduogy.bounds().centerX(), duoduogy.bounds().centerY());
        in_gy = true;
        break;
    }
    sleep(1000);
    } 

    if(!in_gy)
    {
        mlog("not found 多多果园");
        return;
    }
    
    sleep(2000);
}

function checkSaiZhi(){
    console.log("enter 骰子")
    var saizhi_texts = ["摇赢水滴","第4名"]
    var saizhi_btr = null;
    for (var i = 0; i < saizhi_texts.length && !saizhi_btr; i++) {
        saizhi_btr = text(saizhi_texts[i]).findOnce();
    }
    if(saizhi_btr)
    {
        var check1 = saizhi_btr.parent().parent();
        if(!check1){
            console.log("not found 摇赢水滴 parent");
            return;
        }
    
        if(!check1.findOne(text("领取奖励"))){
            console.log("not found 领取奖励 in 摇赢水滴")
            if(!check1.findOne(text("可领取"))){
                console.log("not found 可领取 in 摇赢水滴")
                return
            }
        }

        mlog("click 摇赢水滴")
        saizhi_btr.click()
        sleep(3000)

        if(checkTextAndClick("立即领取"))
        {
            var zbbc=  text("领取战败补偿").findOnce();
            if(zbbc)
            {
                zbbc.click()
                sleep(1000)
                click(530,1530)
                sleep(3000)
            }
    
            //浏览得水滴
            // for(var i=0;i<3;i++)
            // {
            //     click(524,2164)
            //     sleep(32000)
            //     back()
            //     sleep(2000)
            // }
        }
        
        //back
        click(56,132)
        sleep(1000)
    }
}

function tryDKWater(){
    var dk = text("打卡集水滴").findOnce();
    if(!dk)
    {
        console.warn("no 打卡集水滴")
        return
    }

    var dk_parent = dk.parent();
    if(!dk_parent){
        console.log("not found 打卡集水滴 parent");
        return;
    }

    if(!dk_parent.findOne(text("可打卡"))){
        return;
    }

    dk.click()
    sleep(1000)
    var dksjjrsd =text("打卡收集今日水滴").findOnce(); 
    if(dksjjrsd)
    {
        dksjjrsd.click()
        sleep(2000)
        click(950,600)
        sleep(1000)
    }
}


function getWaterFromST()
{
    checkTextTextAndClick2("水滴已溢出","请及时领取")
}

function checkLeaf()
{
    var btn1 = idContains("fallenlLeaves").findOnce();
    if(btn1)
    {
        var x = btn1.bounds().centerX()+300;
        var y = btn1.bounds().centerY();
        console.log("click id fallenlLeaves "+x+","+y)
        click(x,y)
        sleep(5000)
        click(950,600);
        sleep(1000);
    }else{
        console.log("not found fallenlLeaves")
    }
}

//浇水竞赛
function checkJSJS()
{
    if(checkTextTextAndClick2("浇水竞赛","可领取"))
    {
        checkTextAndClick("继续参与下一期")
        sleep(5000)
        click(945,428)
        sleep(2000)
    }
}

function callPdd(){
    enterGuoYuan()
    tryCloseBoxFirst();
    
    //浇水竞赛
    checkJSJS();

    //获取昨日浇水
    tryGetAddedWater();

    //打卡集水滴
    tryDKWater();

    var need_water = true;
    while(need_water)
    {
        //骰子
        checkSaiZhi();

        //检查树叶
        checkLeaf()

        //领水滴
        getPDDWater();

        //领化肥
        getHuaFei();

        //从水桶领水滴
        getWaterFromST()

        need_water = watering();
        if(text("点击收获果实").findOnce())
        {
            console.log("可收获")
            need_water = false
        }
    }

    mlog("拼多多完成");
}

function watering(){
    if(textContains("得").findOnce() && textContains("满").findOnce())
    {
        console.log("need water")
        if(!checkTextTextAndClick2("浇水","次"))
        {
            click(950,2028)
        }

        sleep(3000)
        return tryCloseBox()
    }else{
        console.log("no 得")
        return false
    }
}

function tryGetAddedWater(){
    console.log("enter 获取昨天累计水滴")
    //获取昨天累计水滴
    var added_btn = text("可领取").findOnce();
    if(added_btn){
        var x = added_btn.bounds().centerX();
        var y = added_btn.bounds().centerY();
        if( Math.abs(x - 691) < 100){
            click(x,y);
            sleep(2001);
            checkTextAndClick("继续浇水，累积明日奖励")
            checkTextAndClick("领取奖励去浇水")
        }
    }
}

function tryCloseBoxFirst(){
    sleep(3000)
    var close_box = idContains("fun-widgets-popup-overlay").findOnce()
    if(close_box)
    {
        mlog("find a close box")
        var content1 = text("2斤猕猴桃包邮送到家").findOnce();
        var content2 = text("每日三餐开福袋").findOnce();
        var founded = true;
        if(content1){
            mlog("close 2斤猕猴桃包邮送到家")
        }else if(content2){
            mlog("close 每日三餐开福袋")
            founded = false
            click(532,1396)
            sleep(2000)
            tryCloseBox()
        }else{
            founded = false
            mlog("not found close box")
            tryCloseBox()
        }

        if(founded)
        {
            click(950,600);
            sleep(1000);
        }
    }
}

function tryCloseBox()
{
    var try_closed = true
    var checked_texts = ["去浇水","一键浇水，消耗100g","去浇水集水滴","暂时放弃翻倍水果"]
    var contain_texts = ["仅领取","仅收下","稍后再来收集"]
    var deep_texts = ["去开大额水滴宝箱","马上去种花","去浏览得水滴","去拼单领礼包"]
    while(try_closed)
    {
        try_closed = false
        var close_box = idContains("fun-widgets-popup-overlay").findOnce()
        if(close_box)
        {
            console.log("find a close box")
            if(base.tryCloseFirstImageChird(close_box.parent()))
            {
                try_closed = true
                sleep(2000)
                continue;
            }
            return false
        }
        return true
        for (var i = 0; i < checked_texts.length; i++) {
            if(checkTextAndClick(checked_texts[i]))
            {
                try_closed = true
                break
            }
        }
        for (var i = 0; i < contain_texts.length; i++) {
            if(containTextAndClick(contain_texts[i]))
            {
                try_closed = true
                break
            }
        }
        for (var i = 0; i < deep_texts.length; i++) {
            if(checkTextAndClick(deep_texts[i]))
            {
                sleep(5000)
                back()
                sleep(1000)
                back()
                sleep(2000)
                var duoduogy = text("多多果园").findOnce();
                if (duoduogy) {
                    click(duoduogy.bounds().centerX(), duoduogy.bounds().centerY());
                    sleep(3000)
                }
                return
            }
        }
        if(textContains("上滑浏览").findOnce())
        {
            click(992,378)
            console.log("close 上滑浏览")
            try_closed = true
        }
    }
    return true
}

function getHuaFei(){
    if(checkTextPosAndClick("可打卡",483,2013) || checkTextPosAndClick("可领取",483,2013))
    {
        checkTextAndClick("打卡")
        checkTextAndClick("打卡领取")
        if(checkTextAndClick("领取"))
        {
            tryCloseBox()
        }else{
            click(995,939)
            sleep(2000)
        }
    }
}

function getPDDWater(){
    if(checkTextPosAndClick("可领取",319,2013))
    {
        sleep(2000);
        if(checkTextAndClick("领取"))
        {
            tryCloseBox()
        }
        //三餐福袋
        if(checkTextAndClick("去领取"))
        {
            click(997,784)
            sleep(2000)
        }
    }
}

function adjustSwipeY(y){
    dy_one = y - 2000;
    if(dy_one < 500){
        //太小划不动
        dy_one = 500;
    }

    while(dy_one > 900){
        swipe(300,2000,300,2000-900,1000);
        sleep(100);
        y = y - 900;
        dy_one -= 900;
    }
    if(dy_one < 500){
        //太小划不动
        dy_one = 500;
    }
    swipe(300,2000,300,2000-dy_one,1000);
}

function checkWatchGetWater(){
    //浏览商品
    var lq_btn = text("领取").findOnce();
    if(!lq_btn){
        lq_btn = text("去领取").findOnce();
    }
    if(lq_btn){
        lq_btn.click();
        sleep(1000);
        console.log("有领取 "+lq_btn.bounds().centerX()+" "+lq_btn.bounds().centerY());
        return true;
    }
    var watchs = textContains("去完成").find();
    if(watchs.size()<=0){
        return false;
    }
    
    var i=0;
    var ret = false;
    for(;i<watchs.size();i++){
        var obj = watchs.get(i);
        var dy_one = 0;
        var obj_p = obj.parent();
        if(!obj_p){
            continue;
        }
        var t_obj = obj_p.parent();

        var is_gotobox = false;

        var text_obj = t_obj.findOne(textContains("浏览"));
        if(!text_obj){
            text_obj = t_obj.findOne(textContains("观看"));
        }
        if(!text_obj){
            text_obj = t_obj.findOne(text("寻找宝箱"));
            is_gotobox = true;
        }
        if(!text_obj){
            console.log("没有浏览观看找宝箱")
            continue;
        }
        var y = obj.bounds().centerY();
        var x = obj.bounds().centerX();
        console.log("btn pos:"+x+" "+y);
        if(y > 2000){
            adjustSwipeY(y);
            return true;
        }
        click(x, y);
        obj.click();
        if(is_gotobox){
            gotoFindTreasureBoxs();
            ret = true;
            continue;
        }
        sleep(1000);
        var video_surprise = text("哇，看视频也能有惊喜！").findOnce();
        if(video_surprise){
            click(video_surprise.bounds().centerX(), video_surprise.bounds().centerY());
            sleep(1000);
            click(911,474);
            sleep(63000);
        }else{
            sleep(64000);
        }
        var get_water_success_btn = text("领取奖励").findOnce();
        if(get_water_success_btn){
            click(get_water_success_btn.bounds().centerX(), get_water_success_btn.bounds().centerY());
            sleep(1000);
        }
        back();
        sleep(1000);
        ret = true;
    }
    return ret;
}

module.exports = {
    CallPDD: callPdd,
    tryCloseBox:tryCloseBox
}