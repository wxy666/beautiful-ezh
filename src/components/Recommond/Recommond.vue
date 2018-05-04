<template>
	<div class="Recommond">
		<mt-header fixed title="校园"></mt-header>
		<div class="mailDiv">
			<scroll class="mailHeight">
				<div>
					<mt-swipe :auto="4000" class="Rec_img">
					
						<mt-swipe-item><img class="Rec_img" src="static/test/img01.png" alt="" /></mt-swipe-item>
						<mt-swipe-item><img class="Rec_img" src="static/test/img02.png" alt="" /></mt-swipe-item>
						<mt-swipe-item><img class="Rec_img" src="static/test/img03.png" alt="" /></mt-swipe-item>
					</mt-swipe>

					<!--个人信息-->
					<router-link tag="div" to="/person" class="person shadow clearfix">
						<img class="person_img" :src="avatar" onerror="src='static/test/person.png'" alt="" />
						<p>您好，{{username}}</p>
					</router-link>
					<div class="baby_list clearfix">
						<router-link to="/baby" class="baby_item color01 " tag='div'>
							<i class="icon iconfont icon-shiping-xue"></i>
							<p>看宝宝</p>
						</router-link>
						<router-link :to="kaoqin" class="baby_item color02" tag='div' @click="kaoqin()">
							<i class="icon iconfont icon-icon-test"></i>
							<p>考勤录</p>
						</router-link>
						<router-link to="/cookbook" class="baby_item color03" tag='div'>
							<i class="icon iconfont icon-baby_crockery"></i>
							<p>每日食谱</p>
						</router-link>
						<router-link tag="div" :to="feel" class="baby_item color04">
							<i class="icon iconfont icon-thermometer"></i>
							<p>健康体测</p>
						</router-link>
						<router-link to="/performanceList" class="baby_item color05" tag='div'>
							<i class="icon iconfont icon-jiangli"></i>
							<p>在校表现</p>
							<b v-if="num2"></b>
						</router-link>
						<router-link to="/noticeList" class="baby_item color06" tag='div'>
							<i class="icon iconfont icon-tongzhi"></i>
							<p>学校通知</p>
							<b v-if="num1"></b>
						</router-link>
						<!--<router-link to="/BabyCircle" class="baby_item" tag='div'>
							<i class="icon iconfont icon-pengyouquan"></i>
							<p>宝贝圈</p>
						</router-link>-->
					</div>
					<div class="recommond_list clearfix">
						<!--<router-link to="/cookbook" class="recommond_item " tag='div'>
							<i class="icon iconfont icon-baby_crockery"></i>
							<p>食谱</p>
						</router-link>-->
						<!--<router-link :to="kaoqin" class="recommond_item" tag='div' @click="kaoqin()">
							<i class="icon iconfont icon-icon-test"></i>
							<p>考勤</p>
						</router-link>-->
						<!--<router-link tag="div" :to="feel" class="recommond_item">
							<i class="icon iconfont icon-thermometer"></i>
							<p>体感</p>
						</router-link>
						<router-link to="/performanceList" class="recommond_item" tag='div'>
							<i class="icon iconfont icon-jiangli"></i>
							<p>表现列表</p>
							<b v-if="num2"></b>
						</router-link>
						<router-link to="/noticeList" class="recommond_item" tag='div'>
							<i class="icon iconfont icon-tongzhi"></i>
							<p>通知</p>
							<b v-if="num1"></b>
						</router-link>-->
						<!--<router-link to="/Recommond/maillist" class="recommond_item" tag='div'>
							<i class="icon iconfont icon-tongxunlu"></i>
							<p>通讯录</p>
						</router-link>-->
					</div>
				</div>
			</scroll>

		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
		components: {
			Scroll,
			Swipe,
			SwipeItem
		},
		data() {
			return {
				username: '',
				noticeNum: 0,
				showNum: 0,
				num1: false,
				num2: false,
				avatar: '',
			}
		},
		created() {
			this.init()
			//			this.noticeNumFn()
			//			this.showNumFn()
		},
		computed: {
			kaoqin() {
				if(this.$store.state.userType == 5) {
					return '/Recommond/kqCon?name=' + this.username
				} else {
					return '/kaoqin'
				}
			},
			feel() {
				if(this.$store.state.userType == 5) {
					return '/Recommond/feelCon?name=' + this.username
				} else {
					return '/feel'
				}
			}
		},
		methods: {
			person() {
				this.$router.push('/Recommond/person')
			},
			init() {
				let self = this;
				this.$nextTick(function() {
					//					self.$store.dispatch('GetInfo', this.$store.state).then(() => {
					axios.get(address + 'index/api/getUserInfo', {
						params: {
							userId: this.$store.state.userId
						}
					}).then(function(res) {
						self.$store.state.sysUser = res.data.data;
						self.avatar = imgURL + self.$store.state.sysUser.imageId;
						self.$store.state.sysUser.imageId
						console.log('用户1', self.$store.state.sysUser)
						self.$store.state.userId = res.data.data.id;
						self.$store.state.token = res.data.data.userToken;
						self.$store.state.userType = res.data.data.userType;
						self.$store.state.name = res.data.data.loginName;
						if(self.$store.state.userType == 3) {
							self.username = res.data.data.name + '园长';
						} else if(self.$store.state.userType == 4) {
							self.username = res.data.data.name + '教师';
						} else if(self.$store.state.userType == 5) {
							self.username = res.data.data.name + '家长';
						}
						self.noticeNum = res.data.data.userConfig.noticeNum;
						self.showNum = res.data.data.userConfig.showNum;
						self.noticeNumFn();
						self.showNumFn();

					})
					//					})

				})

			},
			noticeNumFn() {
				axios.get(address + 'push/api/getNoticeList', {
					params: {
						userId: this.$store.state.userId,
						type: 'notice',
						isNum: 1
					}
				}).then((res) => {
					if(this.noticeNum < res.data.data.totalSize) {
						this.num1 = true;
					}

				})

			},
			showNumFn() {
				axios.get(address + 'push/api/getNoticeList', {
					params: {
						userId: this.$store.state.userId,
						type: 'show',
						isNum: 1
					}
				}).then((res) => {
					if(this.showNum < res.data.data.totalSize) {
						this.num2 = true;
					}

				})

			}

		}
	}
