import Vue from 'vue'

const app = new Vue({
  //   el: '#root',
  template: "<div ref='div1'>this is content----{{text}}</div>",
  data: {
    text: 0
  }
})

// vue实例上的属性
app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
console.log(app.$options)

// app.$options.render = h => {
//   return h('div', {}, 'new render function')
// }

console.log(app.$root)
console.log(app.$root === app)
console.log(app.$children)

console.log(app.$slots)
console.log(app.$scopedSlots)
console.log('app.$refs===', app.$refs)
console.log(app.$isServer) // 只有在服务端渲染的时候会用到

// vue实例上的方法

// 组件会经常销毁的，比如从一个路由（页面）跳到另外一个路由（页面），那老的页面上的watch就没有用了，此时老的页面中的watch就要销毁掉，不然会导致内存的溢出
const unWatch = app.$watch('text', (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

unWatch() // 注销watch方法

// setTimeout(() => {
//   unWatch()
// }, 2000)

// app还可以监听自定义事件，子组件向父组件传递数据可以用这个方法
app.$on('practice', (a, b) => {
  console.log('practice on', a, b)
})

app.$emit('practice', 'happy chen', '18')
setInterval(() => {
  app.$emit('practice', 'happy chen666', '18')
}, 1000)

// 强制组件重新渲染，但不建议用，影响性能
app.$forceUpdate()

// vue的渲染过程是异步的
app.$nextTick()
setInterval(() => {
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
}, 1000)

// 这里text是4步增加，而不是按一步来加，所以不是一次变化就渲染一次dom
// 操作dom节点的操作，我们希望每次dom节点更新之后再去操作dom,$nextTick()是在vue进行下一次dom更新的时候才执行我们传进的callback，
