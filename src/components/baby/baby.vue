<template>
	<transition name="slideX">
		<div class="baby child">
			<router-link tag="div" to="/Recommond" class="title">
				<i class="iconfont icon-fanhui"></i>
			</router-link>
			<s-player :video='video' :contextmenu="contextmenu" @play='play' ref='player' class="dpStyle">
			</s-player>
			<div class="fixedHeight">
				<scroll :data="videoUrl" class="mailHeight">
					<ul class="video-box" ref="videoBox">

						<li v-for="(item,index) in videoUrl" @click="switchHandle(index)">
							<div>{{}}</div>
							<div class="img"></div>
							<span>{{item.name}}</span>
							<i v-html="item.status == 0 ? '正常' : '<span style=color:#f45a5a>关闭</span>'"></i>
							<b :class="item.status == 0 ? 'v_bg1':'v_bg2'"></b>
							<div class="tc" ref="tc">
								正在播放
							</div>
						</li>

					</ul>
				</scroll>
			</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	import sPlayer from '@/base/VueDPlayerHls/VueDPlayerHls';
	export default {
		data() {
			return {
				videoUrl: [],
				//https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/chunklist_w630020335.m3u8

				video: {
					url: '',
					pic: 'static/test/test01.jpg',
					type: 'hls'
				},
				lang: 'zh-cn',
				autoplay: false,
				contextmenu: [{
					text: 'GitHub',
					link: 'https://github.com/MoePlayer/vue-dplayer'
				}],
				player: null,
				flag: false
			}
		},
		components: {
			Scroll,
			sPlayer
		},
		created() {
			this.init();
		},
		mounted() {
			this.player = this.$refs.player.dp;
		},
		methods: {
			init() {
				let self = this;
				//address + 'index/api/monitorList'
				axios.get('http://192.168.9.172:4040/index/api/monitorList', {
					params: {
						userId: self.$store.state.userId
					}
				}).then(function(res) {
					console.log('3333', res)

					if(res.data.code == 0) {
						//					self.flag=true;
						self.$nextTick(function() {
							console.log('返回的ip', res.data.data)
							
							for(var i in res.data.data){
								let objs={}
								console.log(i)
								objs[i] = res.data.data[i]
								self.videoUrl.push(objs)
							}

							
							console.log('videoUrl====>', self.videoUrl)
							
							//							self.video = {
							//								url: self.videoUrl[0].ip,
							//								pic: '',
							//								type: 'hls'
							//							}
							//							console.log(self.video)
							//							self.player = self.$refs.player.dp;
							//							var hls = new Hls();
							//							hls.loadSource(this.videoUrl[0].ip);
							//							hls.attachMedia(this.player);
							//							this.player.switchVideo({
							//								url: this.videoUrl[0].ip
							//							})
						})
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			play() {
				console.log('play callback')
			},
			switchHandle(index) {
				if(this.videoUrl[index].status == 0) {
					this.$refs.tc.forEach(function(data) {
						data.style.display = 'none';
					})
					this.$refs.tc[index].style.display = 'block';
					console.log(index)
					console.log(this.videoUrl[index].ip)
					var hls = new Hls();
					hls.loadSource(this.videoUrl[index].ip);
					hls.attachMedia(this.player);
					this.player.switchVideo({
						url: this.videoUrl[index].ip
					})
					this.player.play();
					console.log(this.player)
				}

			},
			hide() {
				this.$router.push('/Recommond');
			}
		}
	}
</script>

<style scoped="scoped">
	.title {
		position: fixed;
		width: 100%;
		height: 3.1rem;
		line-height: 3.1rem;
		text-align: left;
		color: #FFFFFF;
		font-size: 16px;
		top: 0;
		left: 0;
		margin: 0;
		z-index: 2;
	}
	
	.title .iconfont {
		display: inline-block;
		color: #FFFFFF;
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		border-radius: 50%;
		background: #fff;
		opacity: 0.8;
		margin-left: 1rem;
		font-size: 1.4rem;
		color:#000;
	}
	
	.baby {
		height: 100%;
	}
	
	.dpStyle {
		width: 100%;
		height: 18rem;
	}
	
	.video-box {
		margin: 2rem;
		padding-bottom: 2rem;
		position: relative;
	}
	
	.video-box li {
		display: inline-block;
		width: 12rem;
		height: 10rem;
		text-align: center;
		margin-right: 2.5rem;
		position: relative;
	}
	
	.video-box li .img {
		width: 12rem;
		height: 8rem;
		background-color: #fff;
		border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
		display: inline-block;
		box-shadow: 0px 0.2rem 0.5rem rgba(34, 25, 25, 0.2);
	}
	
	.video-box li span {
		font-size: 1rem;
	}
	
	.video-box li i {
		display: inline-block;
		position: absolute;
		bottom: 2.5rem;
		right: 1rem;
		z-index: 1;
		font-size: 1rem;
		color: #09BB07;
		font-style: normal;
	}
	
	.video-box li:nth-child(even) {
		margin-right: 0;
	}
	
	.video-box li .tc {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 8rem;
		line-height: 8rem;
		border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
		background: rgba(7, 17, 27, 0.5);
		color: #fff;
		font-size: 1.2rem;
		display: none;
	}
	
	.v_bg1,
	.v_bg2 {
		display: inline-block;
		position: absolute;
		top: 2rem;
		left: 5rem;
		width: 3rem;
		height: 3rem;
		background: url('../../../static/test/video01.png') no-repeat;
		background-size: 3rem;
	}
	
	.v_bg2 {
		background: url('../../../static/test/video02.png') no-repeat;
		background-size: 3rem;
	}
	
	.fixedHeight {
		position: fixed;
		top: 18rem;
		bottom: 0;
		width: 100%;
	}
	
	.mailHeight {
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	
	@media only screen and (min-width:320px) {
		.video-box li {
			width: 10rem;
		}
		.video-box li div {
			width: 10rem;
		}
	}
	
	@media only screen and (min-width:340px) {
		.video-box li {
			width: 11rem;
		}
		.video-box li div {
			width: 11rem;
		}
	}
	
	@media only screen and (min-width:360px) {
		.video-box li {
			width: 12rem;
		}
		.video-box li div {
			width: 12rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.video-box li {
			width: 12rem;
		}
		.video-box li div {
			width: 12rem;
		}
	}
</style>