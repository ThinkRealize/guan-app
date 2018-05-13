<template>
	<div class="goods">
		<div class="menu-wrapper" ref="select">
			<ul>
				<li class="menu-item" v-for="val in goods">
					<span class="text">
						<!-- 用type来控制是否显示图片 以及显示图标的序号 -->
						<span v-if="val.type>0" class="iconMap" :class="icon[val.type]"></span>
						{{val.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper"  ref="foods">
			<ul>
				<li class="food-list food-list-hook" v-for="val in goods">
					<h1 class="title">{{val.name}}</h1>
					<ul>
						<!-- 遍历循环foods数组 -->
						<li class="food-item" v-for="item in val.foods">
							<div class="icon">
								<img width="57" height="57" :src="item.icon" alt="#">
							</div>
							<div class="content">
								<div  @click="showDetail(item)">
									<h2 class="name">{{item.name}}</h2>
									<p class="description">{{item.description}}</p>
									<div class="sell-info">
										<span class="sellCount">月售{{item.sellCount}}</span>
										<span class="rating">好评率{{item.rating}}</span>
									</div>
									<div class="price">
										<span class="newPrice">￥{{item.price}}</span>
									</div>
								</div>
								<div class="cartcontrol-wrapper">
									<control :food="item"></control>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 配送费，起步价，选中的商品的数组 -->
		<shopCart :prices="[seller.deliveryPrice,seller.minPrice,food]"></shopCart>
		<foodDetail ref="food" :foodDe="foodDe"></foodDetail>
	</div>
</template>
<script>
	import icon from './icon'
	import Scroll from 'better-scroll'
	import shopCart from './shopCart'
	import control from './control'
	import foodDetail from './foodDetail.vue'
	export default{
		props:['goods','seller'],
		data(){
			return{
				icon:icon.className,
				foodDe:{}
			}
		},
		computed:{
			// 当count大于0时添加foods到数组中
			food(){
				let arr=[];
				// 第一层为goods数组
				this.goods.forEach(val=>{
					// 第二层为foods数组
					val.foods.forEach(res=>{
						// 已经添加到购物车
						if(res.count>0){
							arr.push(res)
						}
					})
				})
				return arr;
			}
		},
		methods:{
			scroll(){
				new Scroll(this.$refs.foods,{click:true
				});
				new Scroll(this.$refs.select,{
					click:true
				});
			},
			showDetail(value){
				// 执行子组件里的方法为了确保绑定滚动插件时页面已经加载完毕所有将，绑定也写在该方法中，当我们点击信息时页面加载完毕然后执行绑定
				this.$refs.food.foodshow();
				this.foodDe=value;
			}
		},
		components:{
			shopCart,
			control,
			foodDetail
		}
	}
</script>