<template>
	<transition name="slideX">
		<div class="cookbook">
			<mt-header fixed title="食谱">
				<router-link to="/Recommond" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<mt-button slot="right" @click="a" v-show="userT == 3">编辑食谱</mt-button>
			</mt-header>
			<div class="ta">
				<div class=" wrap">
					<tab :line-width=2 active-color='#fc378c' v-model="index">
						<tab-item class="vux-center" @on-item-click="handler(index)" :selected="demo2 === item" v-for="(item, index) in list2 " @click="demo2 = item" :key="index">
							<span>{{list3[index]}}</span>
							<p> {{item}} </p>
						</tab-item>
					</tab>
					<swiper v-model="index" height="46rem" :show-dots="false">
						<swiper-item v-for="(item, index) in list2" :key="index">
							<div class="food">
								<ul>
									<li>
										<div class="getImg colGre">
											<i class="icon iconfont icon-baby_crockery"></i>
										</div>
										<div class="food-box">
											<a>早餐: <span>{{mo1}}</span></a>
											<a>早点: <span>{{mo2}}</span></a>
										</div>
									</li>
									<li>
										<div class="getImg colblu">
											<i class="icon iconfont icon-baby_crockery"></i>
										</div>
										<div class="food-box">
											<a>午餐: <span>{{mo3}}</span></a>
											<a>午点: <span>{{mo4}}</span></a>
										</div>
									</li>
									<li>
										<div class="getImg colyel">
											<i class="icon iconfont icon-baby_crockery"></i>
										</div>
										<div class="food-box">
											<a>晚餐: <span>{{mo5}}</span></a>
											<a>晚点: <span>{{mo6}}</span></a>
										</div>
									</li>
								</ul>
								<div class="mes_img clearfix">
									<p>图片展示</p>
									<img @click="viewImg(targetImg,num)" :src="imgURL+img" v-if="img" alt="" v-for="(img,num) in targetImg" />
								</div>
							</div>
						</swiper-item>
					</swiper>
					<swiper v-model="targetindex" height="54rem" v-if="targets" class="targetSlider" :show-dots="false">
						<swiper-item v-for="(item, index) in targetArr" :key="index">
							<img :src="imgURL+item" alt="" @click="hideImg()" />
						</swiper-item>
					</swiper>
				</div>
			</div>
			<food v-if="flag" @flags="flags" @go="go" :time="selectedTime" :longtime="getWeekTimeLong" ref="food"></food>
		</div>
	</transition>
</template>

<script>
	import * as time from '@/common/util/time.js'
	import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import food from '@/components/food/food'
	const list = () => ['一', '二', '三', '四', '五', '六', '日']
	export default {
		data() {
			return {
				list2: [],
				list3: list(),
				index: 0,
				demo2: '',
				selectedTime: '',
				getWeekTimeLong: '',
				flag: false,
				mo1: '',
				mo2: '',
				mo3: '',
				mo4: '',
				mo5: '',
				mo6: '',
				getList: [],
				imgURL: imgURL,
				targetImg: [],
				targetindex: 0, //swiper index
				targets: false, //swiper v-if
				targetArr: []
			}
		},
		watch: {
			index(n, o) {
				console.log(n, o)
			}
		},
		computed: {
			userT() {
				return this.$store.state.userType;
			}
		},
		created() {
			this.list2 = time.getThisTime();
			this.demo2 = time.getDateWeek();
			this.selectedTime = time.getDateWeek2();
			this.getWeekTimeLong = time.getThisTime3()[0]
			this.init();
		},
		mounted: function() {
			this.$nextTick(function() {})
		},
		methods: {
			flags(data) {
				this.flag = data;
			},
			go(data) {
				if(data) {
					this.init();
				}
			},
			init() {
				let self = this;
				this.$nextTick(() => {
					console.log('时间', self.getWeekTimeLong)
					axios.get(address + 'index/api/getRecipes', {
						params: {
							userId: this.$store.state.userId,
							createDate: new Date(self.getWeekTimeLong).getTime()
						}
					}).then((res) => {
						console.log(res)
						if(res.data.code == 0) {
							self.getList = eval(res.data.data.text);
							self.mo1 = self.getList[0];
							self.mo2 = self.getList[1];
							self.mo3 = self.getList[2];
							self.mo4 = self.getList[3];
							self.mo5 = self.getList[4];
							self.mo6 = self.getList[5];
							if(res.data.data == null) {
								self.targetImg = ''
							}
							self.targetImg = res.data.data.img.split(',');
							//							console.log(self.targetImg)
						}

					}).catch((err) => {
						console.log(err)
					})
				})

			},
			a() {
				this.flag = true;
				//				this.$refs.food.show();
				this.selectedTime = this.list2[this.index];
				this.getWeekTimeLong = time.getThisTime3()[this.index];

			},
			handler(index) {
				this.selectedTime = time.getThisTime2()[index]
				this.getWeekTimeLong = time.getThisTime3()[index];
				this.getWeekTimeLong = time.getThisTime3()[n];
				let self = this;

				axios.get(address + 'index/api/getRecipes', {
					params: {
						userId: this.$store.state.userId,
						createDate: new Date(self.getWeekTimeLong).getTime()
					}
				}).then((res) => {
					console.log('更新后的食谱', res)
					if(res.data.data == null) {
						self.mo1 = '';
						self.mo2 = '';
						self.mo3 = '';
						self.mo4 = '';
						self.mo5 = '';
						self.mo6 = '';
					} else {
						self.getList = eval(res.data.data.text);
						self.mo1 = self.getList[0];
						self.mo2 = self.getList[1];
						self.mo3 = self.getList[2];
						self.mo4 = self.getList[3];
						self.mo5 = self.getList[4];
						self.mo6 = self.getList[5];
					}
					if(res.data.data == null) {
						self.targetImg = ''
					}
					self.targetImg = res.data.data.img.split(',');
					console.log(self.targetImg)
				}).catch((err) => {
					console.log(err)
				})

			},
			//显示
			viewImg(arr, num) {
				console.log(arr, num)
				this.targetArr = arr;
				this.targetindex = num;
				this.targets = true
			},
			//隐藏
			hideImg() {
				this.targets = false

			}
		},
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			food
		}
	}
