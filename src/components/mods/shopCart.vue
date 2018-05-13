<template>
	<div class="shopCart">
		<div class="content">
			<div class="content-left" @click="showValue">
				<div class="logo-wrapper">
					<div class="logo active">
						<i class="icon-shopping_cart"></i>
					</div>
					<div v-show="totalPrice>0" class="badge">{{totolCount}}</div>
				</div>
				<!-- 通过绑定class来改变样式 -->
				<div class="price" :class="{active:totalPrice}">
					￥{{totalPrice}}
				</div>
				<div class="desc" v-show="totalPrice<50">
					配送费{{prices[0]}}元(>50免费)
				</div>
			</div>
			<div class="content-right" :class="{enough:totalPrice>=prices[1]}">
				<div class="pay">
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition name="transHeight">
			<div class="shopcart-list" v-show="totalPrice>0 && show">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div ref="list" class="list-content" >
					<ul>
						<li class="food" v-for="val in prices[2]">
							<span class="name">{{val.name}}</span>
							<div class="price">
								<span>￥{{val.price}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cart :food="val"></cart>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import cart from './control'
	import Scroll from 'better-scroll'
	export default{
		props:['prices'],
		data(){
			return{
				show:false
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.prices[2].forEach(food=>{
					total += food.price*food.count;
				})
				return total;
			},
			totolCount(){
				let count=0;
				this.prices[2].forEach(res=>{
					count+=res.count;
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice<this.prices[1]){
					return `还差${this.prices[1]-this.totalPrice}元起送`
				}else{
					return '去结算'
				}
			}
		},
		methods:{
			empty(){
				this.prices[2].forEach(val=>{
					val.count=0
				});
				this.show=false;
			},
			showValue(){
				this.show=!this.show;
				// 等待dom更新完使用滚动插件
				this.$nextTick(()=>{
					new Scroll(this.$refs.list,{
						click:true
					})
				})
			}
		},
		components:{
			cart
		}
	}
</script>