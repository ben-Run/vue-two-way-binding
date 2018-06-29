# vue-two-way-binding
vue two way binding 

1、核心通过Object.defineProperty 中的get set 数据劫持，这让我们可以对数据进行我们自己的逻辑处理

2、在发布订阅这种 1对n的对象关系中，observer 中的get set可以理解为事件的发起点（发布这个事件/事情），dependency 就是我们的订阅管理器，watcher 是订阅者

3、通过在编译时分析模板、指令知道那些元素 属性 订阅了我们的数据对象中的属性，此时可以new watcher（），在实例化watcher时把当前的this 缓存在全局的变量target中，
    this.value = this.get();  // 为了触发属性getter，从而在dep添加自己作为订阅者
    dep.addSub(Dependency.target) // 把自己加入到订阅器中
    
4、这种模式也很好的解耦对象，发布者无需知道把消息/通知发给具体的对象，订阅者如果需要订阅，自己加入订阅器即可，发布者也只要对订阅器发送通知即可。
