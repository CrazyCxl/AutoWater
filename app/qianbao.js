let checkTextAndClick = require('../base.js').checkTextAndClick
let mlog = require('../base.js').MLog

function callQianBao(){
    launchApp("钱包");
    sleep(2000);
    if(!containTextAndClick("领视频会员"))
    {
        mlog("钱包领视频会员入口没找到");
        return false;
    }

    sleep(2000);
    if(!containTextAndClick("看10秒"))
    {
        return false;
    }

    sleep(10000);
    launchApp("钱包");

    //开1
    click(640,1270);
    sleep(3000);

    if(!containTextAndClick("继续领会员"))
    {
        return false;
    }

    sleep(10000);
    launchApp("钱包");

    click(640,1270);
    sleep(3000);
}

module.exports = {
    CallQianBao: callQianBao
}