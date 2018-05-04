<template>
	<div class="myself">
		<!--<mt-header fixed title="我的"></mt-header>-->
		<div class="wrap">
			<router-link tag="div" to="/person" class="person_bg" >
				<img :src="avatar" onerror="src='static/test/person.png'" alt="" />
				<p>{{name}}</p>
			</router-link>
			<router-link v-if="bookShow" tag="div" to="/myself/book" class="list clearfix mb_1">
				<div class="list_img">
					<img src="static/test/m4.png" alt="" />
				</div>
				<div class="list_title">
					我的书架
					<i class="list_i">
						<img src="static/test/right.png" alt="" />
					</i>
				</div>
			</router-link>
			<router-link tag="div" to="/myself/changePW" class="list clearfix mb_1">
				<div class="list_img">
					<img src="static/test/m1.png" alt="" />
				</div>
				<div class="list_title">
					修改密码
					<i class="list_i">
						<img src="static/test/right.png" alt="" />
					</i>
				</div>
			</router-link>
			<router-link v-if="manageShow" tag="div" to="/myself/manage" class="list clearfix ">
				<div class="list_img">
					<img src="static/test/m2.png" alt="" />
				</div>
				<div class="list_title">
					摄像头管理
					<i class="list_i">
						<img src="static/test/right.png" alt="" />
					</i>
				</div>
			</router-link>
			<!--<router-link tag="div" to="/myself/feedback" class="list clearfix">
				<div class="list_img">
					<img src="static/test/fk.png" alt="" />
				</div>
				<div class="list_title">
					意见反馈
					<i class="list_i">
						<img src="static/test/right.png" alt="" />
					</i>
				</div>
			</router-link>-->
			<router-link tag="div" to="/myself/update" class="list clearfix">
				<div class="list_img">
					<img src="static/test/m3.png" alt="" />
				</div>
				<div class="list_title noborder_bottom">
					新版本检测
					<i class="list_i">
						<img src="static/test/right.png" alt="" />
					</i>
				</div>
			</router-link>
			<mt-button type="primary" class="login" @click="cancellation()">退出登录</mt-button>
		</div>
		<v-confirm v-show="flag">
			<div class="confirm_top">注销用户</div>
			<div class="confirm_center">您确定要注销当前账户吗</div>
			<div class="confirm_bottom_left" @click="changeshow()">确定</div>
			<div class="confirm_bottom_right" @click="cancelshow()">取消</div>
		</v-confirm>
		<router-view></router-view>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import vConfirm from '@/components/confirm/changeConfirm';
	import * as scoket from '@/common/util/webscokt.js';
	import { removeUsert } from '@/utils/auth'

	export default {
		components: {
			vConfirm
		},
		data() {
			return {
				websock: null,
				//显示注销弹窗
				flag: false,
				bookShow: false, //权限显示书架  -- 家长,
				manageShow: false, //权限显示设备管理 -- 园长
				name: this.$store.state.sysUser.name,
				avatar:''
			}
		},
		created() {
			this.init();
		},
		mounted() {
			this.$nextTick(function() {
				this.websock = this.$store.state.webSocket
			})
		},
		methods: {
			init() {
				if(this.$store.state.userType == 5) {
					this.bookShow = true;
				}
				if(this.$store.state.userType == 3) {
					this.manageShow = true;
				}
				this.avatar = imgURL + this.$store.state.sysUser.imageId;
				console.log(this.avatar)
			},
			changePW() {
				this.$router.push('/myself/changePW');
			},
			//路由-个人信息
			person() {
				this.$router.push('/myself/person');
			},
			//退出登录
			cancellation() {
				this.flag = true;
			},
			cancelshow() {
				this.flag = false;
			},
			changeshow() {
				//				this.$store.dispatch('LogOut',this.$store.state).then(()=>{
				//					if(this.websock){
				//					this.websock.close()
				//						
				//					}
				//
				//					this.$router.push({
				//						path: '/'
				//					})
				//				})

				if(this.websock) {
					this.websock.close()
				}
				removeUsert();
				this.$router.push('/login?guide=0')
				let info = plus.push.getClientInfo();
				if(info.clientid) {
					let params = new URLSearchParams();
					params.append('clientId', info.clientid)
					axios.post(address + 'push/api/loginOut', params).then(function(res) {
						console.log(res)
					})
				}
			}

		},
		watch: {
			$route(to) {
				if(to.path == '/myself/update') {
					Toast({
						message: '您目前是最新版本',
						duration: 2000
					})
					this.$router.push("/myself")
				}

			}
		}
	}
</script>

<style scoped>
	.wrap{
		padding-top: 0;
	}
	.mint-header {
		width: 100%;
		line-height: 3rem;
		text-align: center;
		color: #fff;
		font-weight: normal;
	}
	
	.person_bg {
		height: 15rem;
		background: url('../../../static/test/ezh_bg03.png') no-repeat center;
		background-size: 100% 15rem;
		text-align: center;
		margin-top: -0.1rem;
	}
	
	.person_bg img {
		display: inline-block;
		width: 5.6rem;
		height: 5.6rem;
		border-radius: 50%;
		margin-top: 3rem;
		border: 0.3rem solid #ebe8e8;
	}
	
	.person_bg p {
		color: #fff;
		font-size: 1.4rem;
		line-height: 3rem;
	}
	
	.list {
		background: #fff;
	}
	
	.list .list_img {
		float: left;
		margin: 0.8rem 1rem 0.5rem 1rem;
	}
	
	.list .list_img img {
		display: inline-block;
		width: 2rem;
		height: 2rem;
	}
	
	.list .list_title {
		display: inline-block;
		border-bottom: 1px solid #efeded;
		width: 25rem;
		color: #7c807c;
		font-size: 1.2rem;
		line-height: 3.8rem;
		position: relative;
	}
	
	@media only screen and (min-width: 320px) {
		.list .list_title {
			width: 22rem;
		}
	}
	
	@media only screen and (min-width:340px) {
		.list .list_title {
			width: 23rem;
		}
	}
	
	@media only screen and (min-width:360px) {
		.list .list_title {
			width: 25rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.list .list_title {
			width: 26rem;
		}
	}
	
	@media only screen and (min-width:414px) {
		.list .list_title {
			width: 27rem;
		}
	}
	
	.list .list_title i,
	.list .list_title i img {
		display: inline-block;
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.list .list_title i {
		position: absolute;
		right: 0;
		top: 1rem;
	}
	
	.list .list_title i img {
		vertical-align: top;
	}
	
	.login {
		width: 70%;
		margin: 2rem 0 3rem 15%;
		font-size: 1.2rem;
		height: 3rem;
		line-height: 3rem;
	}
	
	.mint-button--primary {
		background-color: #ff7800;
	}
</style>