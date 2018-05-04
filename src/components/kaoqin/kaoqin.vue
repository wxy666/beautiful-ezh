<template>
	<transition name="slideY">
		<div class="kaoqin">
			<mt-header fixed title="班级选择">
				<router-link to="/Recommond" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="mailDiv ">
				<scroll class="mailHeight">
					<div>
						<div v-for="(item,index) in lesson">
					<router-link :to="{path:'/kaoqin/lesson',query:{id:item.id,name:item.name}}" class="lesson-item" :key="index" tag="div">
						<i class="iconfont icon-gerenxinxi_suozaibanji"></i>
						<span>{{item.name}}</span>
					</router-link>
				</div>
					</div>
				</scroll>
				
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import * as time from '@/common/util/time.js'
	import Scroll from '@/base/scroll/scroll';
	export default {
		components:{
			Scroll
		},
		data() {
			return {
				lesson: [],
				userId: this.$store.state.userId
			}
		},
		created() {
			this.kaoqin();
		},
		methods: {
			//考勤
			kaoqin() {
				let self = this;
				//权限:管理员
				if(this.$store.state.userType == 3 || this.$store.state.userType == 4) {
					axios.get(address + 'index/api/getClassList', {
						params: {
							userId: self.userId,
							selectTime: new Date().getTime()
						}
					}).then((relove) => {
						console.log('获取到的数据',relove.data)
						if(relove.data.code == 0) {
							self.lesson = relove.data.data;
						}
					}).catch((err) => {
						console.log(err)

					})
				}

			}
		}
	}
</script>

<style scoped="scoped">
	.mailDiv{
		position: fixed;
		top: 3rem;
		bottom: 1rem;
		width: 100%;
	}
	.kaoqin .lesson-info {
		margin-top: 40px;
	}
	
	.kaoqin .iconfont {
		font-size: 2rem;
	    color: #ff7800;
	    vertical-align: -0.1rem;
	}
	
	.kaoqin .lesson-item {
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		background: #FFFFFF;
		margin-bottom: 1rem;
		border-radius: 0.5rem;
	}
	
	.kaoqin .lesson-item i {
		padding-left: 1rem;
	}
	
	.kaoqin .lesson-item span {
		font-size: 1.2rem;
	}
</style>