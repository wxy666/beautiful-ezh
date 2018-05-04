<template>
	<transition name="slideX">
		<div class="resetPW child">
			<mt-header fixed title="重置密码">
				<router-link to="/login/forgetPw" slot="left">
					<mt-button icon="back">关闭</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<div class="numList clearfix">
					<span>手机号:</span>
					<input type="text" v-model="mobile"/>
				</div>
				<div class="numList clearfix">
					<span>新密码:</span>
					<input type="password" v-model="newVal" />
				</div>
				<mt-button  type="primary" size="small" class="next" @click="next()">确定</mt-button>
				
			</div>
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				newVal:'',
				mobile:''
			}
		},
		methods:{
			next(){
				let self = this;
				let params = new URLSearchParams();
				params.append('mobile', this.mobile);
				params.append('newPassword', this.newVal);
				axios.post(address + 'index/api/resetPwd', params).then(function(res) {
					console.log(res)
					if(res.data.code !=0){
						Toast({
						message: res.data.msg,
						duration: 2000
						})
					}else{
					self.$router.push('/login')
					}
				}).catch(function(err) {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.resetPW{
		background:#ebebeb;
	}
	.numList{
		background: #fff;
		padding: 1rem 0.5rem;
	}
	.numList span{
		display: inline-block;
		float: left;
		font-size: 1.4rem;
		line-height: 3rem;
		margin-right: 1rem;
		
	}
	.numList input{
		display: inline-block;
		width: 20rem;
		float: left;
		height: 2rem;
		line-height: 2rem;
		margin-top: 0.4rem;
		outline: none;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		font-size: 1.2rem;
	}
	.next {
		width: 90%;
		font-size: 1.4rem;
		margin-top: 5rem;
		height: 3rem;
		line-height: 3rem;
	}
</style>