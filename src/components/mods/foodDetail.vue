<template>
	<transition name="move">
		<div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
			<div class="foodDetail">
				<div @click="showDetail=!showDetail" class="back">
					<i class="icon-arrow_lift"></i>
				</div>
				<img :src="foodDe.image" height="425" width="100%" alt="">
				<div class="info">
					<div class="title">{{foodDe.name}}</div>
					<div class="desc">
						<span>月售{{foodDe.sellCount}}</span>
						<span>好评率{{foodDe.rating}}</span>
					</div>
					<div class="price">￥{{foodDe.price}}</div>
					<transition name="fade">
						<div v-show="!foodDe.count" @click="add" class="shopCart">
							<!-- 作用相当于加号一直加数目 -->
							<div class="text">加入购物车</div>
						</div>
					</transition>	
					<!-- 加减号 用ref获取组件中的方法-->
					<control ref="cartAdd" :food="foodDe"></control>
				</div>
				<!-- 分隔线 -->
				<div class="divider"></div>
				<div class="desc">
					<div class="title">商品介绍</div>
					<div class="content">{{foodDe.info}}</div>
				</div>
				<!-- 分隔线 -->
				<div class="divider"></div>
				<div class="evaluation">
					<div class="title">商品评价</div>
					<div class="classify">
						<!-- 给序号最后一个添加bad的class -->
						<span v-for="(val,i) in classify" class="item" :class="{active:val.active,bad:classify.length===i+1,badActive:badActive(val,i)}" @click="changeColor(val)">{{val.name}}
							<span class="count">{{val.count}}</span>
						</span>
					</div>
					<div class="switch">
						<span class="icon-check_circle" @click="flag=!flag" :class="{on:flag}"></span>
						<span class="text">只看有内容的评价</span>
					</div>
					<div class="evel-list">
						<ul>
							<li class="evel" v-for="val in commentRating ">
								<div class="userInfo">
									<div class="time">{{val.rateTime}}</div>
									<div class="user">
										<span>{{val.username}}</span>
										<img :src="val.avatar" width="12" height="12" alt="#" >
									</div>
								</div>
								<div class="content">
					                <span class="icon" :class="val.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
					                <span class="text">{{val.text}}</span>
				                </div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import control from './control'
	import Scroll from 'better-scroll'
	export default{
		props:['foodDe'],
		data(){
			return{
				// 控制显示隐藏
				showDetail:false,
				// 评论的类型
				classify:[
					{name:'全部',count:0,active:true,commont:[]},
					{name:'推荐',count:0,active:false,commont:[]},
					{name:'差评',count:0,active:false,commont:[]}
				],
				commonts:[],
				flag:true
			}
		},
		methods:{
			add(){
				this.$refs.cartAdd.add()
			},
			foodshow(){
				this.showDetail=true;
				// 需要等数据传递过来才能进行遍历
				this.$nextTick(()=>{
					this.ratingsTime=this.foodDe.ratings.forEach(val=>{
						this.commonts = this.foodDe.ratings;
						this.classify[0].count++;
						this.classify[0].commont.push(val);
						if(val.rateType){
							this.classify[2].count++;
							this.classify[2].commont.push(val)
						}else{
							this.classify[1].count++;
							this.classify[1].commont.push(val)
						}
					});
				})
				// 使用.refresh方法强制更新，不然会造成无法退出页面通过判断是否点击过来确认是否要进行强制更新
				this.$nextTick(()=>{
					if(!this.times){
						this.times=new Scroll(this.$refs.detailWrapper,{
							click:true
						})
					}else{
						this.times.refresh()
					}
				})
			},
			changeColor(item){
				this.commonts=item.commont;
				this.classify.forEach(val=>{
					val.active=false;
				})
				item.active=true;
			},
			badActive(val,i){
				if(val.active&&this.classify.length===i+1){
					return true
				}else{
					return false
				}
			}
		},
		computed:{
			commentRating(){
				let arr = [];
				if(this.flag){ //为真则只看有内容的评价
					this.commonts.forEach(val=>{
						if(val.text.length){
							arr.push(val)
						}
					})
					return arr;
				}else{
					return this.commonts;
				}	
			}
		},
		components:{
			control
		}
	}
</script>