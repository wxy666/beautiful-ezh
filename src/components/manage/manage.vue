<template>
	<transition name="slideY">
		<div class="manage child">
			<mt-header fixed title="摄像头">
				<router-link to="/myself" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>

			</mt-header>
			<div class="mailDiv">
				<scroll class="mailHeight">
					<div>
						<div class="monitor_list clearfix" v-for="item in getData">
							<div class="monitor-left">
								<img src="static/test/sxt.png" alt="" />
								<div class="allSelect">
									<input type="radio" value="1" :name="item.id" :checked="item.status == 1" @change="changes($event,item)" /><label >关闭</label>
									<input type="radio" value="0" :name="item.id"  :checked="item.status == 0" @change="changes($event,item)"  /><label >正常</label>
								</div>
							</div>
							<div class="monitor-right">
								<p>设备编码: <span>{{item.deviceId}}</span></p>
								<div class="name">
									<span>班级：{{item.officeName}}</span>
								
								</div>
								<div class="name">
									<div @click="trigger($event)" class="inp_pev">
										<span>{{item.name}}</span>
										<i></i>
									</div>
									<div class="inp" >
										<input type="text" v-model="item.name"/>
										<button class="t1" @click="sendMes(item,$event)">确定</button>
										<button class="t2" @click="trigger2($event)">取消</button>
									</div>
									
								</div>
							</div>
						</div>

					</div>
				</scroll>
			</div>

		</div>
	</transition>

</template>

<script>
	import { Toast } from 'mint-ui';
	import Scroll from '@/base/scroll/scroll';
	export default {
		data() {
			return {
				userId: this.$store.state.userId,
				getData: [],
				value:false,
				
			}
		},
		created() {
			this.init()
		},
		components: {
			Scroll
		},
		methods: {
			init() {
				let self = this;
				this.$nextTick(function() {
					axios.get(address + 'index/api/monitorList', {
						params: {
							userId: self.userId
						}
					}).then(function(res) {
						if(res.data.code == 0) {
							self.getData = res.data.data
						}else{
							Toast({
							message: res.data.msg,
							duration: 2000
						})
						}
					}).catch(function(err) {
						Toast({
							message: err,
							duration: 2000
						})
						
					})
				})
			},
			changes(obj,item){
				let stus = obj.target.attributes.value.value;
				let  params = new URLSearchParams();
				params.append('userId',this.$store.state.userId);
				params.append('monitorId',item.id);
				params.append('monitorStatus',stus);
				axios.post(address+'index/api/updateMonitor',params).then((res)=>{
					if(res.data.code == 0){
						this.init()
					}
				})
			},
			trigger(obj){
				let  tardiv = obj.target.parentNode.parentNode.children[1];
				tardiv.style.display="block";
				obj.target.parentNode.style.display="none";
			},
			trigger2(obj){
				let tardiv = obj.target.parentNode.parentNode.children[0];
				tardiv.style.display="block";
				obj.target.parentNode.style.display="none";
			},
			sendMes(item,$event){
				let  params = new URLSearchParams();
				params.append('userId',this.$store.state.userId);
				params.append('monitorId',item.id);
				params.append('monitorName',item.name);
				axios.post(address+'index/api/updateMonitor',params).then((res)=>{
					if(res.data.code == 0){
						this.init()
						this.trigger2($event)
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
		bottom: 0;
		width: 100%;
	}
	
	.mailHeight {
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.mint-tab-container-item {
		margin-top: 0.2rem;
	}
	
	.monitor_list {
		background: #fff;
		padding: 1rem 0;
		margin-bottom: 0.5rem;
	}
	
	.monitor_list .monitor-left {
		float: left;
		margin: 0 0.5rem;
		margin-right: 1rem;
		text-align: center;
	}
	
	.monitor-left img {
		display: inline-block;
		width: 4rem;
		height: 4rem;
		margin-bottom: 0.5rem;
	}
	
	.monitor-left p {
		text-align: center;
		color: #676565;
	}
	
	.monitor-right {
		float: left;
	}
	
	.monitor-right p {
		margin-bottom: 1rem;
		color: #676565;
		font-size: 1.1rem;
	}
	
	.monitor-right .name {
		margin-bottom: 0.5rem;
		color: #676565;
		font-size: 1.1rem;
	}
	
	.monitor-right .name span {
		display: inline-block;
		line-height: 2rem;
	}
	
	.monitor-right .name i,
	.monitor-right .Input i {
		vertical-align: top;
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url('../../../static/test/bj.png') no-repeat center -3px;
		background-size: 100% 100%;
	}
	
	.monitor-right .Input {}
	
	@media only screen and (max-width:360px) {
		.monitor-right .monitor_input {
			display: inline-block;
			width: 20rem;
			height: 1.6rem;
			border: 1px solid #ccc;
		}
	}
	
	.monitor-right .monitor_input {
		display: inline-block;
		width: 22rem;
		height: 1.6rem;
		border: 1px solid #ccc;
	}
	
	@media only screen and (min-width: 320px) {
		.monitor-right .monitor_input {
			width: 18rem;
		}
	}
	
	@media only screen and (min-width: 375px) {
		.monitor-right .monitor_input {
			width: 22rem;
		}
	}
	.allSelect input[type="radio"] {
		-webkit-appearance: none;
		/*清除复选框默认样式*/
		background: #fff;
		/*复选框的背景图，就是上图*/
		height: 2rem;
		/*高度*/
		vertical-align: middle;
		width: 2rem;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin-left: 0.2rem;
	}
	
	.allSelect input[type="radio"]:checked {
		background: #fff url('../../../static/test/right03.png') no-repeat;
		background-size: 100% 100%;
		border: 1px solid #fff;
	}
	
	.allSelect label {
		margin-left: 0.5rem;
		vertical-align: middle;
	}
	.inp_pev{
		height: 2rem;
	}
	.inp{
		display: inline-block;
		display: none;
	}
	.inp input{
		display: inline-block;
		outline: none;
		width: 8rem;
		height: 2rem;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		box-sizing: border-box;
	}
	.inp button{
		background: #fff;
		border: none;
		outline: none;
		border-radius: 0.2rem;
		height:2rem;
		width: 3rem;
		line-height:2rem;
		font-size: 1.1rem;
		color: #323232;		
		background: #fb7065;
		margin-right: 0.3rem;
		box-sizing: border-box;
	}
	.inp .t1{
		color: #fff;
	}
	.inp .t2{
		background: #ccc;
	}
</style>