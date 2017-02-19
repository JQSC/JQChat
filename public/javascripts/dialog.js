/**
 * Created by chi on 2017/2/19.
 */
/**
 * Created by chi on 2016/12/22.
 */

/*
 opt:content  title  undo  submit
 method : close
 event :
 desc:弹窗组件
 */
function Dialog(){
    this.dialog=null;
    this.dialog_header=null;
    this.dialog_body=null;
    this.dialog_footer=null;
    this.mask=null;

    //默认参数
    this.settings={
        title:'提示',
        content:'这是一段信息',
        undo:'取消',
        submit:'确定',
        mask:false

    };
    //弹窗元素配置
    this.DialogStyle=[{
        dialogClass:'dialog',
        zIndex:'1000'
    }, {
        dialogClass:'dialog_header',
        html:'<span class="dialog_header_title">'+this.settings.title+'</span><span class="close">X</span>',
    },{
        dialogClass:'dialog_header',
        html:'<input v-on:click.stop type="text" placeholder="查询用户">'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>'
    }, {
        dialogClass:'dialog_footer',
        html:'<button class="dialog_footer_undo"><span>'+this.settings.undo+'</span></button>'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>'
    },{

    }];
};

Dialog.prototype.json={};

Dialog.prototype.init= function(opt){
    extend(this.settings,opt);
    if(!this.json.sign){
        this.create();
        this.json.sign=true  ; //开关，只允许同时存在一个弹窗
        this.close(true);
    }
};
Dialog.prototype.create=function(){

    this.sign=true;

    this.dialogView=[];   //弹窗元素列表

    //根据弹窗元素配置渲染视图
    MYDIALOG.fun.elementAppend(this.DialogStyle,this.dialogView);

    //判断是否需要遮罩，this.settings.mask=true则生成遮罩层
    this.mask=MYDIALOG.fun.mask(this.settings,this.mask);

};

//close开关
Dialog.prototype.close=function(type){
    var This=this;
    var oClose=document.getElementsByClassName('close');
    oClose[0].onclick=function(){
        MYDIALOG.fun.dialogClose(This);
    };
    var oUndo=this.dialogView[3].getElementsByTagName('span');
    oUndo[0].onclick=function(){
        MYDIALOG.fun.dialogClose(This);
    };
    if(!type){
        MYDIALOG.fun.dialogClose(This);
    }
};



function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr]
    }
}



function bindEvent(obj,events,fn){

    obj.listeners=obj.listeners||{};
    obj.listeners[events]=obj.listeners[events]||[];
    obj.listeners[events].push(fn);

    if (obj.addEventListener) {                     //所有主流浏览器，除了 IE 8 及更早 IE版本
        obj.addEventListener(events, fn,false);
    } else if (obj.attachEvent) {                  // IE 8 及更早 IE 版本
        obj.attachEvent('on'+events, fn);
    }
}
function clickEvent(obj,events,element,type){
    if(obj.listeners[events]){
        for(var i=0;i<obj.listeners[events].length;i++){
            obj.listeners[events][i](element,type);
        }
    }

}

//私有方法
var MYDIALOG={};
MYDIALOG.fun=(function(){

    //视图属性赋值
    var _createElement=function(dialogClass,html,zIndex){
        var oDiv=document.createElement('div');
        oDiv.className=dialogClass;
        oDiv.innerHTML=html||'';
        if(zIndex!="") oDiv.style.zIndex=zIndex;
        return oDiv
    };

    //生成窗口视图
    var _elementAppend=function(obj,obj2){
        //根据配置渲染视图
        for(var item in obj){
            var dialogClass=obj[item].dialogClass;
            var html=obj[item].html;
            var index=obj[item].zIndex;
            var oElement=MYDIALOG.fun.createElement(dialogClass,html,index);
            obj2.push(oElement)
        }
        //增加到html中
        document.body.appendChild(obj2[0]);
        for(var i=1;i<obj2.length;i++){
            obj2[0].appendChild(obj2[i]);
        }
    };

    //判断是否遮罩，无则生成覆盖层
    var _mask=function(obj,mask){
        if(obj.mask){
            mask=document.createElement('div');
            mask.id='mask';
            document.body.appendChild(mask);
        }
        return mask
    };

    //close触发器
    var _close=function(obj){
        document.body.removeChild(obj.dialogView[0]);
        obj.json.sign=false;
        obj.mask.style.display='none'
    };
    return {
        createElement:_createElement,
        elementAppend:_elementAppend,
        mask:_mask,
        dialogClose:_close
    }

}());