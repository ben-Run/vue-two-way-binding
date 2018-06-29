
// vue 入口
  function MyfVue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;
    /*
     数据代理，实现 vm.xxx 
     上面的代码看出 监听数据的对象是 options.data, 因此每次更新视图的时候；如：
     var vm = new myVue({
       data: {name: 'joel'}
     });
     那么更新数据就变成 vm._data.name = 'kongzhi2'; 但是我们想实现这样更改 vm.name = "kongzhi2";
     因此这边需要使用属性代理方式，利用Object.defineProperty()方法来劫持vm实列对象属性的读写权，使读写vm实列的属性转成vm.name的属性值。
     */
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key); //代理
    });

    observer(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

MyfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter () {
                return self.data[key];
            },
            set: function setter (newVal) {
                self.data[key] = newVal;
            }
        });
    }
}
