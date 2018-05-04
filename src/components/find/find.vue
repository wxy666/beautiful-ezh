<template>
		<div>
			<div class="find">
				<mt-header fixed title="每日推荐"></mt-header>
			</div>
			<div class="wrap">
				<div class="video">
					<d-player v-if="flag" :options='options' ref='player' class="dpStyle">
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
							<div class="allText" style="padding-bottom: 6rem;" v-html="allData.content">
							</div>
						</div>
					</scroll>
				</div>
			</div>
		</div>

</template>

<script>
import Scroll from '@/base/scroll/scroll';
	export default {
		components:{
			Scroll
		},
		data() {
			return {
				flag: false,
				allData:[],
				iconUrl:'',
				fileUrl:''
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				let self = this;
				this.$nextTick(function() {
					axios.get(address + 'index/api/getRecommend', {
						params: {
							userId: this.$store.state.userId,
						}
					}).then(function(res) {
						console.log(res)
						self.allData = res.data.data;
						self.iconUrl = self.allData.thumbnailUrl;
						self.fileUrl = self.allData.fileUrl;
						self.options = {
							video: {
								url: 'http://res.ezhihe.cn/zlwx/resources/convert_s' + self.fileUrl,
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
		}
	}
</script>

<style scoped>
	.mint-header {
		width: 100%;
		line-height: 3rem;
		text-align: center;
		color: #fff;
		font-weight: normal;
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
		top: 29rem;
		bottom: 4rem;
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