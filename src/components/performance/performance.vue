<template>
	<transition name="slideY">
		<div class="performance child">
			<mt-header fixed title="发表现">
				<router-link to="/interact" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<!--<router-link tag="div" to="/interact/performance/selectPeople" class="sendOut clearfix">
					<span>受评同学:</span>
					<p class="sendOutWho">
						{{slname}}
					</p>
					<i class="list_i">
						<img src="static/test/right02.png" alt="">
					</i>
				</router-link>-->
				<div class="good clearfix">
					<div class="good_list" v-for="(item,index) in goodList" @click="showAction(index)">
						<img :src="item.img" alt="" />
						<p>{{item.test}}</p>
					</div>

				</div>
				<!--信息框-->
				<textarea class="sendText" v-model="talk" placeholder="请输入评语内容"></textarea>
				<mt-button class="sendBtn" type="primary" @click="send">发送</mt-button>
				<mt-actionsheet :actions="menus1" v-model="show1" cancelText="自己填写">
				</mt-actionsheet>
				<mt-actionsheet :actions="menus2" v-model="show2" cancelText="自己填写">
				</mt-actionsheet>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	//	import { Actionsheet } from 'mint-ui';
	import * as scoket from '@/common/util/webscokt.js'
	import { Toast } from 'mint-ui';
	export default {
		components: {},
		data() {
			return {
				slname: '请选择联系人',
				websock: null,
				talk: '',
				officeid: this.$store.state.officeId,
				from: this.$store.state.name,
				texts: '',
				goodList: [{
						test: '非常好',
						img: 'static/test/good1.png'
					},
					{
						test: '继续努力',
						img: 'static/test/good2.png'
					}
				],
				menus1: [{
						name: '是小朋友们学习的榜样！',
						method: this.getStr
					},
					{
						name: '热心积极，是老师的小助手！',
						method: this.getStr
					},
					{
						name: '爱分享，总能得到小伙伴的赞许！',
						method: this.getStr
					},
					{
						name: '能主动跟老师同伴交流了，真棒！',
						method: this.getStr
					},
					{
						name: '进步之快，令老师刮目相看！',
						method: this.getStr
					}
				],
				menus2: [{
						name: '要是能养成良好的午睡习惯就更棒了！',
						method: this.getStr
					},
					{
						name: '大胆些、努力些、努力做老师的小帮手！',
						method: this.getStr
					},
					{
						name: '如果学会谦让，你将更完美！',
						method: this.getStr
					},
					{
						name: '有问题主动跟老师同学交流哦！',
						method: this.getStr
					},
					{
						name: '勇敢的孩子不掉“小金豆”！',
						method: this.getStr
					}
				],
				show1: false,
				show2: false
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
				console.log(this.websock);
				if(this.websock == null) {
					getWebsoket();
				}
				this.websock.onmessage = this.websocketonmessage;
			})
		},
		methods: {
			showAction(index) {

				if(index == 0) {
					this.show1 = true;
				} else {
					this.show2 = true;
				}
			},
			getStr(target) {
				this.talk = target.name;
			},
			init() {
				this.slname = this.$route.params.selectName
			},
			send() {
				let self = this;
				//				let chatType = self.slname.split(',').length > 1 ? 'GROUP' : 'SIGNLE';
				//				console.log(chatType)
				if(self.talk != '') {
					self.websock.send(JSON.stringify({
						message: {
							room: 1,
							group: 1,
							chatType: 'GROUP',
							msgType: 'TEXT',
							content: 'bx' + self.talk,
							from: self.from,
							to: '', //接收人,如果没有则置空,如果有多个接收人则用,分隔						
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
					
					self.talk = '';
				} else {
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
				console.log('表现接收', e)
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
		min-height: 5rem;
		border: none;
		resize: none;
		outline: none;
		padding: 1rem 0;
		text-indent: 1rem;
	}
	
	.sendBtn {
		width: 90%;
		margin: 2rem 0 0 5%;
	}
	
	.good {
		border-bottom: 1px solid #efeded;
		background: #fff;
		padding: 1rem 0;
		text-align: center;
	}
	
	.good_list {
		float: left;
	}
	
	.good_list img {
		display: inline-block;
		width: 5rem;
		height: 5rem;
	}
	
	.good_list:first-child {
		margin-left: 6rem;
		margin-right: 3rem;
	}
	
	@media only screen and (min-width:375px) {
		.good_list:first-child {
			margin-left: 10rem;
			margin-right: 3rem;
		}
	}
	
	@media only screen and (min-width:414px) {
		.good_list:first-child {
			margin-left: 11rem;
			margin-right: 3rem;
		}
	}
</style>