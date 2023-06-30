var mlog = function(msg){
    toast(msg);
    console.log(msg);
}

var checkIDAndClick = function(str1)
{
    var btn1 = idContains(str1).findOnce();
    if(btn1)
    {
        var x = btn1.bounds().centerX();
        var y = btn1.bounds().centerY();
        console.log("click id"+str1+" "+x+","+y)
        click(x,y)
        sleep(1000)
    }else{
        console.log("not found "+str1)
    }
}

var checkTextAndClick = function(str1)
{
    var btn1 = text(str1).findOnce();
    if(btn1)
    {
        var x = btn1.bounds().centerX();
        var y = btn1.bounds().centerY();
        console.log("click text"+str1+" "+x+","+y)
        click(x,y)
        sleep(1000)
    }else{
        console.log("not found "+str1)
    }
}

var checkTextTextAndClick2 = function(str1,str2,p_level)
{
    var btn1 = text(str1).findOnce();
    if(btn1)
    {
        var btn1_parent = btn1.parent()
        if(typeof p_level !== 'undefined')
        {
            while(p_level>1)
            {
                btn1_parent = btn1_parent.parent()
                p_level--
            }
        }

        if(!btn1_parent){
            console.warn("no parent "+str1)
            return;
        }
    
        var btn2 = btn1_parent.findOne(text(str2))
        if(!btn2){
            console.log("not found "+str2 +" after "+str1)
            return;
        }

        var x = btn2.bounds().centerX();
        var y = btn2.bounds().centerY();
        console.log("click "+x+","+y)
        click(x,y)
    }else{
        console.log("not found "+str1)
    }
}

module.exports = {
    MLog:mlog,
    checkTextTextAndClick2:checkTextTextAndClick2,
    checkTextAndClick:checkTextAndClick,
    checkIDAndClick:checkIDAndClick
}