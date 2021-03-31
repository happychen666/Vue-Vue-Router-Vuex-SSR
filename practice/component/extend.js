import Vue from 'vue'
const componentA = {
  // 在组件中不能修改props传进来的值
  props: {
    active: Boolean,
    textOne: {
      required: true
    }
  },
  template: `<div>
  <input type="text" v-model.number="text">
  <p >{{textOne}}</p>
  <p  @click="handleONChange">我显示出来了</p>
  </div>`,
  data() {
    return {
      text: 0
    }
  },
  mounted() {
    console.log('componentA mounted')
  },
  methods: {
    handleONChange() {
      //   this.onChange()
      this.$emit('change')
    }
  }
}

const componentB = {
  extends: componentA,
  props: {
    textOne: 0
  },
  data() {
    return {
      text: 1
    }
  },
  mounted() {
    console.log('componentB mounted')
    console.log('componentB 的 parent', this.$parent.$options.name) // 这个组件的parent是Vue的实例
  }
}

// Vue扩展，是vue的一个子类
// const CompVue = Vue.extend(componentA)

// new CompVue({
//   el: '#root',
//   propsData: {
//     textOne: 0
//   },
//   data: {
//     text: 6
//   },
//   mounted() {
//     console.log('CompVue mounted')
//   }
// })

new Vue({
  name: 'Vue root',
  el: '#root',
  components: {
    comp: componentB
  },
  template: `<comp></comp>`
})
