<template>
	<transition name="slideX">
		<div class="contactdetail child" ref="contactdetail">
			<mt-header fixed title="个人信息">
				<router-link to="/maillist" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>

			</mt-header>
			<div class="wrap">
				<div class="person_bg">
					<img :src="avatar" onerror="src='static/test/person.png'" alt="" />
					<p>{{username}}</p>
				</div>
				<div class="detail_person_list clearfix">
					<span>手&nbsp;&nbsp;&nbsp;&nbsp;机</span>
					<p>{{mobile}}</p>
				</div>
				<div class="detail_person_list clearfix">
					<span>班&nbsp;&nbsp;&nbsp;&nbsp;级</span>
					<p>{{userclass}}</p>
				</div>
				<div class="detail_person_list clearfix ">
					<span>身&nbsp;&nbsp;&nbsp;&nbsp;份</span>
					<p class="noborder_bottom">{{usertypename}}</p>
				</div>
				<div class="profile">
					<div class="weixin" @click="mes()">
						<i class="iconfont icon-weixintubiao"></i>
						<span>聊天</span>
					</div>
					<div class="tel">
						<i class="iconfont icon-weibiaoti-"></i>
						<span @click="showAction">致电</span>
					</div>
				</div>
			</div>
			<mt-actionsheet :actions="menus1" v-model="show1" cancelText="取消">
			</mt-actionsheet>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				showFlag: false,
				menus1: [{
						name: '13601000003',
						method: this.getStr
					},
					{
						name: '拨打电话',
						method: this.getStr
					}
				],
				show1: false,
				username: '',
				mobile: '',
				userclass: '',
				usertypename: '',
				loginName:'',
				id:'',
				clientId:'',
				avatar:''
			}
		},
		created() {
			this.init();
			console.log('获取到了', this.$store.state.sysUser)
			//			this.username = this.$store.state.sysUser.username;
			//			this.mobile = this.$store.state.sysUser.mobile;
			//			this.userclass = this.$store.state.sysUser.username;
			//			this.usertypename = this.$store.state.sysUser.username;
		},
		methods: {
			init() {
				let self = this;
				axios.get(address + 'index/api/getUserInfo', {
					params: {
						userId: self.$route.query.id
					}
				}).then(function(res) {
					console.log('111', res)
					if(res.data.code == 0) {
						self.loginName = res.data.data.loginName;
						self.username = res.data.data.name;
						self.mobile = res.data.data.mobile;
						if(res.data.data.userConfig!=null){
							self.clientId=res.data.data.userConfig.clientId;
						}
						if(res.data.data.cclass == null){
							self.userclass="暂无"
						}else{
						self.userclass = res.data.data.cclass.name;
						}
						self.id = res.data.data.id;
						if(res.data.data.userType == 3) {
							self.usertypename = '园长'
						} else if(res.data.data.userType == 4) {
							self.usertypename = '教师'
						} else if(res.data.data.userType == 5) {
							self.usertypename = '家长'
						}
						self.avatar = imgURL+res.data.data.imageId;
						self.menus1 = [{
								name: self.mobile,
								method: self.getStr
							},
							{
								name: '拨打电话',
								method: self.getStr
							}
						]
					}
				})
			},
			hide() {
				this.$router.back(-1)
			},
			change(value) {
				this.value = value
			},
			showAction() {
				this.show1 = true;
			},
			getStr(target) {
				window.location.href = 'tel://'+this.mobile
			},
			mes(){
				this.$router.push('/Recommond/maillist/contactDetails/mailsingle?name='+this.username+'&test=' + this.loginName+'&id='+this.id+'&clientId='+this.clientId)
			}
		}
	}
</script>

<style scoped="scoped">
	.person_bg {
		height: 15rem;
		background:url('../../../static/test/ezh_bg03.png') no-repeat center;
		background-size: 100% 15rem;
		text-align: center;
		margin-top: -0.1rem;
		margin-bottom: 1.2rem;
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
	
	.detail_person_list {
		background: #fff;
		line-height: 3rem;
	}
	
	.detail_person_list span {
		float: left;
		font-size: 1.2rem;
		color: black;
		margin: 0 1rem;
	}
	
	.detail_person_list p {
		display: inline-block;
		width: 25rem;
		border-bottom: 1px solid #ededed;
		text-align: left;
		color: #949494;
		font-size: 1.1rem;
	}
	
	.profile {
		margin-top: 1.2rem;
		background: #FFFFFF;
		height: 3rem;
		line-height: 3rem;
		font-size: 0;
	}
	
	.profile div {
		display: inline-block;
		width: 50%;
		text-align: center;
	}
	
	.profile span {
		font-size: 1.4rem;
		color: #f6a305;
		margin-left: 0.5rem;
	}
	
	.weixin i {
		font-size: 20px;
		color: #f6a305;
	}
	
	.tel i {
		font-size: 1.6rem;
		color: #fb7065;
	}
	@media only screen and (min-width:320px) {
		.detail_person_list p {
			width: 20rem;
		}
	}
	@media only screen and (min-width:340px) {
		.detail_person_list p {
			width: 22rem;
		}
	}
	@media only screen and (min-width:360px) {
		.detail_person_list p {
			width: 24rem;
		}
	}
	@media only screen and (min-width:375px) {
		.detail_person_list p {
			width: 25rem;
		}
	}
	@media only screen and (min-width:414px) {
		.mail_item div {
			width: 26rem;
		}
	}
</style>