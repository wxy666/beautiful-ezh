<template>
	<transition name="slideX">
		<div class="bookDetail child">
			<mt-header fixed title="图书详情">
				<router-link :to="getParentLink" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap bookDetailCon">
				<scroll class="minHeight">
					<div>
						<div class="books clearfix">
							<img :src="getBook.thumbnailUrl" alt="" class="item_img" />
							<h1>{{getBook.name}}</h1>
							<p>视频: {{getCourses.length}}个</p>
							<span>播放：{{getBook.clicksNum}}</span>
						</div>
						<div class="brief">
							<p>简介</p>
							<div class="brief_text" ref="text" v-html="getBook.content"></div>
							<p @click="slide()" ref="slide" class="slide">展开</p>
						</div>
						<div class="videoList" >
							<p>视频列表</p>
							<router-link tag="div" :to="'/myself/book/bookDetail/bookVideo?id='+item.id" class="video_item" :key="index" v-for="(item,index) in getCourses">
								<img v-lazy="'http://res.ezhihe.cn/zlwx/resources/convert_s'+item.iconUrl" alt="" />
								<p>{{item.fileName}}</p>
								<i></i>
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
	import Scroll from '@/base/scroll/scroll';
	export default{
		components:{
			Scroll
		},
		computed:{
			getParentLink(){
				// 动态获取父路由
				return this.$route.path.substring(this.$route.path.indexOf('/'),this.$route.path.lastIndexOf('/'));
			}
		},
		data(){
			return{
				bookId:'', // 获取资源id
				getData:[],//获取到的总数据
				getBook:{},
				getCourses:[]
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				this.bookId = this.$route.query.id;
				console.log(this.bookId );
				this.$nextTick(function() {
					if(this.$store.state.userType == 5) {
						axios.get(address + 'index/api/courseList', {
							params: {
								userId: this.$store.state.userId,
								bookId:this.bookId
							}
						}).then((res) => {
							if(res.data.code == 0){
							this.getData = res.data.data;
							this.getBook = this.getData.book;
							this.getCourses = this.getData.courses;
							console.log(this.getCourses)
							}
						}).catch((err) => {
							console.log(err)
						})
					}
				})
			},
			slide(){
				if(this.$refs.slide.innerHTML == '展开'){
					this.$refs.text.style.height = 'auto';
					this.$refs.slide.innerHTML = '收起'
				}else{
					this.$refs.text.style.height = '5.5rem';
					this.$refs.slide.innerHTML = '展开'
				}
			}
		}
	}
</script>

<style scoped>
	.bookDetailCon{
		position: fixed;
	    top:0;
	    bottom: 0;
	    width: 100%;
	    padding-bottom: 1rem;
	}
	.minHeight{
		height:100%;
		position: relative;
		overflow: hidden;
	}
	.books{
		width: 100%;
		height: 10rem;
		border: 1px solid #ebebeb;
		padding: 1rem 0;
		background: #fff;
	}
	.books .item_img{
		float: left;
		display: inline-block;
		width: 8rem;
		height: 10rem;
		margin: 0 1rem;
	}
	.books h1{
		font-weight: normal;
		font-size: 1.2rem;
		color: #464141;
		margin-bottom: 2rem;
	}
	.books p,.books span{
		margin-bottom:2rem;
		font-size: 1.1rem;
		color: #7c807c;
	}
	.brief{
		background:#fff;
		padding: 1rem;
	}
	.brief p{
		font-weight: bold;
		font-size: 1.1rem;
		padding: 0.5rem 0;
		color: #464141;
	}
	.brief_text{
		padding: 0.5rem 0;
		height: 5.5rem;
		overflow: hidden;
	}
	.brief .slide{
		line-height: 2rem;
		color:orange;
		text-align: right;
	}
	.videoList{
		margin:1rem 0;
		background: #fff;
		padding: 0.5rem 0;
	}
	.video_item{
		display: inline-block;
		width: 46%;
		position: relative;
	}
	.video_item:nth-child(even){
		margin: 0 4% 0 2%;
	}
	.video_item img{
		display: inline-block;
		width: 100%;
		height: 10rem;
	}
	.video_item p{
		display: inline-block;
		width: 100%;
		text-align: center;
		line-height: 3rem;
	}
	.video_item i{
		display: inline-block;
		width: 4rem;
		height: 4rem;
		position: absolute;
		top: 3rem;
		left: 50%;
		transform: translateX(-50%);
		background: url('../../../static/test/ezh_bg02.png') no-repeat;
		background-size:4rem;
		z-index: 2;
	}
	.videoList > p{
		font-weight: bold;
	    font-size: 1.1rem;
	    padding: 0.5rem 1rem;
	    color: #464141;
	}
</style>