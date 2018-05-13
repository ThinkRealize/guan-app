<template>
	<div class="ratingsWrapper" ref="ratingsWrapper">
		<div class="ratings-content">
			<div class="info">
				<div class="mark">
					<div class="num">{{seller.score}}</div>
					<div class="text">综合评分</div>
					<div class="contrast">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="stars">
					<div class="serviceScore">
						<span class="text">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="num">{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<span class="text">商品评分</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="num">{{seller.foodScore}}</span>
					</div>
					<div class="deliveryTime">
			            <span class="text">送达时间</span>
			            <span class="time">38分钟</span>
		            </div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="evaluation">
				<div class="classify">
					<span :class="{active:val.active,bad:classifyArr.length===i+1,badActive:lastColor(val,i)}" class="item" v-for="(val,i) in classifyArr" @click="changeColor(val)">
						{{val.name}}
						<span class="count">{{val.count}}</span>
					</span>
				</div>
				<div class="switch" @click="show=!show">
					<span class="icon-check_circle" :class="{on:show}" ></span>
          			<span class="text">只看有内容的评价</span>
				</div>
				<div class="evel-list">
					<ul>
						<li class="evel" v-for="val in comments">
							<div class="avatar">
								<img :src="val.avatar" width="28" height="28" alt="#">
							</div>
							<div class="content">
								<div class="user">
									<span class="name">{{val.user}}</span>
									<span class="rateTime">{{val.rateTime}}</span>
								</div>
								<div class="star-wrapper">
									<star :size="24" :score="val.score"></star>
									<span class="deliveryTime">{{val.deliveryTime}}分钟送达</span>
								</div>
								<div class="text">{{val.text}}</div>
								<div class="recommend">
									<span class="icon" :class="val.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
									<span class="dish" v-for="item in val.recommend">{{item}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import star from './star'
	import Scroll from 'better-scroll'
	export default{
		props:['seller'], // 从router-view传递的数据 商家的数据
		data(){
			return{
				ratings:[],
				classifyArr: [
		          {
		            name: '全部',
		            count: 0,
		            active: true,
		            comment: []
		          },
		          {
		            name: '推荐',
		            count: 0,
		            active: false,
		            comment: []
		          },
		          {
		            name: '吐槽',
		            count: 0,
		            active: false,
		            comment: []
		        }],
		        show:true,
		        // 用来保存每次点击的类型下对应的评论
		        commentFood:[]
			}
		},
		mounted(){
			axios.get('/static/data.json').then(res=>{
				this.ratings = res.data.ratings;
				this.ratings.forEach(val=>{
					this.classifyArr[0].count++;
					this.classifyArr[0].comment.push(val);
					if(val.rateType){
						this.classifyArr[2].count++;
						this.classifyArr[2].comment.push(val);
					}else{
						this.classifyArr[1].count++;
						this.classifyArr[1].comment.push(val);
					}
				})
				this.commentFood = res.data.ratings;
				// 流程：评论归类好，注册一个$nextTick,计算属性的执行，更新dom，触发$nextTick 滚动插件要在dom更新完才能触发
				this.$nextTick(()=>{
					if(this.times){
						this.times.refresh()
					}else{
						this.times=new Scroll(this.$refs.ratingsWrapper,{
							click:true
						})
					}
				})
			}); 
		},
		computed:{
			comments(){
				this.updatasc();
				let arr = [];
				if(this.show){
					this.commentFood.forEach(val=>{
						if(val.text.length){
							arr.push(val)
						}
					})
					return arr;
				}else{
					return this.commentFood;
				}
			}
		},
		methods:{
			changeColor(item){
				// 每次点击不同的类别，将其中的comment保存在commentFood变量中
				this.classifyArr.forEach(val=>{
					val.active=false;
				})
				item.active=true;
				this.commentFood=item.comment;
			},
			lastColor(item,i){
				if(this.classifyArr.length===i+1&&item.active){
					return true;
				}
			},
			updatasc () {
		        this.$nextTick(() => {
          			this.times.refresh()
	        	})
		    }
		},
		components:{
			star
		}
	}
</script>