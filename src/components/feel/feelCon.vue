<template>
	<transition name="slideX">
		<div class="kqCon child" ref="kqCon">
			<mt-header fixed :title="name+'体感'">
				<router-link :to="getParentLink" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<div class="wrap-box">
					<group>
						<datetime class="top" v-model="times" :min-year=2017 :max-year=2099 format="YYYY-MM-DD" :end-date="endDate" @on-change="change" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="确定" cancel-text=" "></datetime>
					</group>
					<div class="timeList" v-for="item in timeList" v-show="item.signTime != null">
						
					</div>
					<scroll class="minHeight">
						<div>
							<div class="timeList" v-for="item in timeList" v-show="item.signTime != null">
								<div class="timeItem">
									<p>测量时间：{{item.signTime}}</p>
									<p style="color:#f6a305">测量温度：{{item.signTemp}}℃</p>
								</div>
							</div>
						</div>

					</scroll>
					<div class="noTimeList" v-show="timeList[0] == null">当天没有体感记录哦~</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { Datetime, Group } from 'vux'
	import * as time from '@/common/util/time.js'
	import { Toast ,Indicator } from 'mint-ui';
	import Scroll from '@/base/scroll/scroll';
	
	export default {
		props: {
			selectedItem: {
				type: Object
			},
			selectedValue: {
				type: String
			}
		},
		components: {
			Datetime,
			Group,
			Scroll
		},
		data() {
			return {
				showFlag: false,
				readonly: true,
				value5: '', //date组件时间
				value: '',
				userId: this.$store.state.userId, //全局userid
				selUserId: this.$route.query.selUserId, //学生userid
				name: this.$route.query.name, //学生name
				selectTime: new Date().getTime(), //当前时间
				times: "", //当前时间
				timeList: [],
				endDate: ''
			}
		},
		computed: {
			getParentLink() {
				// 动态获取父路由
				return this.$route.path.substring(this.$route.path.indexOf('/'), this.$route.path.lastIndexOf('/'));
			}
		},
		created() {
			if(this.$route.query.times) {
				this.times = this.$route.query.times
			} else {
				this.times = time.getYYMMDD();
			}
			//			this.value5 = time.getYYMMDD();
			this.endDate = time.getYYMMDD();
			this.init();
			console.log(this.times)
		},
		methods: {
			change(value) {
				if(this.$store.state.userType == 3 || this.$store.state.userType == 4) {
					axios.get(address2 + 'v1.0/terminal/getTemperDetail', {
						params: {
							userId: this.userId,
							selUserId: this.selUserId,
							selectTime: new Date(value).getTime()
						}
					}).then((res) => {
						if(res.data.code == 1000){
						this.timeList = res.data.data;
						}
					}).catch((err) => {
						console.log(err)

					})
				}
				if(this.$store.state.userType == 5) {
					axios.get(address2 + 'v1.0/terminal/getTemperDetail', {
						params: {
							userId: this.userId,
							selUserId: this.userId,
							selectTime: new Date(value).getTime()
						}
					}).then((res) => {
						if(res.data.code == 1000){
						this.timeList = res.data.data;
						}
						console.log(this.timeList)
					}).catch((err) => {
						console.log(err)

					})
				}

			},
			init() {
				if(this.$store.state.userType == 3 || this.$store.state.userType == 4) {
					axios.get(address2 + 'v1.0/terminal/getTemperDetail', {
						params: {
							userId: this.userId,
							selUserId: this.selUserId,
							selectTime: new Date(this.times).getTime()
						}
					}).then((res) => {
						if(res.data.code == 1000){
						this.timeList = res.data.data;
						}
						console.log(this.timeList)
					}).catch((err) => {
						console.log(err)
					})
				}
				if(this.$store.state.userType == 5) {
					axios.get(address2 + 'v1.0/terminal/getTemperDetail', {
						params: {
							userId: this.userId,
							selUserId: this.userId,
							selectTime: new Date().getTime()
						}
					}).then((res) => {
						if(res.data.code == 1000){
						this.timeList = res.data.data;
						}
						console.log(this.timeList)
					}).catch((err) => {
						console.log(err)

					})
				}

			},
			getTimes(data) {
				return time.getTimes(data);
			}
		}
	}
</script>

<style scoped="scoped">
	.kqCon {
		z-index: 1000;
	}
	
	.kqCon .title {
		position: fixed;
		width: 100%;
		height: 3.1rem;
		line-height: 3.1rem;
		text-align: center;
		color: #FFFFFF;
		font-size: 16px;
		top: 0;
		left: 0;
		background: #fb7065;
		margin: 0;
	}
	
	.kqCon i {
		float: left;
		margin-left: 0.7rem;
		font-size: 19px;
	}
	
	.timeList {
		background: #fff;
		font-size: 1.4rem;
		line-height: 3rem;
	}
	
	.noTimeList {
		line-height: 10rem;
		font-size: 1.6rem;
		text-align: center;
		background: #fff;
	}
	.wrap-box{
		position: absolute;
		top: 3rem;
		bottom: 0;
		width: 100%;
	}
	.minHeight{
		position: absolute;
		top: 3rem;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.timeItem {
		margin-bottom: 1rem;
	}
	.timeItem p {
		display: block;
		text-indent: 2rem;
	}
</style>