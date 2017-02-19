/**
 * Created by chi on 2017/2/19.
 */
var CQDialog = function(){
    this.v = '1.0.0'; //版本号
    this.dialog=null ;
    this.settings={
        title:'搜索用户',
        submit:'搜索'
    };
};

CQDialog.fn = CQDialog.prototype;

var doc = document, config = CQDialog.fn.cache = {};

//初始模态框;只定义头部
CQDialog.fn.init=function(){
    this.dialog=doc.createElement('div');
    this.dialog.className='dialog';
    this.dialog.zIndex=1000;
    document.body.appendChild(this.dialog)
    var oHeader=doc.createElement('div');
    oHeader.className='dialog_header'
    oHeader.innerHTML='<span class="dialog_header_title">'+this.settings.title+'</span><span class="dialog_close">X</span>'
    this.dialog.appendChild(oHeader);
    var _this=this;
    doc.getElementsByClassName('dialog_close')[0].onclick=function(){
        _this.close()
    }
};



//prompt 模态框
CQDialog.fn.prompt=function(setting,callback){
    //重置配置参数
    this.extend(this.settings,setting);
    //初始化
    this.init();
    var oBody=doc.createElement('div');
    oBody.className='dialog_body';
    oBody.innerHTML='<input type="text" class="dialog_input" placeholder="查询用户">'+
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


CQDialog.fn.close=function(){
    //关闭动画
    this.dialog.className=this.dialog.className+' dialogHidden';
    var _this=this;
    setTimeout(function(){
        document.body.removeChild(_this.dialog);
    },1000);
    //document.body.removeChild(this.dialog);
};
CQDialog.fn.extend=function(obj1,obj2){
    for(var attr in obj2){
        obj1[attr]=obj2[attr];
    }
};
