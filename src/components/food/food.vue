<template>
	<transition name="move">
		<div class="food" ref="header">
			<mt-header fixed :title="time">
				<div class="back" @click="hide" slot="left">
					<mt-button icon="back">返回</mt-button>
				</div>
				<mt-button slot="right" @click="tj()" :class="{active:isPublish}">提交</mt-button>-->
			</mt-header>
			<div class="food-content">
				<div class="foodBox">
					<ul>
						<li>
							<div class="getImg colGre">
								<i class="icon iconfont icon-baby_crockery"></i>
							</div>
							<div class="food-box">
								<a>早餐: <input v-model="morningName1" /></a>
								<a>早点: <input v-model="morningName2" /></a>
							</div>
						</li>
						<li>
							<div class="getImg colblu">
								<i class="icon iconfont icon-baby_crockery"></i>
							</div>
							<div class="food-box">
								<a>午餐: <input v-model="middayName1" /></a>
								<a>午点: <input v-model="middayName2" /></a>
							</div>
						</li>
						<li>
							<div class="getImg colyel">
								<i class="icon iconfont icon-baby_crockery"></i>
							</div>
							<div class="food-box">
								<a>晚餐: <input v-model="eveningName1" /></a>
								<a>晚点: <input v-model="eveningName2" /></a>
							</div>
						</li>
					</ul>
				</div>
				<div class="up">
					<img src="static/test/upload.png" @click.stop="addPic" />
					<input id="File2" runat="server" @change="changes($event)" type="file" accept="image/*" multiple="multiple" capture="camera" style="display:none" />
					<ul class="list-ul clearfix" v-if="flag">
						<li class="list-li " v-for="(iu, index) in imgUrls2">
							<a class="list-link" @click='previewImage(iu)'>
								<img :src="iu">
							</a>
         				 <span class="list-img-close" @click="del(index)"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import * as time from '@/common/util/time.js'
	import { Toast } from 'mint-ui';
	export default {
		props: {
			time: {
				type: String
			},
			longtime: {
				type: String
			}
		},
		data() {
			return {
				showFlag: false,
				morningName1: '',
				morningName2: '',
				middayName1: '',
				middayName2: '',
				eveningName1: '',
				eveningName2: '',
				imgUrls2:[],
				list: [],
				flag:false,
				imgURL:imgURL,
				imgUrls: [],
				targetImg:'',
				isPublish:false,
				active:'active'
			}
		},
		created() {
			this.init();
			console.log(this.longtime, 2)
		},
		methods: {

			hide() {
				this.$emit('flags', false);
			},
			tj() {
				if(this.isPublish)return;
				var params = new URLSearchParams();
				params.append('userId', this.$store.state.userId);
				params.append('createDate', new Date(this.longtime).getTime());
				params.append('text', '["' + this.morningName1 + '","' + this.morningName2 + '","' + this.middayName1 + '","' + this.middayName2 + '","' + this.eveningName1 + '","' + this.eveningName2 + '"]');
				params.append('img', this.imgUrls.join(','));
				axios.post(address + 'index/api/iuRecipes', params).then((res) => {
					if(res.data.code == 0) {
						
						this.imgUrls=[];
						this.imgUrls2=[];
						this.comText='';
//						this.targetImg='';
						Toast({
							message: '食谱提交成功',
							duration: 2000
						})
						this.$emit('flags', false);
						this.$emit('go', true);
					}
					console.log(res)
				}).catch((err) => {
					console.log(err)
				})
			},
			init() {
				axios.get(address + 'index/api/getRecipes', {
					params: {
						userId: this.$store.state.userId,
						createDate: new Date(this.longtime).getTime()
					}
				}).then((res) => {
					console.log(res)
					this.list = eval(res.data.data.text);
					this.morningName1 = this.list[0];
					this.morningName2 = this.list[1];
					this.middayName1 = this.list[2];
					this.middayName2 = this.list[3];
					this.eveningName1 = this.list[4];
					this.eveningName2 = this.list[5];
					console.log(this.list)
				}).catch((err) => {
					console.log(err)
				})
			},
			//触发input
			addPic: function(e) {
				document.getElementById('File2').click()
			},
			//input change事件
			changes(e) {
				var fileObj = e.currentTarget;
				console.log(e)
				console.log(e.currentTarget)
				var windowURL = window.URL || window.webkitURL;
				var dataURL;
				if(fileObj && fileObj.files && fileObj.files[0]) {
					dataURL = fileObj.files[0];
					this.imgUrls2.push(windowURL.createObjectURL(fileObj.files[0]));
						this.flag = true;
						this.isPublish = true;
					this.getImg(dataURL);
				}
			},
			getImg(files) {
				let self = this;
				//图片这里用new FormData()
				 let params = new FormData()
				params.append('userId', this.$store.state.sysUser.id)
				params.append('type', 'recipes');
				params.append('file', files);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				this.$nextTick(function(){
					axios.post(address + 'index/api/uploadPic', params,config).then(function(res) {
					console.log('上传图片成功返回===》', res)
					if(res.data.code == 0){
						self.targetImg =res.data.data;
						self.imgUrls.push(self.targetImg)
//						self.imgUrls2= self.imgUrls;
						console.log('imgUrls===>', self.imgUrls)
						self.isPublish = false;
					}
				})
				})
				
			},
			//删除图片
			del(index){
				this.imgUrls2.splice(index,1)
				this.imgUrls.splice(index,1)
			}
		}
	}
