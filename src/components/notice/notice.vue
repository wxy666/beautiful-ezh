<template>
	<transition name="slideY">
		<div class="mainsingle child">
			<mt-header fixed title="发通知">
				<router-link to="/interact" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<!--<router-link tag="div" to="/interact/notice/selectPeople" class="sendOut clearfix">
					<span>发送给:</span>
					<p class="sendOutWho">
						{{slname}}
					</p>
					<i class="list_i">
						<img src="static/test/right02.png" alt="">
					</i>
				</router-link>-->
				<!--信息框-->
				<textarea class="sendText" placeholder="请输入内容..." v-model="talk">
				</textarea>
				<mt-button class="sendBtn" @click="send" type="primary">发送</mt-button>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import {Toast} from 'mint-ui';
	import * as scoket from '@/common/util/webscokt.js'
	
	export default {
		data() {
			return {
				slname: '请选择联系人',
				websock: null,
				talk: '',
				messages: '',
				officeid: this.$store.state.officeId,
				from: this.$store.state.name,
			}
		},
		created() {

		},
		watch: {
			'$route': ['init']
		},
		mounted() {
			this.$nextTick(function() {
				this.websock = this.$store.state.webSocket
				if(this.websock == null) {
					getWebsoket();
				}
				console.log(this.websock);
				this.websock.onmessage = this.websocketonmessage;
			})
		},
		methods: {
			init() {
				this.slname = this.$route.params.selectName
			},
			send() {
				
					let self = this;
//				let chatType = self.slname.split(',').length > 1 ? 'GROUP' : 'SIGNLE';
				if(self.talk != '') {
					self.websock.send(JSON.stringify({
						message: {
							room: 1,
							group: 1,
							chatType: 'GROUP',
							msgType: 'TEXT',
							content: 'tz'+self.talk,
							from: self.from,
							to:'', //接收人,如果没有则置空,如果有多个接收人则用,分隔						
							time: this.getDateFull
						},
						type: "message"
					}));
					let params = new URLSearchParams();
					params.append('userId', self.$store.state.userId)
					params.append('title', '一纸鹤')
					params.append('text', self.talk)
					axios.post(address + 'push/api/pushNoticeShow', params).then((res) => {
						console.log(res)
					})
					Toast({
					  message: '发送成功！',
					  duration: 2000
					})
					self.talk = ''
				}else{
					Toast({
					  message: '发送内容不能为空！',
					  duration: 2000
					})
				}
				
			},
			getWebsoket() {
				this.websock = scoket.init()
				//scoket.setWs(this.websock)
				this.$store.dispatch('setScoket', this.websock)
			},
			websocketonmessage(e) {
				console.log('通知列表接收', e)
			},
			websocketsend(agentData) { //数据发送
				this.websock.send(agentData);
			},
			//获取当前发送时间
			getDateFull() {
				var date = new Date();
				var currentdate = date.getFullYear() + "-" + appendZero(date.getMonth() + 1) + "-" + appendZero(date.getDate()) + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes()) + ":" + appendZero(date.getSeconds());
				return currentdate;
			}
		}
	}
</script>

<style scoped>
	.sendOut {
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		background: #fff;
		position: relative;
		border-bottom: 1px solid #efeded;
	}
	
	.sendOut span {
		margin: 0 1rem;
		font-size: 1.2rem;
	}
	
	.sendOut p {
		display: inline-block;
		color: #b4b6b4;
		font-size: 1.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 60%;
		vertical-align: top;
	}
	
	.sendOut .list_i,
	.sendOut .list_i img {
		display: inline-block;
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.sendOut .list_i {
		position: absolute;
		top: 1.2rem;
		right: 1rem;
	}
	
	.sendOut .list_i img {
		vertical-align: top;
	}
	
	.sendText {
		display: inline-block;
		width: 100%;
		min-height: 8rem;
		border: none;
		resize: none;
		outline: none;
		padding: 1rem 0;
		text-indent: 1rem;
	}
	
	.sendBtn {
		width: 90%;
		margin: 5rem 0 0 5%;
	}
</style>