import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Slider from '@/components/Slider'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/slider',
      name: 'Slider',
      component: Slider
    }
  ]
})
