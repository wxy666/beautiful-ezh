<template>
	<transition name="slideY">
		<div class="book child">
			<mt-header fixed :title="getName">
				<router-link to="/myself" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
			</mt-header>
			<div class="wrap">
				<swiper v-model="targetindex" height="54rem" >
					<swiper-item v-for="(item, index) in getList" :key="index">
						<div class="bookList">
							<router-link tag="div" :to="'/myself/book/bookDetail?id='+ item2.id" class="bookItem" :key="index2" v-for="(item2,index2) in item.bookList" >
								<p :class="'p'+index2">
								<img :src="item2.thumbnailUrl" alt="" />
								</p>
								<!--<span>{{item2.name}}</span>-->
						</router-link>
						</div>
						
					</swiper-item>
				</swiper>
			</div>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import { Swiper, SwiperItem } from 'vux'
	export default {
		data() {
			return {
				targetindex: 0,
				getList:[],
				getName:''
			}
		},
		created() {
			this.init();
		},
		components: {
			Swiper,
			SwiperItem
		},
		watch:{
			targetindex(n,o){
				console.log(n,o)
				this.getName = this.getList[n].bookShelf.name;
			}
		},
		methods: {
			init() {
				this.$nextTick(function() {
					if(this.$store.state.userType == 5) {
						axios.get(address + 'index/api/bookList', {
							params: {
								userId: this.$store.state.userId
							}
						}).then((res) => {
							this.getList = res.data.data
							this.getName = this.getList[this.targetindex].bookShelf.name;
						}).catch((err) => {
							console.log(err)

						})
					}
				})

			}
		}
	}
</script>

<style scoped>
.bookList{
	width:100%;
	height: 100%;
	background:url('../../../static/test/ezh_bg04.png') no-repeat center top;
	background-size: 100% 100%;
	position: relative;
}
.bookList .bookItem{
	float: left;
    display: inline-block;
    width: 7rem;
    margin: 0.5rem 1%;
}
.bookList .bookItem p{
	width: 7rem;
	height: 7rem;
	position: absolute;
}
.bookList .bookItem .p0{
	top: 15rem;
	left: 2rem;
	z-index: 2;
}
.bookList .bookItem .p1{
	top: 8rem;
	left: 10rem;
	z-index: 2;
}
.bookList .bookItem .p2{
	top: 27rem;
	left: 2rem;
	z-index: 2;
}
.bookList .bookItem .p3{
	top: 19rem;
	left: 12rem;
	z-index: 2;
}
.bookList .bookItem .p4{
	top: 20rem;
	left: 24.5rem;
	z-index: 2;
}
.bookList .bookItem .p5{
	top: 7rem;
	left: 23rem;
	z-index: 2;
}
.bookList .bookItem .p0::after,.bookList .bookItem .p1::after,.bookList .bookItem .p2::after,.bookList .bookItem .p3::after,.bookList .bookItem .p4::after,.bookList .bookItem .p5::after{
	content:'';
	width: 1rem;
    height: 2rem;
	background:url('../../../static/test/ezh_bg05.png') no-repeat;
	background-size: 1rem 2rem;
	position: absolute;
	top: -1rem;
	left:3rem;
}
.bookList .bookItem img{
	display: inline-block;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.bookList .bookItem span{
	display: inline-block;
	width: 100%;
	line-height: 2rem;
	font-size: 1.2rem;
	color: #464141;
	margin-top:0.5rem;
	padding-left:0.5rem;
}
.bookList .bookItem b{
	font-weight: normal;
	font-size: 1rem;
	color: #888888;
	padding-left:0.5rem;
}
.book .wrap{
	padding: 0;
	margin:3rem 0 0 0;
	
}

</style>