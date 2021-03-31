import Vue from 'vue'

const childComponent = {
  inject: ['yeye', 'data'],
  template: `<div>child component{{data.value}}</div>`,
  mounted() {
    console.log(this.$parent.$options.name)
    console.log(this.yeye, this.data.value)
  }
}

const component = {
  name: 'componentA',
  components: {
    childComponent
  },
  template: `
    <div :style="styles">
        <slot name="header" value="slot scoped value" aaa="kkk"></slot>
        <p :style="styleBody"><slot name="body"></slot></p>
        <child-component></child-component>
    </div>
    `,
  data() {
    return {
      styles: {
        width: '200px',
        height: '200px',
        border: '1px solid red'
      },
      styleBody: {
        color: 'red'
      }
    }
  }
}

// 插槽和具名插槽
// new Vue({
//   components: {
//     comp: component
//   },
//   el: '#root',
//   template: `
//     <comp>
//         <span slot="header">happy chen</span>
//         <span slot="body">999</span>
//     </comp>
// `
// })

// slot中的作用域以及ref在组件和原生标签上的引用区别
new Vue({
  el: '#root',
  provide() {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  components: {
    comp: component
  },
  data() {
    return {
      value: 'hhhh'
    }
  },
  template: `
  <div>
  <comp ref="comp">
  <span ref="span" slot="header" slot-scope="props">{{props.value}} {{props.aaa}}</span>
</comp>
<p>{{value}}</p>
<input type="text" v-model="value">
  </div>
   
        `,
  mounted() {
    // console.log(this.$refs.comp, this.$refs.span)
  }
})
