import Todo from '../views/todo/todo.vue'
import Login from '../views/login/index.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    component: Todo,
    // 当有两个route-view时
    // components: {
    //   default: Todo,
    //   viewB: Login
    // },
    props: true,
    name: 'testApp',
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
  },
  {
    path: '/login',
    component: Login
    // components: {
    //   default: Login,
    //   viewB: Todo
    // }
  }
]
