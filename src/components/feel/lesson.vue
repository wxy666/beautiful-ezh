<template>
	<transition name="slideX">
		<div class="lesson child">
			<div class="title">
				<span>{{name}}</span>
			</div>
			<mt-header fixed title="">
				<router-link :to="getParentLink" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<div class="wrap-box">
					<a @click="reduce">前一天</a>
					<group>
						<datetime class="top" v-model="value5" :min-year=2017 :max-year=2099 format="YYYY-MM-DD" :end-date="endDate" @on-change="change" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="确定" cancel-text=" "></datetime>
					</group>
					<a @click="add()" ref="add" style="color:#8e8a8a">后一天</a>
				</div>
			</div>
			<div class="mailDiv">
				<scroll class="mailHeight">
				<div>
					<div class="list">
				<div class="kq-list" v-for="(item,index) in kqList" @click="selectItem(item,$event)">
					<i class="iconfont icon-icon31"></i>
					<h2>{{item.name}}</h2>
					<span class="dk" v-show="item.isWork== 1">已测量</span>
					<span class="wdk" v-show="item.isWork== 0">未测量</span>
				</div>
			</div>
				</div>
			</scroll>
			</div>
			<div class="footer">
				<div>
					<span class="dk">•已测量</span>
				</div>
				<div>
					<span class="wdk">•未测量</span>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import kqCon from '@/components/kqCon/kqCon'
	import { Datetime, Group } from 'vux'
import { Toast ,Indicator } from 'mint-ui';
	import Scroll from '@/base/scroll/scroll';
	import * as time from '@/common/util/time.js'
	export default {
		components: {
			Datetime,
			Group,
			kqCon,
			Scroll
		},
		data() {
			return {
				readonly: true,
				value5: '', //日历初始化
				name: this.$route.query.name,//班级名
				classId:this.$route.query.id, //classid
				userId:this.$store.state.userId, //userid
				kqList: [],//渲染内容数组
				selectedItem: {},
				endDate:''//设置结束日期
			}
		},
		created() {
			this.init();
			this.value5 = time.getYYMMDD();
			this.endDate = time.getYYMMDD();
		},
		watch: {
			value5(n,o){
				
			}
		},
		computed: {
			getParentLink() {
				// 动态获取父路由
				return this.$route.path.substring(this.$route.path.indexOf('/'), this.$route.path.lastIndexOf('/'));
			}
		},
		methods: {
			//初始化方法
			init(){
				let self = this;
				axios.get(address2 + 'v1.0/terminal/getTemperList', {
						params: {
							userId: self.userId,
							classId:self.classId,
							selectTime: new Date().getTime()
						}
					}).then((relove) => {
						console.log(relove.data)
						if( relove.data.code == 1000){
							//返回的数据数组
							self.kqList = relove.data.data;
						}
					}).catch((err) => {
						console.log(err)
					})
			},
			change(value) {
				let self = this;
				if(new Date(self.value5).getTime() >= new Date().getTime()){
					this.$refs.add.style.color = '#8e8a8a'
					self.value5 = time.getYYMMDD();//如果是今天以后 默认今天 不能向后查
				}else{
					this.$refs.add.style.color = '#fff'
					self.value5 = value;
					axios.get(address2 + 'v1.0/terminal/getTemperList', {
						params: {
							userId: self.userId,
							classId:self.classId,
							selectTime: new Date(self.value5).getTime()
						}
					}).then((relove) => {
						if( relove.data.code == 1000){
							//返回的数据数组
							self.kqList = relove.data.data;
						}
					}).catch((err) => {
						console.log(err)
					})
				}
				
			},
			add: function() {
				let self = this;
				self.value5 = time.addDate(self.value5, 1)
				console.log(self.value5,new Date(self.value5).getTime() )
				if(new Date(self.value5).getTime() >new Date().getTime()){
					this.$refs.add.style.color = '#8e8a8a';
					self.value5 = time.getYYMMDD();//如果是今天以后 默认今天 不能向后查
				}else{
					this.$refs.add.style.color = '#fff';
					axios.get(address2 + 'v1.0/terminal/getTemperList', {
						params: {
							userId: self.userId,
							classId:self.classId,
							selectTime: new Date(self.value5).getTime()
						}
					}).then((relove) => {
						console.log(relove.data)
						if( relove.data.code == 1000){
							//返回的数据数组
							self.kqList = relove.data.data;
						}
					}).catch((err) => {
						console.log(err)

					})
				}
				
			},
			reduce: function() {
				let self = this;
				self.value5 = time.addDate(self.value5, -1)
				console.log(self.value5,new Date(self.value5).getTime() )
				
				this.$refs.add.style.color = '#fff';
				axios.get(address2 + 'v1.0/terminal/getTemperList', {
						params: {
							userId: self.userId,
							classId:self.classId,
							selectTime: new Date(self.value5).getTime()
						}
					}).then((relove) => {
						console.log(relove.data)
						if( relove.data.code == 1000){
							//返回的数据数组
							self.kqList = relove.data.data;
						}
					}).catch((err) => {
						console.log(err)
					})
			},
			selectItem: function(item, event) {
				this.selectedItem = item;
				this.$router.push('/feel/lesson/feelCon?selUserId='+item.userId+'&name='+item.name+'&times='+this.value5)
//				this.$refs.kqCon.show(); //父组件里面通过ref调用子组件方法
			},
			changeTime:function(value){
				this.value5=value
			}
		}
	}
