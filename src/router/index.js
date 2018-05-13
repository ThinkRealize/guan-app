import Vue from 'vue'
import Router from 'vue-router'
import good from '@/components/mods/good'
import rating from '@/components/mods/rating'
import seller from '@/components/mods/seller'

Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/goods',component:good},
  	{path:'/ratings',component:rating},
  	{path:'/seller',component:seller}
  ]
})
