<template>
	<transition name="slideX">
		<div class="bookDetail child">
			
			<div class="title">
				<i class="iconfont icon-fanhui" @click="getrouterlink"></i>
			</div>
			<div >
				<div class="video">
					<d-player v-if="flag" :options='options' @play='play' ref='player' class="dpStyle">
					</d-player>
				</div>
				<div class="video_name">
					<p style="font-weight: bold;">{{allData.fileName}}</p>
					<p>播放次数：{{allData.clicksNum}}</p>
				</div>
				<div class="video_con">
					<p>资源描述</p>
					<scroll class="minHeight">
						<div >
							<div  style="padding-bottom: 6rem;" v-html="allData.content">
							</div>
						</div>
					</scroll>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll';
	export default {
		components:{
			Scroll
		},
		data() {
			return {
				id: '', //资源id
				iconUrl: '',
				fileUrl: '',
				allData: [],
				options: {},
				player: null,
				flag:false
			}
		},
		computed: {

		},
		created() {
			this.id = this.$route.query.id;
			this.init();
			//增加播放次数
			this.addclicknum();
		},
		mounted() {
		},
		methods: {
			getrouterlink() {
				return this.$router.back(-1)
			},
			play() {

			},
			init() {
				let self = this;
				this.$nextTick(function() {
					axios.get(address + 'index/api/courseDetail', {
						params: {
							userId: this.$store.state.userId,
							courseId: this.id
						}
					}).then(function(res) {
						console.log(res)
						self.allData = res.data.data;
						self.iconUrl = self.allData.thumbnailUrl;
						self.fileUrl = self.allData.fileUrl;
						self.options = {
							video: {
								url: 'http://res.ezhihe.cn/zlwx/resources/convert_s'+self.fileUrl,
								pic: 'http://res.ezhihe.cn/zlwx/resources/convert_s' + self.iconUrl
							},
							lang: 'zh-cn',
							autoplay: false
						}
						self.flag = true;
						console.log(self.allData)
					}).catch(function(err) {
						console.log(err)
					})
				})

			},
			addclicknum(){
				this.$nextTick(function() {
					axios.get(address + 'index/api/addClickNum', {
						params: {
							userId: this.$store.state.userId,
							courseId: this.id
						}
					}).then(function(res) {
						console.log('2',res)
					}).catch(function(err) {
						console.log(err)
					})
				})
			}
		}
	}
</script>

<style scoped>
	.title{
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
	.title .iconfont{
		color: #FFFFFF;
		width: 4rem;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
		border-radius: 50%;
		background: #000000;
		opacity: 0.5;
		margin-left: 1rem;
	}
	.video_name{
		background: #fff;
		padding: 1rem;
	}
	.video_name p{
		font-size: 1.1rem;
		color: #464141;
		line-height: 2rem;
	}
	.video_con{
		background: #fff url('../../../static/test/ezh_bg01.png') no-repeat center bottom;
		background-size:100% 14rem;
		padding: 1rem;
		margin-top: 1rem;
		position: absolute;
		top: 26rem;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
	}
	.video_con > p{
		font-size: 1.1rem;
		font-weight: bold;
		color: #464141;
		line-height: 3rem;
		border-bottom: 0.1rem solid #ebebeb;
	}
	.minHeight{
		height:100%;
		position: relative;
		overflow: hidden;
		padding: 1rem 0.5rem;
	}
</style>