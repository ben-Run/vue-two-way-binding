// 订阅器  增加 删除 通知等功能   类似花名册
function Dependency (){
    this.subs=[]
}
Dependency.prototype={
    addSub:function(sub){
        this.subs.push(sub)
    },
    removeSub:function(sub){
        var index=this.subs.indexOf(sub)
        if(index !=-1){
            this.subs.splice(index,1)
        }
    },
    notify:function(){
        this.subs.forEach(subObj => {
            subObj.update();
        });
    }
}
Dependency.target=null