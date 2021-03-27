import Vue from 'vue'

const app = new Vue({
  //   el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate')
  },
  created() {
    console.log(this.$el, 'created')
  },
  beforeMount() {
    console.log(this.$el, 'beforeMount')
  },
  mounted() {
    console.log(this.$el, 'mounted')
  },

  // 上面打印this.$el beforeCreate和created打印undefined，所以在生命周期中这两个方法中去操作dom节点是不行的
  // beforeMount和mounted才有节点打印出来
  // 所以操作dom节点一般在mounted里面，操作数据可以在created也可以在mounted
  // 有数据更新时才会执行
  beforeUpdate() {
    console.log(this.$el, 'beforeUpdate')
  },
  updated() {
    console.log(this, 'updated')
  },

  // 和keepalive有关系
  activated() {
    console.log(this, 'activated')
  },
  deactivated() {
    console.log(this, 'activated')
  },
  beforeDestroy() {
    console.log(this, 'beforeDestroy')
  },
  destroyed() {
    console.log(this, 'destroyed')
  }
})

app.$mount('#root')

// beforeupdated updated会执行
// setInterval(() => {
//   app.$data.text += 1
// }, 1000)

// beforeDestroy destroyed会执行
setTimeout(() => {
  app.$destroy()
}, 3000)
