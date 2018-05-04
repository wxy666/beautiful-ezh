<template>
	<div class="tab clearfix">
		<router-link tag="div" to="/Recommond" class="tabList">
			<img :src="img1" alt="" />
			<p>校园</p>
		</router-link>
		<router-link tag="div" to="/interact" class="tabList">
			<img :src="img2" alt="" />
			<p>互动</p>
		</router-link>
		<router-link tag="div" to="/find" class="tabList">
			<img :src="img3" alt="" />
			<p>每日推荐</p>
		</router-link>
		<router-link tag="div" to="/myself" class="tabList">
			<img :src="img4" alt="" />
			<p>我的</p>
		</router-link>
	</div>
</template>

<script>
export default {
  data () {
    return {
      selected: "校园",
      img1: 'static/test/icon1_1.png',
      img2: 'static/test/icon2_1.png',
      img3: 'static/test/icon3_1.png',
      img4: 'static/test/icon4_1.png'
    }
  },
  created(){
  	this.init();
  },
	methods:{
		init(){
			
			this.$nextTick(function(){
			if(this.$route.path == '/'){
				this.img1 = "static/test/icon1_2.png"
			}else{
				this.img1 = "static/test/icon1_1.png"
			}
			if(this.$route.path == '/Recommond'){
				this.img1 = "static/test/icon1_2.png"
			}else{
				this.img1 = "static/test/icon1_1.png"
			}
			if(this.$route.path == '/interact'){
				this.img2 = "static/test/icon2_2.png"
			}else{
				this.img2 = "static/test/icon2_1.png"
			}
			if(this.$route.path == '/find'){
				this.img3 = "static/test/icon3_2.png"
			}else{
				this.img3 = "static/test/icon3_1.png"
			}
			
			if(this.$route.path == '/myself'){
				this.img4 = "static/test/icon4_2.png"
			}else{
				this.img4 = "static/test/icon4_1.png"
			}
			})
		}
	},
	watch:{ 
		$route(to){
			if(to.path == '/'){
				this.img1 = "static/test/icon1_2.png"
			}else{
				this.img1 = "static/test/icon1_1.png"
			}
			if(to.path == '/Recommond'){
				this.img1 = "static/test/icon1_2.png"
			}else{
				this.img1 = "static/test/icon1_1.png"
			}
			if(to.path == '/find'){
				this.img3 = "static/test/icon3_2.png"
			}else{
				this.img3 = "static/test/icon3_1.png"
			}
			if(to.path == '/interact'){
				this.img2 = "static/test/icon2_2.png"
			}else{
				this.img2 = "static/test/icon2_1.png"
			}
			if(to.path == '/myself'){
				this.img4 = "static/test/icon4_2.png"
			}else{
				this.img4 = "static/test/icon4_1.png"
			}
		}
	}
}
</script>

<style scoped>
	.tab{
		width: 100%;
		height: 4.4rem;
		font-size: 1.2rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		text-align: center;
		color: #fff;
		background: #fff;
		border-top: 1px solid #ebebeb;
	}
	.tabList{
		display: inline-block;
		float: left;
		width: 25%;
		height: 4.4rem;
	}
	.tabList img{
		display: inline-block;
		width: 2.5rem;
		height: 2.2rem;
		margin-top: 0.3rem;
	}
	.tabList p{
		color: #666;
	}

	
</style>