</script>
<style type="text/css">
	.scrollable .vux-tab-ink-bar {
		display: none!important;
	}
	/* 判断ipad */
	
	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
		.vux-slider {
			margin-top: 20px;
		}
	}
</style>
<style scoped="scoped">
	.nav {
		margin-top: 3rem;
	}
	
	.vux-tab .vux-tab-item {
		background: none!important;
	}
	
	.scrollable .vux-tab-ink-bar {
		display: none!important;
	}
	
	.scrollable .vux-tab-item {
		flex: 0 0 20%!important;
	}
	
	.cookbook {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.tab {
		display: none;
	}
	
	.ta {
		/*position:fixed;
		top: 3rem;
		bottom: 0;
		height: 100%;
		padding: 3.3rem 0 3.4rem 0;*/
	}
	
	.wrap {
		/*width: 100%;
		height: 100%;*/
	}
	
	.vux-swiper {
		height: 1000px !important;
	}
	
	.vux-center span {
		display: block;
		height: 1.8rem;
		vertical-align: top;
		margin-top: -1rem;
	}
	
	.food ul li {
		display: flex;
		background: #fff;
		margin-top: 1rem;
	}
	
	.food ul li .getImg {
		display: inline-block;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		margin: 1rem;
		text-align: center;
	}
	
	.colGre {
		background: #51da42;
	}
	
	.colblu {
		background: #76d8ff;
	}
	
	.colyel {
		background: #f9e237;
	}
	
	.food ul li .getImg i {
		color: #fff;
		font-size: 3rem;
	}
	
	.food-box {
		flex: 1;
		padding-top: 1.2rem;
	}
	
	.food-box a {
		display: block;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		line-height: 2.2rem;
	}
	
	.food-box span {
		display: inline-block;
		line-height: 2.2rem;
		width: 18rem;
		word-wrap: break-word;
		vertical-align: top;
	}
	
	.mes_img {
		padding: 0 2rem;
		background: #fff;
		margin-top: 1rem;
	}
	
	.mes_img p {
		line-height: 2.6rem;
		font-size: 1.2rem;
	}
	
	.mes_img img {
		display: inline-block;
		float: left;
		width: 8rem;
		height: 8rem;
		margin: 0.3rem;
		border: 0.2rem solid #f6f4f4;
		border-radius: 0.5rem;
	}
	
	@media only screen and (min-width:320px) {
		.mes_img {
			padding: 0 3rem;
		}
		.mes_img img {
			width: 6rem;
			height: 6rem;
		}
	}
	
	@media only screen and (min-width:340px) {
		.mes_img {
			/*padding: 0 2rem;*/
		}
		.mes_img img {
			width: 6rem;
			height: 6rem;
		}
	}
	
	@media only screen and (min-width:360px) {
		.mes_img {
			/*padding: 0 2rem;*/
		}
		.mes_img img {
			width: 7rem;
			height: 7rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.mes_img {
			padding: 0 2rem;
		}
		.mes_img img {
			width: 8rem;
			height: 8rem;
		}
	}
	
	.targetSlider {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: rgba(7, 17, 27, 0.7);
		z-index: 1000;
	}
	
	.targetSlider img {
		display: inline-block;
		max-width: 100%;
		max-height: 100%;
		position: absolute;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
</style>