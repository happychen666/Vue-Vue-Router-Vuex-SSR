import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
        <input type="text" @input="handleInput" :value="value1">
    </div>
    `,
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  data() {
    return {
      value3: 123
    }
  },
  el: '#root',
  template: `
    <div>
        <comp-one :value1="value3" @change="value3=arguments[0]"></comp-one>
    </div>
    `
})

// const component = {
//   props: ['value'],
//   template: `
//       <div>
//           <input type="text" @input="handleInput" :value="value">
//       </div>
//       `,
//   methods: {
//     handleInput(e) {
//       this.$emit('input', e.target.value)
//     }
//   }
// }

// new Vue({
//   components: {
//     CompOne: component
//   },
//   data() {
//     return {
//       value: 123
//     }
//   },
//   el: '#root',
//   template: `
//       <div>
//       v-model指令里面其实就是增加了value的prop数据绑定和input事件，v-model里面处理了双向数据绑定的逻辑
//           <comp-one v-model="value"></comp-one>
//           <comp-one :value="value" @input="value=arguments[0]"></comp-one>
//       </div>
//       `
// })
