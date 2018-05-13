<template>
  <div id="app">
    <vheader :seller="datas.seller" :support="datas.support"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 把加载过的数据缓存起来 -->
    <keep-alive>
      <router-view :goods="datas.goods" :seller="datas.seller" ref="components"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from './components/mods/header.vue'
  import axios from 'axios'
  import Scroll from 'better-scroll'
  export default {
    data () {
      return {
        datas: {
          // 商户的信息
          seller: {},
          // 活动
          support:{},
          // 商品数据
          goods: [],
          // 评论
          ratings: []
        }
      }
    },
    mounted () {
      axios.get('/static/data.json').then(res => {
        this.datas.seller = res.data.seller;
        this.datas.support = res.data.supports;
        this.datas.goods = res.data.goods;
        // 在页面加载结束后执行对滚动元素的绑定
        this.$nextTick(()=>{
        // 对想滚动的元素的父级进行绑定
          this.$refs.components.scroll();
        })
      });
      document.addEventListener('visibilitychange',this.changeTitle,false)
    },
    methods:{
      changeTitle(){         // 切换title函数
        if(document.hidden){ // 当切换页面时显示该标题
          document.title = "快来看看有一个神奇网站"
        }else{
          document.title = "记得常来本店溜溜"
        }
      }
    },
    components: {
      vheader
    }
  }
  // scoped 当写上 当前这个模板和当前模板下所有的字模板 应用这个样式
</script>

<style>
  .tab .tab-item a.router-link-active{
    color:red
  }
</style>
