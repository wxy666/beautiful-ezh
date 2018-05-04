<template>
	<transition name="slideY">
		<div class="forgetPW child">
			<mt-header fixed title="找回密码">
				<router-link to="/login" slot="left">
					<mt-button icon="back">关闭</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<div class="forgetPW_phone" style="margin:0.5rem 0 0.5rem 0">
					<input type="text" v-model="num" />
				</div>
				<div class="forgetPW_yzm">
					<input type="text" v-model="ma" />
					<mt-button :disabled="!show" type="primary" size="small" class="save" @click="getnum()">{{mes}}</mt-button>
				</div>
				<mt-button  type="primary" size="small" class="next" @click="next()">下一步</mt-button>

			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui';
	const TIME_COUNT = 60;
	const self = this;
	export default {

		data() {
			return {
				num: '',
				show: true,
				count: '',
				timer: null,
				mes: '获取验证码',
				ma:''
			}
		},
		methods: {
			getnum() {
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.num)) {
					Toast({
						message: '手机号格式不对',
						duration: 2000
					})
				} else {
					let self =this;
					let params = new URLSearchParams();
					params.append('mobile', this.num);
					axios.post(address + 'index/api/forgetPwd', params).then(function(res) {
						console.log(res)
						self.count = TIME_COUNT;
						self.show = false;
						self.timer = setInterval(() => {
							if(self.count > 0 && self.count <= TIME_COUNT) {
								self.count--;
								self.mes = self.count + 's后再次获取'
							} else {
								self.show = true;
								clearInterval(self.timer);
								self.timer = null;
								self.mes = '获取验证码'
							}
						}, 1000)

					}).catch(function(err) {
						console.log(err)
					})
				}

			},
			next() {
					let self =this;
				
				//				this.$router.push('/login/forgetPW/resetPW')
				let params = new URLSearchParams();
				params.append('mobile', this.num);
				params.append('code', this.ma);
				axios.post(address + 'index/api/telsmsValid', params).then(function(res) {
					console.log(res)
					if(res.data.code !=0){
						Toast({
						message: res.data.msg,
						duration: 2000
						})
					}else{
						self.$router.push('/login/forgetPW/resetPW')
					}
					

				}).catch(function(err) {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.forgetPW_phone input {
		border: none;
		line-height: 3rem;
		width: 95%;
		margin: 0 auto;
		border-radius: 0.5rem;
		text-indent: 1rem;
		font-size: 1.2rem;
	}
	.forgetPW{
		background:#ebebeb;
	}
	.forgetPW_yzm {
		width: 95%;
		margin: 0 auto;
	}
	
	.forgetPW_yzm input {
		display: inline-block;
		width: 10rem;
		line-height: 3rem;
		float: left;
		border: none;
		border-radius: 0.5rem;
		text-indent: 1rem;
		font-size: 1.2rem;
		
	}
	
	.forgetPW_yzm .save {
		float: left;
		margin-left: 1rem;
		height: 3rem;
		font-size: 1.4rem;
	}
	
	.next {
		width: 90%;
		font-size: 1.4rem;
		height: 3rem;
		line-height: 3rem;
		margin-top: 5rem;
	}
</style>