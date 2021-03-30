import Vue from 'vue'

// 在外面定义全局的data然后return出去有副作用
// const data = {
//   text: 1
// }

const componentA = {
  // 在组件中不能修改props传进来的值
  props: {
    active: Boolean,
    textOne: Number
  },
  template: `<div>
  <input type="text" v-model.number="text">
  <p >{{textOne}}</p>
  <p  @click="handleONChange">我显示出来了</p>
  </div>`,
  data() {
    return {
      text: 1
    }
  },
  methods: {
    handleONChange() {
      //   this.onChange()
      this.$emit('change')
    }
  },
  mounted() {
    // this.textOne = '修改传进来的props的值会报错'
  }
}

// 这种定义是在全局定义的组件
// Vue.component('Comp', component)

new Vue({
  // 组件只在需要的地方使用
  components: {
    CompOne: componentA
  },
  data: {
    text1: 0
  },
  el: '#root',
  template: `
  <div>
  <comp-one ref="comp1" :active="true" :text-one="text1" @change="handleChange"></comp-one>
  <comp-one :active="false" :text-one="1" @change="handleChange"></comp-one></div>`,
  mounted() {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange() {
      this.text1 += 1
    }
  }
})
