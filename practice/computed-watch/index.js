import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
        <p>{{firstName + '' +lastName}}</p>
        <p>computed name==={{name}}</p>
        <p>getName==={{getName()}}</p>
        <p>{{number}}</p>
        <div><input type="text" v-model=number></div>
        只有computed依赖的值发生变化，computed里面的方法才会重新执行得到新的值，然后又把新的值缓存起来，拿到的数据如果并不是我们想要显示的数据，那显示的数据就可以通过计算得到
        <div>first name:<input type="text" v-model='firstName'></div>
        <div>last name:<input type="text" v-model='lastName'></div>
        <p>fullName:{{fullName}}</p>
        <p>obj.a:<input type="text" v-model='obj.a'></p>
    </div>
    `,
  data: {
    fullName: '',
    firstName: 'happy',
    lastName: 'chen',
    number: 0,
    obj: {
      a: '6'
    }
  },
  computed: {
    name() {
      console.log('computed run')
      return `${this.firstName} ${this.lastName}`
    }
  },

  watch: {
    // 下面的写法watch对象中的firstName方法最初绑定时是不会执行的，只有firstName下次变化的时候才会执行
    // firstName(newValue, oldValue) {
    //   this.fullName = newValue + ' ' + this.last
    // }

    // 修改：声明immediate: true属性会立马执行firstName中的handler
    // watch（和computed相比）并不适合页面中显示某个数据去做数据的拼装，
    // watch适合监听某个数据的变化然后向后台发个请求，抽象来讲，watch适合监听某个数据变化后去做某个操作
    firstName: {
      handler(newValue, oldValue) {
        this.fullName = newValue + ' ' + this.last
      },
      immediate: true
    },

    // watch还有个使用场景
    // obj: {
    //   // obj是个对象，默认情况下handler只监听obj对象引用的变化，如果只改变obj.a属性的值，那watch是监测不到的，此时加个deep:true（深入观察）就可以监测到，
    //   handler(newValue, oldValue) {
    //     console.log('obj watch handle invoked')
    //   },
    //   immediate: true,
    //   deep: true
    // },

    // 上面对obj对象的watch监测会一层一层对obj立面的每个属性都会监测，会影响性能开销，此时可以通过字符串的方式只监测我们想监测的某个属性
    'obj.a': {
      handler(newValue, oldValue) {
        console.log('obj.a watch handle invoked')
      },
      immediate: true
    }
  },
  methods: {
    getName() {
      console.log('getName run')
      return `${this.firstName} ${this.lastName}`
    }
  }
})

// 在input中去改变number值就能看到computed缓存的好处，改变number值组件会重新渲染，getName()会重新调用执行里面的逻辑

// 千万不要在watch和computed里面去修改依赖的值，否则会导致无限循环
