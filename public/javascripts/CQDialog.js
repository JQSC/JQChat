/**
 * Created by chi on 2017/2/19.
 */
var CQDialog = function(){
    this.v = '1.0.0'; //版本号
    this.dialog=null ;
    this.settings={
        title:'提示',
        undo:'取消',
        submit:'确定',
        input:'请输入内容',
        text:'请输入一段内容吧!',
        maskOpacity:0,               //调节遮罩层透明度
        Switch:[{text:'设置',type:true},{text:'全屏',type:false}]  //配置开关
    };

    //保证只存在一个弹窗界面
    //方案一 状态锁
    this.open=false;
    //方案二  加入遮罩层，使无法点击其他元素
    this.mask=null

};

CQDialog.fn = CQDialog.prototype;

var doc = document, config = CQDialog.fn.cache = {};

//初始模态框;只定义头部
CQDialog.fn.init=function(){
    //添加遮罩层
    this.maskCreat(this.settings.maskOpacity);
    //弹窗模型
    this.dialog=doc.createElement('div');
    this.dialog.className='dialog';
    this.dialog.zIndex=1000;
    document.body.appendChild(this.dialog)
    var oHeader=doc.createElement('div');
    oHeader.className='dialog_header'
    oHeader.innerHTML='<span class="dialog_header_title">'+this.settings.title+'</span><span class="dialog_close">X</span>'
    this.dialog.appendChild(oHeader);
    var _this=this,
        oClose=doc.getElementsByClassName('dialog_close');
    for(var i =0;i<oClose.length;i++){
        oClose[i].onclick=function(){
            _this.close()
        }
    }
    this.mask.onclick=function(){
        _this.close()
    }
};


//prompt 模态框
CQDialog.fn.prompt=function(setting,callback){

        //this.open=true;  //弹窗状态锁

        //重置配置参数
        this.extend(this.settings,setting);
        //初始化
        this.init();
        var oBody=doc.createElement('div');
        oBody.className='dialog_body';
        oBody.innerHTML='<input type="text" class="dialog_input" placeholder="'+this.settings.input+'">'+
            '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>';
        this.dialog.appendChild(oBody);
        var oInput=doc.getElementsByClassName('dialog_input')[0];
        oInput.focus();
        var _this=this
        oInput.onkeyup  = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
                case 13:
                    if(typeof callback === 'function' ) {callback(oInput.value,_this.dialog)}
            }
        };
        doc.getElementsByClassName('dialog_footer_submit')[0].onclick=function(){
            if(typeof callback === 'function' ) {callback(oInput.value,_this.dialog)}
        };
};

//alert 模态框
CQDialog.fn.alert=function(setting,callback){
    //重置配置参数
    this.extend(this.settings,setting);
    //初始化 显示遮罩层
    this.init();
    var _this=this;

    var oCenter=doc.createElement('div');
    oCenter.className='dialog_body';
    oCenter.innerHTML=this.settings.text;
    this.dialog.appendChild(oCenter);

    var oFooter=doc.createElement('div');
    oFooter.className='dialog_footer';
    oFooter.innerHTML='<button class="dialog_footer_undo"><span>'+this.settings.undo+'</span></button>'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>'
    this.dialog.appendChild(oFooter);
    //确认事件
    doc.getElementsByClassName('dialog_footer_submit')[0].onclick=function(){
        if(typeof callback === 'function' ) {callback(oCenter)}
    };
    //取消事件
    doc.getElementsByClassName('dialog_footer_undo')[0].onclick=function(){
        _this.close()
    };

};

// 配置模态框
CQDialog.fn.setting=function(setting,callback){
    //重置配置参数
    this.extend(this.settings,setting);
    //初始化
    this.init();
    var _this=this,
        Switch=this.settings.Switch;
    //根据数组长度，生成配置条数
    for(var i=0;i<Switch.length;i++){
        var checkType=(Switch[i].type==true)?'checked':'';
        var oCenter=doc.createElement('div');
        oCenter.className='dialog_body';
        oCenter.innerHTML=Switch[i].text+'<label class="iSwitch">'+
            '<input type="checkbox" '+checkType+'><i></i></label>';
        this.dialog.appendChild(oCenter);
    }
    //上传背景图
    var oBody=doc.createElement('div');
    oBody.className='dialog_body';
    oBody.innerHTML='<input type="text" class="dialog_input" placeholder="'+this.settings.input+'">'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>';
    this.dialog.appendChild(oBody);

    //底部
    /*var oFooter=doc.createElement('div');
    oFooter.className='dialog_footer';
    oFooter.innerHTML='<button class="dialog_footer_undo"><span>'+this.settings.undo+'</span></button>'+
        '<button class="dialog_footer_submit"><span>'+this.settings.submit+'</span></button>'
    this.dialog.appendChild(oFooter);*/

    //确认事件
    doc.getElementsByClassName('dialog_footer_submit')[0].onclick=function(){
        if(typeof callback === 'function' ) {callback(oCenter)}
    };
};

CQDialog.fn.close=function(){
    //解锁
    this.open=false;
    //关闭动画
    this.dialog.className=this.dialog.className+' dialogHidden';
    var _this=this;
    setTimeout(function(){
        document.body.removeChild(_this.dialog);
        document.body.removeChild(_this.mask);
    },500);

};
CQDialog.fn.extend=function(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr];
    }
};

//生成遮罩
CQDialog.fn.maskCreat=function(maskOpacity){
    this.mask=doc.createElement('div');
    this.mask.id='mask_Dialog';
    this.mask.style.opacity=maskOpacity;
    document.body.appendChild(this.mask);
};

//私有方法
var MYDIALOG={};
MYDIALOG.fun=(function(){
    //传入触发对象，及其操作对象
    var _close=function(obj,closeElement){

    };
    var _callback=function(callback,value){

    };
    return {
        callback:_callback,
        close:_close
    }
}());