</script>

<style scoped>
	.mailDiv {
		position: fixed;
		top: 3rem;
		bottom: 3rem;
		width: 100%;
	}
	
	.Rec_img {
		display: inline-block;
		width: 100%;
		height: 15rem;
	}
	
	.person {
		width: 100%;
		height: 5rem;
		background: #fff;
		margin-bottom: 1rem;
		margin-top: -0.3rem;
	}
	
	.person .person_img {
		display: inline-block;
		float: left;
		width: 3.6rem;
		height: 3.6rem;
		border-radius: 50%;
		border: 0.2rem solid #ff7800;
		margin: 0.4rem 1rem 0 0.5rem;
	}
	
	.person p {
		display: inline-block;
		line-height: 5rem;
		font-size: 1.2rem;
		color: #7c807c;
	}
	
	.baby_list {
		margin-bottom: 1rem;
	}
	
	.baby_list .baby_item {
		width: 45%;
		float: left;
		height: 7rem;
		background: #fff;
		text-align: center;
		box-shadow: 0px 0.2rem 0.5rem rgba(217, 178, 178, 0.2);
		border-radius: 0.2rem;
		box-sizing: border-box;
	}
	
	.baby_list .baby_item:nth-child(odd) {
		/*border-right: 1px solid #dcd5d5;*/
		box-sizing: border-box;
		margin-right: 6%;
		margin-left: 2%;
		margin-bottom: 1rem;
	}
	
	.baby_list .baby_item img,
	.recommond_item img {
		display: inline-block;
		width: 3rem;
		height: 3rem;
		margin-top: 1rem;
	}
	
	.recommond_list {
		padding: 0 2%;
		padding-bottom: 3rem;
	}
	
	.recommond_item {
		background: #fff;
		text-align: center;
		width: 50%;
		float: left;
		height: 7rem;
		border-bottom: 1px solid #dcd5d5;
		box-sizing: border-box;
		box-shadow: 0px 0.1rem 0.3rem rgba(34, 25, 25, 0.2);
		border-radius: 0.5rem;
		position: relative;
	}
	
	.recommond_item b {
		display: inline-block;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: red;
	}
	
	.recommond_item:nth-child(odd) {
		border-right: 1px solid #dcd5d5;
	}
	
	.recommond_item:nth-child(5) {
		border-bottom: none;
	}
	
	.recommond_item:nth-child(6) {
		border-bottom: none;
	}
	/*@media only screen and (min-width:414px) {
		.recommond_item {
			width: 33.33%;
		}
		.recommond_item {
			border-right: 1px solid #dcd5d5;
		}
		.recommond_item:nth-child(3n) {
			border-right: none;
		}
		.recommond_item:nth-child(4) {
			border-bottom: none;
		}
		.recommond_item:nth-child(5) {
			border-bottom: none;
		}
		.recommond_item:nth-child(6) {
			border-bottom: none;
		}
	}*/
	.icon{
		font-size: 3.5rem;
    margin-top: 0.8rem;
	}
	.recommond_item p,
	.baby_list .baby_item p {
		color: #949494;
		font-size: 1.2rem;
	}
	
	.baby_item.color01 p,
	.baby_item.color02 p {
		display: inline-block;
		vertical-align: middle;
		color: #2ea5dc;
		margin-top: 1.5rem;
		margin-left: 1rem;
		font-size: 1.4rem;
	}
	
	.baby_item.color01 .icon,
	.baby_item.color02 .icon {
		color: #2ea5dc;
		vertical-align: middle;
		margin-top: 1.5rem;
		font-size: 4rem;
	}
	
	.baby_item.color02 p,
	.baby_item.color02 .icon {
		color: #ff9900;
	}
	
	.baby_item.color03 .icon {
		color: #56ac13
	}
	
	.baby_item.color04 .icon {
		color: #33cccc
	}
	
	.baby_item.color05 .icon {
		color: #ff6666
	}
	
	.baby_item.color06 .icon {
		color: #9966cc
	}
	
</style>