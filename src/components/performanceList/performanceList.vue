<template>
	<transition name="slideX">
		<div class="performance child">
			<mt-header fixed title="表现列表">
				<router-link to="/Recommond" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<scroll :data="test" class="perPosition" :pullup="pullup" @scrollToEnd="scrollToEnd">
					<div>
						<div class="perList clearfix" v-for="item in test">

							<div class="per_con">
								<div style="border-bottom: 1px solid #f6f5f4; padding-bottom: 0.5rem;">
									<img class="per_img" :src="imgURL+item.userImageId" onerror="src='static/test/person.png'" alt="" />

									<div class="per_h1">
										{{item.from}}教师
										<img class="ling" src="static/test/flower.png" alt="" />
									</div>

								</div>

							</div>
							<div class="per_text clearfix">
								<p>{{item.text}}</p>
								<div class="text-con clearfix">
									<i class="icon iconfont icon-shanchu" v-if="showIcon"></i>
									<span class="time">{{item.createTime}}</span>
								</div>
							</div>
						</div>
						<load-more v-show="start" :show-loading="true" :tip="tip"></load-more>
						<load-more v-show="end" :show-loading="false" :tip="b"></load-more>
					</div>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	import { LoadMore } from 'vux'
	export default {
		components: {
			Scroll,
			LoadMore
		},
		data() {
			return {
				websock: null,
				OFFSET: 1,
				test: [

				],
				pullup: true,
				end: false,
				start: false,
				imgURL: imgURL,
				flag: false,
				showIcon: false,
				isRefresh: true,
				tip: '正在加载',
				b: '暂无数据'
			}
		},
		created() {

			this.init()
		},
		mounted() {
			this.$nextTick(function() {

			})
		},
		methods: {
			scrollToEnd() {
				this.OFFSET++;
				if(this.isRefresh) {
					this.init();
				}
			},
			init() {
				let self = this;
				if(this.$store.state.userId == 3) {
					self.showIcon = true;
				}
				this.$nextTick(function() {
					axios.get(address + 'push/api/getNoticeList', {
						params: {
							userId: this.$store.state.userId,
							type: 'show',
							offset: self.OFFSET,
							limit: 10
						}
					}).then((res) => {
						console.log(res)
						if(res.data.code == 0) {
							if(res.data.data.totalSize != 0) {
								if(self.test == '') {
									self.test = res.data.data.list;
								} else {
									if(res.data.data.list != '') {
										self.start = true
										setTimeout(function() {
											self.start = false
											self.test = res.data.data.list.concat(self.test);
										}, 3000)
									} else {
										self.start = false;
										self.isRefresh = false;
										self.end = false;
									}

								}
							}else{
								self.end = true;
							}
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	/*.performance {
		background: #fff;
	}*/
	
	.perList {
		display: block;
		width: 100%;
		background: #fff;
		margin-bottom: 1rem;
	}
	
	.perList .per_img {
		display: inline-block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		margin: 0rem 1rem 0 0.5rem;
		vertical-align: middle;
		border: 0.2rem solid #ff7800;
		box-sizing: border-box;
	}
	
	.perList .per_con {
		display: inline-block;
		/*float: left;*/
		margin-top: 0.1rem;
		width: 100%;
		padding: 0.5rem 1rem 0;
		box-sizing: border-box;
	}
	
	.per_con .per_h1 {
		display: inline-block;
		line-height: 3rem;
		font-size: 1.2rem;
		position: relative;
		width: 26rem;
		vertical-align: middle;
	}
	
	.per_h1 .ling {
		position: absolute;
		top: 0.7rem;
		right: 0;
		display: inline-block;
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.per_text {
		padding: 0.5rem 0;
		;
		border-bottom: 1px solid #ededed;
	}
	
	.per_text img {
		display: inline-block;
		float: left;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		margin-right: 1rem;
	}
	
	.per_text p {
		display: inline-block;
		font-size: 1.2rem;
		line-height: 2rem;
		width: 100%;
		word-wrap: break-word;
		text-indent: 2em;
		padding: 0 1rem;
		box-sizing: border-box;
	}
	
	.text-con {
		padding: 0.5rem 0;
	}
	
	.text-con .icon {
		font-size: 2rem;
		margin-top: 0;
		float: left;
		margin-left: 1.5rem;
	}
	
	.text-con .time {
		display: inline-block;
		float: right;
		line-height: 2rem;
		padding-right: 1rem;
		box-sizing: border-box;
		font-size: 1.1rem;
		color: #ff9958;
	}
	
	.perPosition {
		position: absolute;
		top: 3rem;
		bottom: 0;
		width: 100%;
	}
	
	@media only screen and (min-width:320px) {
		.per_con .per_h1 {
			width: 19rem;
		}
	}
	
	@media only screen and (min-width:340px) {
		.per_con .per_h1 {
			width: 20rem;
		}
	}
	
	@media only screen and (min-width:360px) {
		.per_con .per_h1 {
			width: 22rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.per_con .per_h1 {
			width: 23rem;
		}
	}
	
	@media only screen and (min-width:414px) {
		.per_con .per_h1 {
			width: 24rem;
		}
	}
	
	.dataP {
		text-align: center;
		font-size: 1.1rem;
		line-height: 2rem;
	}
</style>