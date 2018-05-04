<template>
	<transition name="slideY">
		<div class="mainsingle child">
			<mt-header fixed :title="gname">
				<div class="mint-header-button is-left" @click="getlinkback()" slot="left">
					<mt-button icon="back">返回</mt-button>
				</div>
			</mt-header>
			<div class="mainBox">
				<scroll :data="maillist" :bottom="true" :pulldown="true" @scrollToEnd="scrollToEnd" class="mainBox_1" ref="scrolls">
					<div class="clearfix">
						<div class="mainbox_2_list clearfix" :class="item.align" v-for="item in maillist">
							<div class="basestyle">
								<div class="test">{{item.mes}}</div>
								<img class="list_img" :src="item.avatar" onerror="src='static/test/person.png'" alt="" />
							</div>
						</div>
					</div>
				</scroll>
				<div class="send clearfix">
					<mt-button type="primary" class="sendMes" @click="socket()">发送</mt-button>
					<input type="text" v-model="talk" placeholder="说点什么" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	import * as scoket from '@/common/util/webscokt.js'
	
	export default {
		data() {
			return {
				//遍历的数组
				maillist: [],
				maillist2: [],
				websock: null,
				//发送的信息内容
				talk: '',
				gname: this.$route.query.name,
				from: this.$store.state.name,
				to: this.$route.query.test,
				id: this.$route.query.id,
				messages: '',
				csh_scroll: {},
				OFFSET: 1,
				otherAvatar:'1111'
			}
		},
		components: {
			Scroll
		},
		computed: {
			queryTest() {
				return this.$route.query.test;
			}
		},
		created() {
			this.$nextTick(function() {
				this.csh_scroll = this.$refs.scrolls.$el.clientHeight;
				
				this.init();
			})
		},
		mounted() {
			this.$nextTick(function() {
				this.websock = this.$store.state.webSocket;
				this.websock.onmessage = this.websocketonmessage;
			})
		},
		methods: {
			scrollToEnd() {
				this.OFFSET++;
				console.log(this.OFFSET)
				this.init();
			},
			getAvatar() {
				let self =this;
				axios.get(address + 'index/api/getUserInfo', {
					params: {
						userId: this.id
					}
				}).then(function(res){

					self.otherAvatar = imgURL+res.data.data.imageId;

				})
			},
			init() {
				this.getAvatar();
				let self = this;

				console.log(this.csh_scroll, this.to, this.from)
				let params = new URLSearchParams();
				params.append('pageNum', self.OFFSET)
				params.append('pageSize', '10')
				params.append('from', self.from)
				params.append('to', self.to)
				axios.post(address3 + 'socket/msg/1/signle/msg', params).then((res) => {
//							console.log('历史记录',res.data)
					
					if(res.data.code == 0) {
//							console.log('历史记录',res.data)
						
						if(res.data.data != '') {
							self.maillist2 = [];
							console.log('历史记录',res.data)
							let getData = res.data.data;
							getData.forEach(function(v, k) {
								//								console.log(new Date(v.createTime))
								let target_obj1 = {
									align: 'right',
									mes: '',
									avatar:self.otherAvatar
								}
								if(v.from == self.from) {
									target_obj1 = {
										align: 'right',
										mes: JSON.parse(v.text)['message']['content'],
										avatar:imgURL+self.$store.state.sysUser.imageId
									}
								} else {
									target_obj1 = {
										align: 'left',
										mes: JSON.parse(v.text)['message']['content'],
										avatar:self.otherAvatar
									}
								}

								self.maillist2.push(target_obj1);
							})

							self.maillist = self.maillist2.concat(self.maillist);
						}
					}

				})
			},
			getlinkback() {
				return this.$router.back(-1);
			},
			socket() {
				let self = this;
				if(self.talk != '') {
					self.websock.send(JSON.stringify({
						message: {
							room: 1,
							group: 1, //或班级id
							chatType: 'SIGNLE',
							msgType: 'TEXT',
							content: self.talk,
							from: self.from,
							to: self.to, //接收人,如果没有则置空,如果有多个接收人则用,分隔
							time: this.getDateFull
						},
						type: "message"
					}));
					if(self.$route.query.clientId != '') {
						let params = new URLSearchParams();
						params.append('userId', self.$store.state.userId)
						params.append('clientId', self.$route.query.clientId)
						params.append('text', self.talk)
						axios.post(address + 'push/api/chatMessage', params).then((res) => {
							console.log(res)
						})
					}
				} else {
					return false;
				}
			},
			websocketonmessage(e) { //数据接收
				console.log('消息列表接受', e)
				let redata = JSON.parse(e.data);
				let target_obj = {
					align: 'right',
					mes: this.talk,
					avatar:this.otherAvatar
				}

				if(redata.message.from != undefined) {
					console.log(redata.message.from)
					if(redata.message.from == this.from) {
						target_obj.align = 'right';
						target_obj.mes = this.talk;
						target_obj.avatar = imgURL+this.$store.state.sysUser.imageId;
						this.maillist.push(target_obj);
						this.talk = '';
					} else {
						target_obj.align = 'left';
						target_obj.mes = redata.message.content;
						target_obj.avatar =self.otherAvatar;
						this.maillist.push(target_obj);
					}
					if(this.$refs.scrolls.scroll.scrollerHeight > this.csh_scroll) {
						this.$refs.scrolls.scrollTo(0, this.$refs.scrolls.scroll.maxScrollY - 50);

					}
				}
			},
			websocketsend(agentData) { //数据发送
				this.websock.send(agentData);
			},
			websocketclose(e) { //关闭
				console.log("connection closed (" + e.code + ")");
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
	.mainBox {
		position: absolute;
		top: 3.5rem;
		bottom: 4rem;
		width: 100%;
	}
	
	.mainBox_1 {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		padding-bottom: 4rem;
	}
	
	.send {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4rem;
		background: #fff;
		z-index: 500;
	}
	
	.send input {
		width: 20rem;
		line-height: 2.5rem;
		border-radius: 0.4rem;
		border: 1px solid #ccc;
		text-indent: 0.5rem;
		margin-top: 0.7rem;
		margin-right: 0.5rem;
		vertical-align: middle;
		float: right;
		font-size: 1.2rem;
	}
	
	.send .sendMes {
		vertical-align: bottom;
		background: #eae8e8;
		color: #464646;
		border: 1px solid #ccc;
		height: 2.5rem;
		line-height: 2.5rem;
		margin-top: 0.8rem;
		font-size: 1.2rem;
		float: right;
		margin-right: 0.5rem;
	}
	
	@media only screen and (min-width:375px) {
		.send input {
			width: 22rem;
		}
		.send .sendMes {
			font-size: 1.4rem;
		}
	}
	
	.mainbox_2_list {
		margin-bottom: 1rem;
	}
	
	.mainbox_2_list .list_img {
		display: inline-block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		vertical-align: top;
		margin-right: 0.5rem;
	}
	
	.mainbox_2_list .test {
		display: inline-block;
		position: relative;
		background: #fff;
		border-radius: 0.5rem;
		padding: 1rem 1rem;
		border: 1px solid #ccc;
		margin-right: 0.5rem;
		max-width: 16rem;
		vertical-align: top;
		font-size: 1.4rem;
		word-wrap: break-word;
	}
	
	.mainbox_2_list .test::before {
		content: "";
		position: absolute;
		top: 0.5rem;
		right: -0.8rem;
		width: 0px;
		height: 0px;
		border-top: 5px solid rgba(0, 0, 0, 0);
		border-right: 5px solid rgba(0, 0, 0, 0);
		border-left: 5px solid #fff;
		border-bottom: 5px solid rgba(0, 0, 0, 0);
	}
	
	.left .list_img {
		float: left;
	}
	
	.right .list_img {
		float: right;
	}
	
	.right .basestyle {
		float: right;
	}
	
	.left .test::before {
		content: "";
		position: absolute;
		top: 0.5rem;
		left: -0.8rem;
		width: 0px;
		height: 0px;
		border-top: 5px solid rgba(0, 0, 0, 0);
		border-left: 5px solid rgba(0, 0, 0, 0);
		border-right: 5px solid #fff;
		border-bottom: 5px solid rgba(0, 0, 0, 0);
	}
</style>