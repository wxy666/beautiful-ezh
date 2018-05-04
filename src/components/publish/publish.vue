<template>
	<transition name="slideY">
		<div class="pub child" v-show="showFlag">
			<mt-header fixed title="发布动态">
				<mt-button slot="left" @click="hide">
					<mt-button icon="back">返回</mt-button>
				</mt-button>
				<mt-button slot="right" @click.native="send()"  :class="{active:isPublish}">
					发布
				</mt-button>
			</mt-header>
			<div class="wrap">
				<div class="wrap-box">
					<textarea class="sendText" @input="descInput" placeholder="请输入内容..." maxlength="240" v-model="comText"></textarea>
					<span>{{remnant}}/240</span>
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
				<div class="add-preview" v-show="isPreview">
			      <img :src="previewImg">
			    </div>
				<!--<div class="select" @click="selectShow">
					<i class="iconfont icon-yanjing icon1"></i>
					<span>选择可见范围</span>
					<a>公开</a>
					<i class="iconfont icon-go  icon2"></i>
				</div>-->
			</div>
			<selectAll ref="selectAll"></selectAll>
		</div>
	</transition>
</template>

<script>
	import lrz from "lrz";
	import selectAll from "@/components/select/select";
	import { MessageBox, Toast } from 'mint-ui';

	export default {
		data() {
			return {
				showFlag: false,
				remnant: 0,
				comText: '',
				imgUrls: [],
				imgUrls2:[],
				isPreview: false,
				previewImg:'',
				flag:false,
				imgURL:imgURL,
				targetImg:'',
				isPublish:false,
				active:'active'
			}
		},
		components: {
			selectAll
		},
		methods: {
			hide: function() {
				this.showFlag = false
			},
			show: function() {
				this.showFlag = true
			},
			descInput() {
				var txtVal = this.comText.length;
				this.remnant = txtVal;
			},
			selectShow: function() {
				this.$refs.selectAll.show()
			},
			addComment: function() {
				this.$emit("submit", this.comText);
				this.showFlag = false
				this.commentText = "";
			},
			send() {
				console.log(this.imgUrls)
				if(this.isPublish)return;
				if(this.comText != '') {
					let self = this;
					let params = new URLSearchParams();
					params.append('userId', this.$store.state.userId);
					params.append('createDate', new Date().getTime());
					params.append('text', this.comText);
					if(self.imgUrls){
					params.append('img', self.imgUrls.join(','));
					}
					axios.post(address + 'index/api/addBabyCri', params).then(function(res) {
						if(res.data.code == 0) {
							
							self.imgUrls=[];
							self.imgUrls2=[];
							self.comText='';
							self.$emit('flag');
							self.hide();
							Toast({
								message:"发布宝贝圈成功",
								duration: 2000
							})
							
						}
					}).catch(function(err) {
						console.log(err)
					})
				} else {
					Toast({
						message: '发布内容不能为空',
						duration: 2000
					})
				}
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
				let self = this;
				if(fileObj && fileObj.files && fileObj.files[0]) {
					dataURL = fileObj.files[0];
//					self.targetImg = windowURL.createObjectURL(fileObj.files[0]);
					self.imgUrls2.push(windowURL.createObjectURL(fileObj.files[0]));
						self.flag = true;
					console.log('self.imgUrls2',self.imgUrls2)
					this.isPublish = true;
					this.getImg(dataURL);
					
				}
			},
			getImg(files) {
				let self = this;
				//图片这里用new FormData()
				 let params = new FormData()
				params.append('userId', this.$store.state.sysUser.id)
				params.append('type', 'baby');
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
				console.log(index)
				this.imgUrls2.splice(index,1)
				this.imgUrls.splice(index,1)
			}
//			//创建图片
//			createImage(file, e) {
//				Toast({
//					  message: '图片正在上传中...',
//					  duration: 1000
//					})
//				let vm = this;
//				lrz(file[0], {
//					width: 480
//				}).then(function(rst) {
//					console.log(rst)
//					vm.imgUrls.push(rst.base64);
//					return rst;
//				}).always(function() {
//					// 清空文件上传控件的值
//					e.target.value = null;
//				});
//				console.log(vm.imgUrls)
//			},
//			//图片点击事件
//			previewImage(url){
//				let vm = this;
//		        vm.isPreview = true;
//		        vm.previewImg = url;
//			},
//			closePreview(){
//				let vm = this;
//		        vm.isPreview = false;
//		        vm.previewImg = "";
//			},
//			//删除图片
//			delImage(index){
//				let vm = this;
//				vm.imgUrls.splice(index, 1);
//			}
			
		}
	}
</script>

<style scoped="scoped">
	.wrap-box {
		width: 100%;
		background: #FFFFFF;
		margin-top: 0.2rem;
	}
	
	.sendText {
		display: inline-block;
		width: 85%;
		padding: 1rem 0 0 0.1rem;
		min-height: 8rem;
		border: none;
		resize: none;
		outline: none;
		text-indent: 1rem;
		font-size: 1.2rem;
	}
	
	.wrap-box span {
		display: inline-block;
		font-size: 1.1rem;
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
	
	.select {
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		background: #FFFFFF;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.select .icon1 {
		padding: 0 1rem;
	}
	
	.select .icon2 {
		font-size: 12px;
	}
	
	.select span {
		font-size: 14px;
		color: black;
		width: 70%;
		display: inline-block;
	}
	
	.select a {
		font-size: 14px;
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

  .add-img {
    display: block;
    background-image: url('../../../static/test/upload.png');
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: 100px 100px;
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