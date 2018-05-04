<template>

	<transition name="slideY">
		<div class="detail_person child">
			<mt-header fixed title="个人信息">
				<div class="mint-header-button is-left" @click="getlinkback()" slot="left">
					<mt-button icon="back"></mt-button>
				</div>
			</mt-header>
			<div class="wrap">
				<div class="detail_person_img">
					<img class="targetImg" id="preview" :src="targetImg" onerror="src='static/test/person.png'" alt="" />
					<i class="ca" @click="camera()">
						<img src="static/test/ca.png" alt="" />
					</i>
					<input id="File2" runat="server" @change="changes($event)" type="file" accept="image/*" multiple="multiple" capture="camera" style="display:none" />
				</div>
				<div class="detail_person_list clearfix">
					<span>姓&nbsp;&nbsp;&nbsp;&nbsp;名</span>
					<p>{{name}}</p>
				</div>
				<div class="detail_person_list  clearfix">
					<span>手机号</span>
					<p class="noborder_bottom">{{mobile}}</p>
				</div>
				<div style="height: 1rem;"></div>
				<div class="detail_person_list clearfix">
					<span>身&nbsp;&nbsp;&nbsp;&nbsp;份</span>
					<p>{{identity}}</p>
				</div>
				<div class="detail_person_list clearfix">
					<span>学&nbsp;&nbsp;&nbsp;&nbsp;校</span>
					<p>{{school}}</p>
				</div>
				<div class="detail_person_list clearfix ">
					<span>班&nbsp;&nbsp;&nbsp;&nbsp;级</span>
					<p class="noborder_bottom">{{className}}</p>
				</div>
				<p class="warn_p">若信息有误,请联系学校管理员变更</p>
			</div>
			<router-view></router-view>
		</div>

	</transition>
</template>

<script>
	export default {
		data() {
			return {
				sysUser: {},
				name: '',
				mobile: '',
				identity: '',
				school: '',
				className: '',
				targetImg: 'static/test/person.png'
			}
		},
		computed: {
//			getParentLink() {
//				// 动态获取父路由
//				console.log( this.$route.path.substring(this.$route.path.indexOf('/'), this.$route.path.lastIndexOf('/')))
//				return this.$route.path.substring(this.$route.path.indexOf('/'), this.$route.path.lastIndexOf('/'));
//			}
		},
		created() {
			this.init();
		},
		methods: {
			getlinkback(){
				return this.$router.back(-1)
			},
			camera() {
				document.getElementById('File2').click()

			},
			init() {
				let self = this;
				this.$nextTick(function() {
					console.log('sysuser这里', self.$store.state.sysUser)
					console.log('comeon！', self.$store.state.userType)
					self.targetImg = imgURL+self.$store.state.sysUser.imageId;
					self.sysUser = self.$store.state.sysUser;
					self.mobile = self.sysUser.mobile;
					self.school = self.sysUser.office.name;
					if(self.sysUser.avatar != null) {
						self.targetImg = self.sysUser.avatar;
					}
					if(self.$store.state.userType == 3) {
						self.name = self.sysUser.name + '园长';
						self.identity = '园长';

					} else if(self.$store.state.userType == 4) {
						self.name = self.sysUser.name + '教师';
						self.identity = '教师';
						self.className = self.sysUser.cclass.name;
					} else if(self.$store.state.userType == 5) {
						self.name = self.sysUser.name + '家长';
						self.identity = '家长';
						self.className = self.sysUser.cclass.name;

					}
				})

			},
			changes(e) {
				var fileObj = e.currentTarget;
				console.log(e)
				console.log(e.currentTarget)
				var windowURL = window.URL || window.webkitURL;
				var dataURL;
				var $img = document.getElementById("preview");
				if(fileObj && fileObj.files && fileObj.files[0]) {
					dataURL = fileObj.files[0];
					this.targetImg = windowURL.createObjectURL(fileObj.files[0]);
					this.getImg(dataURL);
				}
			},
			getImg(files) {
				let self = this;
				//图片这里用new FormData()
				 let params = new FormData()
				params.append('userId', this.$store.state.sysUser.id)
				params.append('type', 'photo');
				params.append('file', files);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				axios.post(address + 'index/api/uploadPic', params,config).then(function(res) {
					console.log('上传图片成功返回===》', res)
					if(res.data.code == 0){
//						self.targetImg = imgURL+ res.data.data;
					setTimeout(function(){
						self.$store.state.sysUser.imageId = res.data.data;
//					self.targetImg = imgURL+self.$store.state.sysUser.imageId;
					},1000)
					

					}
				})
			}
		}
	}
</script>

<style scoped>
	.detail_person_img {
		width: 100%;
		height: 10rem;
		background: #fff;
		position: relative;
		margin-bottom: 1rem;
		background: url('../../../static/test/ezh_bg03.png') no-repeat center;
		background-size: 100% 10rem;
	}
	
	.detail_person_img .targetImg {
		display: inline-block;
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 2rem;
		margin-left: -3rem;
		border: 0.3rem solid #ebe8e8;
		background: #fff;
	}
	
	.detail_person_img .ca,
	.detail_person_img .ca img {
		display: inline-block;
		width: 2rem;
		height: 2rem;
	}
	
	.detail_person_img .ca {
		position: absolute;
		left: 66%;
		top: 4.3rem;
		margin-left: -1rem;
	}
	
	.detail_person_list {
		background: #fff;
		line-height: 3rem;
	}
	
	.detail_person_list span {
		float: left;
		font-size: 1.2rem;
		color: #7c807c;
		margin: 0 1rem;
	}
	
	.detail_person_list p {
		display: inline-block;
		float: left;
		width: 23rem;
		border-bottom: 1px solid #ededed;
		text-align: right;
		color: #949494;
		font-size: 1.1rem;
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
			width: 23rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.detail_person_list p {
			width: 24rem;
		}
	}
	
	@media only screen and (min-width:414px) {
		.detail_person_list p {
			width: 25rem;
		}
	}
	
	.warn_p {
		text-align: center;
		line-height: 3rem;
		color: #a59b9b;
		font-size: 1.2rem;
	}
</style>