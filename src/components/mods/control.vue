<template>
	<!-- 加减号组件 需要接受具体的商品作为参数 根据商品的个数来计算 -->
	<div class="cartcontrol">
		<transition name="fadeRotate">
			<div class="cart-decrease" v-show="food.count>0" @click="decrease">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="cart-add" @click="add">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script>
// 滚动插件必须在dom更新完之后才能使用
	import Vue from 'vue'
	export default{
		props:['food'],
		methods:{
			add(){
				if(!this.food.count){
					Vue.set(this.food,'count',0);
				}
				this.food.count++;
			},
			decrease(){
				this.food.count--;
			}
		}
		
	}
</script>