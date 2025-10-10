const { checkIDAndClick } = require('../base.js');

let checkTextAndClick = require('../base.js').checkTextAndClick
let mlog = require('../base.js').MLog

function findNormalTaskLabelNode()
{
    let target = text("激励任务").findOne();
    if (target) {
        let parent = target.parent();
        let children = parent.children();
        let index = -1;
        for (let i = 0; i < children.size(); i++) {
            if (children.get(i).equals(target)) {
                index = i;
                break;
            }
        }
        if (index >= 0 && index + 2 < children.size()) {
            let nextNode = children.get(index + 2);
            log(nextNode.text());
            return nextNode;
        }
    }
    return null;
}

function callQiDian(){
    launchApp("起点读书");
    sleep(5000);
    if(!containTextAndClick("领福利"))
    {
        return false;
    }

    label1 = findNormalTaskLabelNode()
    if(label1 == null)
        return false;
    var count = 0;
    while (label1.text() != "已领取" && count < 10) {
        var x = label1.bounds().centerX();
        var y = label1.bounds().centerY();
        console.log("第 " + (count + 1) + " 次点击继续领取");
        click(x, y);
        sleep(2000);
        count++;
    }
}

module.exports = {
    CallQiDian: callQiDian
}