<template>
	<transition name="slideY">
		<div class="changePW child">

			<mt-header fixed title="修改密码">
				<router-link to="/myself" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>

			</mt-header>
			<!--修改密码列表-->
			<div class="wrap">
				<div class="common_list clearfix">
					<span class="common_list_left">
						原密码:
					</span>
					<div class="common_list_right">
						<input class="inputStyle" ref="oldPS" type="password" placeholder="请输入原密码" />
					</div>
				</div>
				<div class="common_list clearfix">
					<span class="common_list_left">
						新密码:
					</span>
					<div class="common_list_right">
						<input class="inputStyle" ref="newPS" type="password" placeholder="请输入新密码" />
					</div>
				</div>
				<div class="common_list clearfix">
					<span class="common_list_left">
						确认密码:
					</span>
					<div class="common_list_right">
						<input class="inputStyle" ref="confirmPS" type="password" placeholder="请再次输入新密码" />
					</div>
				</div>
				<mt-button type="primary" class="save" @click.native="savePs()">保存</mt-button>
			</div>
			<v-confirm v-show="show">
				<div class="confirm_top">提示</div>
				<div class="confirm_center">{{strs}}</div>
				<div class="confirm_bottom" @click="changeshow()">确定</div>
			</v-confirm>
		</div>
	</transition>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	import { removeUsert } from '@/utils/auth'
	import vConfirm from '@/components/confirm/changeConfirm';
	export default {
		components: {
			vConfirm
		},
		data() {
			return {
				websock: null,
				show: false,
				strs: ''
			}
		},
		created() {},
		methods: {
			savePs() {
				let self = this;
				if(this.$refs.oldPS.value == '' || this.$refs.newPS.value == '' || this.$refs.confirmPS.value == '') {
					this.strs = '信息填写不全'
					this.show = true;
				}else if(this.$refs.oldPS.value != '' && this.$refs.newPS.value != '' && this.$refs.confirmPS.value != this.$refs.newPS.value) {
					this.strs = '两次密码不一致'
					this.show = true;
				}else {
					let params = new URLSearchParams();
					params.append('userId', this.$store.state.userId);
					params.append('password', this.$refs.oldPS.value);
					params.append('newPassword', this.$refs.newPS.value);
					params.append('accessToken', this.$store.state.token);
					params.append('refreshToken', this.$store.state.refresh_token);
					axios.post(address + 'index/api/updatePwd', params).then(function(res) {
						console.log(res)
						if(res.data.code != 0) {
							Toast({
								message: res.data.msg,
								duration: 2000
							})
						} else {
							//							self.$store.dispatch('LogOut', self.$store.state).then(() => {
							//								if(self.websock) {
							//									self.websock.close()
							//								}
							//								self.$router.push({
							//									path: '/'
							//								})
							//							})
							if(self.websock) {
								self.websock.close()
							}
							removeUsert();
							self.$router.push({
								path: '/'
							})
							let info = plus.push.getClientInfo();
							if(info.clientid) {
								let params1 = new URLSearchParams();
								params1.append('clientId', info.clientid)
								axios.post(address + 'push/api/loginOut', params1).then(function(res) {
									console.log(res)
								})
							}
						}
					}).catch(function(err) {
						console.log(err)
					})
				}

			},
			changeshow() {
				this.show = false;
			}
		}
	}
</script>

<style scoped>
	.inputStyle {
		width: 99%;
		height: 3rem;
		line-height: 3rem;
		border: none;
		color: #949494;
		border-bottom: 1px solid #ededed;
		box-sizing: border-box;
	}
	
	.save {
		width: 70%;
		margin: 5rem 0 0 15%;
	}
	
	.showed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.common_list {
		height: 4rem;
		line-height: 4rem;
	}
	
	.common_list_left {
		font-size: 1.2rem;
	}
	
	input::-webkit-input-placeholder {
		color: #C6C6C6;
		font-size: 1.2rem;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #949494;
		font-size: 1.2rem;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #949494;
		font-size: 1.2rem;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #949494;
		font-size: 1.2rem;
	}
	
	@media only screen and (min-width:320px) {
		.common_list_right {
			width: 20rem;
		}
	}
	
	@media only screen and (min-width:340px) {
		.common_list_right {
			width: 22rem;
		}
	}
	
	@media only screen and (min-width:360px) {
		.common_list_right {
			width: 23rem;
		}
	}
	
	@media only screen and (min-width:375px) {
		.common_list_right {
			width: 24rem;
		}
	}
	
	@media only screen and (min-width:414px) {
		.common_list_right {
			width: 24rem;
		}
	}
</style>