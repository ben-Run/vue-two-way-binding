// 数据劫持： 通过 get set 劫持数据 发布者
function Observer(data){
    this.data=data
    this.init(data)
}
Observer.prototype={
    init:function(data){
        let self=this
            Object.keys(data).forEach(function(key) {
              self.defineReactive(data, key, data[key]);
            });
    },
    defineReactive:function(data,key,value){
        var dep = new Dependency()
         // 递归遍历子对象
         var childObj = observer(value);
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                if(Dependency.target){
                    dep.addSub(Dependency.target)
                }
                return value
            },
            set:function(newVal){
                if(newVal===value) return
                value=newVal
                dep.notify() // 通知订阅者
            }
        })
    }
}
function observer(value){
    if(!value || typeof value !== 'object'){
        return
    }
    return new Observer(value)
}