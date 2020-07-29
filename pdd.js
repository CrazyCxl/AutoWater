var mlog = require('./base.js').MLog

function callPdd(){
    // launchApp("拼多多");
    // sleep(10000);

    // var duoduogy = text("多多果园").findOnce();
    // if (duoduogy) {
    //     click(duoduogy.bounds().centerX(), duoduogy.bounds().centerY());
    // }else{
    //     mlog("not found 多多果园")
    //     return;
    // }

    // sleep(1000);

    tryCloseTreasureBox();
    tryGetAddedWater();
    //getPDDWater();
    watering();

    mlog("拼多多完成");
}

function checkStars(){
    var enter_btn = text("equipment_v6").findOnce();
    if(!enter_btn){
        return;
    }
    click(enter_btn.bounds().centerX(), enter_btn.bounds().centerY());
    sleep(2000);

    var get_btn = text("可领取").findOnce();
    if(get_btn){
        click(get_btn.bounds().centerX(), get_btn.bounds().centerY());
        sleep(1000);
    }

    back();
}

function watering(){
    var wtshuihu = idContains("waterbottle").findOne();
    while(wtshuihu){
        var wtsh_childs = wtshuihu.children();
        var shui_num_obj = wtsh_childs.get(wtsh_childs.size()-1);
        var shui_num = parseInt(shui_num_obj.text());
        console.log(shui_num)
        if(shui_num > 10){
            click(wtshuihu.bounds().centerX(), wtshuihu.bounds().centerY());
            mlog("click 水壶");
            sleep(5000);
            checkStars();
            sleep(1000);
            //开宝箱
            click(135,1645);
            sleep(1000);
            click(895,358);

            sleep(12000);
        }else{
            break;
        }
    }
}

function tryGetAddedWater(){
    //获取昨天累计水滴
    var added_btn = text("可领取").findOnce();
    if(added_btn){
        var x = added_btn.bounds().centerX();
        var y = added_btn.bounds().centerY();
        if( Math.abs(x - 691) < 50 && Math.abs(y - 1420) < 50 ){
            click(x,y);
            sleep(1000);
            var continue_btn = text("继续浇水，累积明日奖励").findOnce();
            if(continue_btn){
                click(continue_btn.bounds().centerX(), continue_btn.bounds().centerY());
                sleep(1000);
            }
        }
    }
}

function tryCloseTreasureBox(){
    //关闭浇水赢保险
    var close_btn = text("commonPopupCloseButtonV2").findOnce();
    if(close_btn){
        click(close_btn.bounds().centerX(), close_btn.bounds().centerY());
    }
    sleep(1000);
}

function getPDDWater(){
    var get_water_btn = text("领水滴").findOnce();
    if(get_water_btn){
        click(236,1842);
    }else{
        mlog("没找到领水滴")
        return;
    }
    sleep(1000);
    while(checkWatchGetWater()){
        mlog("再次检查浏览得水滴");
    }
    sleep(1000);

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

        var text_obj = t_obj.findOne(textContains("浏览"));
        if(!text_obj){
            text_obj = t_obj.findOne(textContains("观看"));
        }
        if(!text_obj){
            console.log("没有浏览观看")
            continue;
        }
        var y = obj.bounds().centerY();
        var x = obj.bounds().centerX();
        console.log("btn pos:"+x+" "+y);
        if(y > 2000){
            dy_one = y - 2000;
            while(dy_one > 900){
                swipe(x-300,2000,x-300,2000-900,1000);
                sleep(100);
                y = y - 900;
                dy_one -= 900;
            }
            swipe(x-300,2000,x-300,2000-dy_one,1000);
            return true;
        }
        click(x, y);
        sleep(65000);
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
    CallPDD: callPdd
}