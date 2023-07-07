var mlog = function(msg){
    toast(msg);
    console.log(msg);
}


//text(str)
//textContains(str)
//textStartsWith(prefix)
//textEndsWith(suffix)
//textMatches(reg)

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

var checkTextPosAndClick = function(str1,px,py)
{
    var btn1 = text(str1).findOnce();
    if(btn1)
    {
        var x = btn1.bounds().centerX();
        var y = btn1.bounds().centerY();
        if(px == x && py == y)
        {
            console.log("click text"+str1+" "+x+","+y)
            click(x,y)
            sleep(2000)
            return true;
        }else{
            console.log(str1+" not at "+px+","+py+" ("+x+","+y+")")
        }
    }else{
        console.log("not found "+str1)
    }
    return false
}

var containTextAndClick = function(str1)
{
    var btn1 = textContains(str1).findOnce();
    if(btn1)
    {
        var x = btn1.bounds().centerX();
        var y = btn1.bounds().centerY();
        console.log("click text"+str1+" "+x+","+y)
        click(x,y)
        sleep(2000)
        return true
    }else{
        console.log("not found "+str1)
    }
    return false
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
        sleep(2000)
        return true
    }else{
        console.log("not found "+str1)
    }
    return false
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
            return false;
        }
    
        var btn2 = btn1_parent.findOne(text(str2))
        if(!btn2){
            console.log("not found "+str2 +" after "+str1)
            return false;
        }

        var x = btn2.bounds().centerX();
        var y = btn2.bounds().centerY();
        console.log("click "+x+","+y)
        click(x,y)
        return true
    }else{
        console.log("not found "+str1)
    }
    return false
}

module.exports = {
    MLog:mlog,
    checkTextTextAndClick2:checkTextTextAndClick2,
    checkTextAndClick:checkTextAndClick,
    checkIDAndClick:checkIDAndClick,
    containTextAndClick:containTextAndClick,
    checkTextPosAndClick:checkTextPosAndClick
}