</script>

<style scoped="scoped">
	.food {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 30;
		width: 100%;
		background: #ebebeb;
		transform: translate3d(0, 0, 0);
	}
	
	.move-enter-active,
	.move-leave-active {
		transition: all 0.2s linear;
	}
	
	.move-enter,
	.move-leave-to {
		transform: translate3d(0, 100%, 0);
	}
	
	.food-content {
		margin-top: 3rem;
	}
	
	.num {
		margin-left: 9rem;
	}
	
	.foodBox ul li {
		display: flex;
		background: #fff;
	}
	
	.food ul li .getImg {
		display: inline-block;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		margin: 1rem;
		text-align: center;
	}
	
	.colGre {
		background: #51da42;
	}
	
	.colblu {
		background: #76d8ff;
	}
	
	.colyel {
		background: #f9e237;
	}
	
	.food ul li .getImg i {
		color: #fff;
		font-size: 3rem;
	}
	
	.food-box {
		flex: 1;
		padding-top: 1rem;
	}
	
	.food-box a {
		display: block;
		font-size: 1.2rem;
		/*margin-bottom: 0.5rem;*/
		height: 2.6rem;
		line-height: 2.6rem;
	}
	
	.food-box a input {
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		font-size: 1.1rem;
		line-height: 2rem;
		height: 2rem;
	}
	.up {
		width: 100%;
		padding: 1rem 0;
		border-top: 1px solid #CCCCCC;
		background: #FFFFFF;
	}
	
	.up>img {
		display: inline-block;
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
	}
	.list-ul {
    list-style: none;
    /* 去掉ul前面的符号 */
    margin: 0px;
    /* 与外界元素的距离为0 */
    padding: 0px;
    /* 与内部元素的距离为0 */
    width: 100%;
    /* 宽度根据元素内容调整 */
  }

  /* 所有class为menu的div中的ul中的li样式 */

  .list-li {
    float: left;
    /* 向左漂移，将竖排变为横排 */
    padding: 8px;
    /* 与内部元素的距离为0 */
    display: inline-block;
    position: relative;
    text-align: center;
  }

  .list-link img {
    width: 100px;
    height: 100px;
  }

  /* 所有class为menu的div中的ul中的a样式(包括尚未点击的和点击过的样式) */

  .list-link a:visited {
    background-color: #465c71;
    /* 背景色 */
    border: 1px #4e667d solid;
    /* 边框 */
    color: #dde4ec;
    /* 文字颜色 */
    display: flex;
    /* 此元素将显示为块级元素，此元素前后会带有换行符 */
    line-height: 1.35em;
    /* 行高 */
    padding: 4px 20px;
    /* 内部填充的距离 */
    text-decoration: none;
    /* 不显示超链接下划线 */
    white-space: nowrap;
    /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
    overflow: hidden;
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */

  .list-link a:hover {
    background-color: #bfcbd6;
    /* 背景色 */
    color: #465c71;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */

  .list-link a:active {
    background-color: #465c71;
    /* 背景色 */
    color: #cfdbe6;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  .list-img-close {
    background: #ffffff url(../../../static/test/del.png) no-repeat right top;
    border-color: #ff4a00;
    background-position: center;
    background-size: 35px 35px;
    display: block;
    float: left;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 5%;
    left: 71%;
    margin-top: 0px;
    margin-left: 0px;
    padding: 8px;
    z-index: 10;
    border-radius: 5px;
    text-align: center;
  }
  .add-preview{
  	position: fixed;
  	top: 0;
  	bottom: 0;
  	background: rgba(0,0,0,0.5);
  	z-index: 10000;
  	width: 100%;
  }
  .add-preview img{
  	max-width: 100%;
  	position: absolute;
  	top: 50%;
  	transform: translateY(-50%);
  }
  .active{
  	color: #CCCCCC;
  }
</style>