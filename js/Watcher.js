// 订阅者
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get();  // 为了触发属性getter，从而在dep添加自己作为订阅者
}

Watcher.prototype = {
  update: function() {
      this.run(); // observer 中的属性值发生变化 收到通知
  },
  run: function() {
      var value = this.vm.data[this.exp];
      var oldVal = this.value;
      if (value !== oldVal) {
          this.value = value; // 把当前的值赋值给 this.value 更新this.value的值
          this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调 更新视图
      }
  },
  get: function() {     
      Dependency.target = this;  // 将当前订阅者指向自己
      var value = this.vm.data[this.exp]  // 触发getter，添加自己到属性订阅器中
      Dependency.target = null;  // 添加完成后
      return value;
  }
}