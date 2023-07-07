let mlog = require('./base.js').MLog
let checkTextTextAndClick2 = require('./base.js').checkTextTextAndClick2
let checkTextAndClick = require('./base.js').checkTextAndClick
let checkIDAndClick = require('./base.js').checkIDAndClick

//进入果园
function enterGuoYuan(){
    launchApp("拼多多");

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
    var saizhi_btr = text("摇赢水滴").findOnce();
    if(saizhi_btr)
    {
        var check1 = saizhi_btr.parent().parent();
        if(!check1){
            console.log("not found 摇赢水滴 parent");
            return;
        }
    
        if(!check1.findOne(text("领取奖励"))){
            console.log("not found 领取奖励 in 摇赢水滴")
            return;
        }

        mlog("click 摇赢水滴")
        saizhi_btr.click()
        sleep(2000)

        var zbbc=  text("领取战败补偿").findOnce();
        if(zbbc)
        {
            zbbc.click()
            sleep(1000)
            click(530,1530)
            sleep(3000)
            back()
            sleep(1000)
        }
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
        var x = btn1.bounds().centerX()+100;
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
    checkTextTextAndClick2("浇水竞赛","可领取")
    checkTextAndClick("继续参与下一期")
    sleep(5000)
    click(945,428)
    sleep(2000)
}

function callPdd(){
    //enterGuoYuan()
    tryCloseBox();

    //浇水竞赛
    checkJSJS();

    //获取昨日浇水
    tryGetAddedWater();

    //骰子
    checkSaiZhi();

    //打卡集水滴
    tryDKWater();

    //从水桶领水滴
    getWaterFromST()

    //检查树叶
    checkLeaf()

    //watering();
    getPDDWater();
    //gotoFindTreasureBoxs();
    mlog("拼多多完成");
}

function checkStars(){
    var enter_btn = text("equipment_v6").findOnce();
    if(!enter_btn){
        console.log("not found equipment_v6");
        return;
    }
    var enter_btn_p = enter_btn.parent().parent();
    if(!enter_btn_p){
        console.log("not found equipment_v6 parent");
        return;
    }

    if(!enter_btn_p.findOne(text("可领取"))){
        console.log("not found 可领取 in stars")
        return;
    }
    click(enter_btn.bounds().centerX(), enter_btn.bounds().centerY());
    sleep(2000);

    var get_btn = text("可领取").findOnce();
    if(get_btn){
        click(get_btn.bounds().centerX()-25, get_btn.bounds().centerY());
        sleep(1000);
    }

    back();
}

function checkRedPackge(){
    var red_pack_enter_btn = text("可打开").findOnce();
    if(!red_pack_enter_btn){
        return;
    }
    var rp_parent = red_pack_enter_btn.parent();
    if(!rp_parent){
        console.log("红包可打开没有parent");
        return;
    }

    click(red_pack_enter_btn.bounds().centerX(), red_pack_enter_btn.bounds().centerY());
    sleep(1000);

    //关闭弹窗
    var close_btn = text("继续开红包").findOnce();
    if(close_btn){
        click(close_btn.bounds().centerX(), close_btn.bounds().centerY());
    }else{
        var close_btn = text("commonPopupCloseButtonV2").findOnce();
        if(!close_btn){
            close_btn = text("去浇水").findOnce();
        }
        if(close_btn){
            click(close_btn.bounds().centerX(), close_btn.bounds().centerY());
        }else{
            click(543,1554);
        }
    }
    sleep(100);
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
            sleep(3000);
            checkStars();
            sleep(1000);
            //开宝箱
            //click(135,1645);
            //sleep(1000);
            //click(895,358);
            //sleep(100);
            //开红包
            //checkRedPackge();
            //sleep(15000);
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
        if( Math.abs(x - 691) < 100){
            click(x,y);
            sleep(2001);
            var continue_btn = text("继续浇水，累积明日奖励").findOnce();
            if(continue_btn){
                click(continue_btn.bounds().centerX(), continue_btn.bounds().centerY());
                sleep(1000);
            }
        }
    }
}

function tryCloseBox(){
    var close_box = idContains("fun-widgets-popup-overlay").findOnce()
    if(close_box)
    {
        mlog("find a close box")
        var content1 = text("2斤猕猴桃包邮送到家").findOnce();
        var content2 = text("恭喜获得").findOnce();
        var founded = true;
        if(content1){
            mlog("close 2斤猕猴桃包邮送到家")
        }else if(content2){
            mlog("close 恭喜获得养分")
        }else{
            founded = false
            mlog("not found")
        }

        if(founded)
        {
            click(950,600);
            sleep(1000);
        }
    }
}

function getPDDWater(){
}

function gotoFindTreasureBoxs(){
    //去找宝箱
    sleep(1000);
    var box_dialog_text = text("恭喜你发现1个高级宝箱").findOnce();
    if(box_dialog_text){
        var box_dialog = box_dialog_text.parent();
        click(box_dialog.bounds().centerX(), box_dialog.bounds().centerY());
        sleep(500);
        click(953,584);
        sleep(100);
    }
    var count = 0;
    while(count < 3){
        var box_continue_dialog = text("继续找免费宝箱").findOnce();
        if(!box_continue_dialog){
            box_continue_dialog = text("去拼单").findOnce();
        }
        if(box_continue_dialog){
            click(box_continue_dialog.bounds().centerX(), box_continue_dialog.bounds().centerY());
            sleep(100);
        }
        var box_btn = textContains("free_treasure_box").findOnce();
        if(box_btn){
            var x = box_btn.bounds().centerX();
            var y = box_btn.bounds().centerY();
            console.log("box btn showed "+x+" "+y)
            if(y > 1500){
                adjustSwipeY(y);
                continue;
            }
            click(x, y);
            sleep(2000);
            count += 1;
        }else{
            swipe(300,2000,300,2000-300,1000);
            sleep(100);
        }
    }
    back();
    var exit_btn = text("直接离开").findOnce();
    if(exit_btn){
        mlog("点击直接离开");
        click(exit_btn.bounds().centerX(), exit_btn.bounds().centerY());
    }else{
        console.log("call back");
        sleep(2000);
        back();
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