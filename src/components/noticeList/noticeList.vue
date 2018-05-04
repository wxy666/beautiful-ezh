<template>
	<transition name="slideX">
		<div class="noticeList child">
			<mt-header fixed title="通知列表">
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
									<img class="ling" src="static/test/ling.png" alt="" />
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
						<p v-show="end" class="dataP">数据已加载完毕</p>
						<p v-show="start" class="dataP">数据加载中....</p>
					</div>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	export default {
		components: {
			Scroll
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
				showIcon:false

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
				this.init();
			},
			init() {
				let self = this;
				if(this.$store.state.userId == 3){
					self.showIcon =true; 
				}
				this.$nextTick(function() {
					axios.get(address + 'push/api/getNoticeList', {
						params: {
							userId: this.$store.state.userId,
							type: 'notice',
							offset: self.OFFSET,
							limit: 10
						}
					}).then((res) => {
						console.log(res)
						if(res.data.code == 0) {
							if(self.test == '') {
								self.test = res.data.data.list
								if(self.test.length < 10) {
									self.start = false;
									self.end = false;

								} else {
									self.start = true
								}

							} else {
								if(res.data.data.list != '') {
									self.start = true
									res.data.data.list.forEach(function(data) {
										self.test.push(data);
									})
								} else {
									self.start = false;
									self.end = true;
								}
							}

						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.performance {
		background: #fff;
	}
	
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
		padding: 0.5rem 0;;
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
	/*.per_text .time{
		display: block;
		line-height: 2rem;
		text-align: right;
		padding-right:1rem;
		box-sizing: border-box;
		font-size: 1.1rem;
		color: #ff9958;
	}*/
	.text-con{
		padding: 0.5rem 0;
	}
	.text-con .icon{
		font-size: 2rem;
		margin-top: 0;
		float: left;
		margin-left: 1.5rem;
	}
	.text-con .time{
		display: inline-block;
		float: right;
		line-height: 2rem;
		padding-right:1rem;
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