</script>

<style scoped="scoped">
	.mailDiv{
		position: fixed;
		top: 7rem;
		bottom: 4rem;
		width: 100%;
	}
	.lesson .title {
		position: fixed;
		width: 80%;
		line-height: 3rem;
		top: 0;
		left: 0;
		z-index: 1000;
		color: #FFFFFF;
		margin: 0 3rem;
	}	
	.lesson .title span {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.lesson .wrap-box {
		width: 100%;
		height: 4rem;
		background: #ff7800;
		display: flex;
	}
	
	.lesson .wrap a {
		display: inline-block;
		color: #FFFFFF;
		flex: 1;
		margin: 1.5rem 0.5rem 0 0.5rem;
	}
	
	.lesson .wrap a:last-child {
		text-align: right;
	}
	
	.lesson .wrap div {
		flex: 1;
	}
	.lesson .wrap {
		padding-bottom: 0;
	}
	
	.lesson .weui-cells a div p {
		color: red;
	}
	.lesson .list {
		margin: 1rem 1.5rem;
	}
	
	.lesson .kq-list {
		display: inline-block;
		margin-right: 1.2rem;
	}
	
	.lesson .kq-list:nth-child(4n) {
		margin-right: 0;
	}
	/*.lesson .kq-list img{
		width: 6rem;
		height: 6rem;
		border-radius:50% 50%;
	}*/
	
	.lesson .iconfont {
		font-size: 6rem;
	}
	
	.lesson .kq-list h2 {
		text-align: center;
		color: black;
	}
	
	.lesson .kq-list span {
		display: block;
		color: deeppink;
		text-align: center;
		width: 4rem;
		height: 1rem;
		line-height: 1rem;
		border: 1px solid deeppink;
		border-radius: 1rem 1rem 1rem 1rem;
		margin: 0.5rem 0 0 1rem;
	}
	
	.lesson .kq-list .dk {
		color: green;
		border: 1px solid green;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3rem;
		border-top: 0.5px solid #CCCCCC;
		display: flex;
		align-items: center;
	}
	
	.lesson .footer div:first-child {
		flex: 1;
		padding: 0 0 0 8rem;
	}
	
	.lesson .footer div:last-child {
		flex: 1;
		padding: 0 6rem 0 0;
	}
	
	.lesson .dk {
		display: block;
		color: green;
		text-align: center;
		width: 4rem;
		height: 1rem;
		line-height: 1rem;
		border: 1px solid green;
		border-radius: 1rem 1rem 1rem 1rem;
	}
	
	.lesson .wdk {
		display: block;
		color: deeppink;
		text-align: center;
		width: 4rem;
		height: 1rem;
		line-height: 1rem;
		border: 1px solid deeppink;
		border-radius: 1rem 1rem 1rem 1rem;
	}
	.mailHeight{
		background: #fff;
	}
</style>