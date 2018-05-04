<template>
	<transition name="slideX">
		<div class="selectPeople child" v-show="showFlag">
			<mt-header fixed title="选择联系人">
				<mt-button slot="left" @click="hide">
					<mt-button icon="back"></mt-button>
				</mt-button>
				<mt-button slot="right">
					确定
				</mt-button>
			</mt-header>
			<div class="wrap">
				<div class="SP_con">
					<div>
						<scroll :data="datas" class="SP_per">
							<div class="allSelect">
								<div id="quanxuan">
									<input id="all-checked" type="checkbox" :checked="isAllChecked()" @change="changeAllChecked($event)" />
									<label for="all-checked">公开</label>
								</div>
								<div class="erSelect" v-for="(data,index) in datas">
									<!--遍历父的-->
									<div class="erSelectStyle">
										<input type="checkbox" :id="data.listTitle" value="" :checked="isTitleChecked(data)" @change="changeTitleChecked(data,$event)" /><label :for="data.listTitle">{{data.listTitle}}</label>
										<i @click="goshow(index)" :index="index" :id="'show'+index"  ref="goshow" ></i>
									</div>
									<transition name="slideshow">
										<div class="trSelect" :id="'trSelect'+index">
											<div class="er" v-for="item in data.listItem">
												<!--遍历子的-->
												<label :for="item.id">{{item.name}}</label><input :id="item.id" type="checkbox" :value="item" v-model="selecteds" />
											</div>
										</div>
									</transition>
								</div>
							</div>
						</scroll>
					</div>
					<div class="SP_bottom clearfix">
						<span>已选中:</span>
						<p>{{getSelected}}</p>
						<mt-button type="primary" class="save">确认 </mt-button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from '@/base/scroll/scroll';
	export default {
		components: {
			Scroll
		},
		data() {
			return {
				showFlag: false,
				selecteds: [],
				selecteds1: [],
				datas: [{
						//用于判断是否展示子列表
						// isShowListItem : false,
						//用于记录选中了哪些子项
						id: 666,
						selected: [],
						//父标题
						listTitle: "全部教师",
						//子列表
						listItem: [{
								id: 1222,
								info: 0,
								name: "高一"
							},
							{
								id: 23,
								info: 1,
								name: "高二"
							},
							{
								id: 13,
								info: 0,
								name: "高三"
							}
						]
					},
					{
						// isShowListItem : false,
						id: 8888,
						selected: [],
						listTitle: "2018小班",
						listItem: [{
								id: 42,
								info: 1,
								name: "大一"
							},
							{
								id: 51,
								info: 0,
								name: "大二"
							}
						]
					}

				]
			}
		},
		computed: {
			getParentLink() {
				return this.$route.path.substring(this.$route.path.indexOf('/'), this.$route.path.lastIndexOf('/'));

			},
			getSelected() {
				let str = ''
				this.selecteds.forEach(function(data) {
					str += ',' + data.name
				})
				if(str.length < 20) {
					return str.substring(1)
				} else {
					return str.substring(1, 20) + '....';
				}

			}
		},
		methods: {
			show() {
				this.showFlag = true
			},
			hide() {
				this.showFlag = false
			},
			/**
			 * 当父标题状态变化时的处理方法
			 * @param data [当前项的data]
			 * @param event [当前项的event]
			 */
			changeTitleChecked: function(data, event) {
				var self = this;
				if(event.target.checked === true) {
					data.listItem.forEach(function(item) {
						JSON.stringify(self.selecteds).indexOf(JSON.stringify(item)) === -1 && self.selecteds.push(item);
						console.log(self.selecteds)
					})
				} else {
					data.listItem.forEach(function(item) {
						console.log(JSON.stringify(self.selecteds))
						if(JSON.stringify(self.selecteds).indexOf(JSON.stringify(item)) != -1) {
							self.selecteds.forEach(function(data, k) {
								if(data.id === item.id) {
									self.selecteds.splice(k, 1);
								}
							})
						}

						console.log('self', self.selecteds)

					})

				}
			},
			/**
			 * 判断父标题选择状态
			 * @param data [当前项的data]
			 * @returns {boolean}
			 */
			isTitleChecked: function(data) {
				var self = this;
				var _selected = self.selecteds;
				var _listItem = data.listItem;
				// 验证selected中是否含有全部的item的id 如果是 证明title要选中
				return _listItem.every(function(item) {
					return JSON.stringify(self.selecteds).indexOf(JSON.stringify(item)) != -1;
				});
			},

			/**
			 * 全选框change事件的回调处理方法
			 * @param event 
			 */
			changeAllChecked: function(event) {
				var self = this;
				if(event.target.checked === true) {
					this.datas.forEach(function(data) {
						data.listItem.forEach(function(item) {
							JSON.stringify(self.selecteds).indexOf(JSON.stringify(item)) === -1 && self.selecteds.push(item);
							console.log(self.selecteds)
						})
					})
				} else {
					//							this.datas.forEach(function(data) {
					//								
					//							})	
					self.selecteds = [];
					console.log(self.selecteds)
				}
			},

			/**
			 * 判断全选框选择状态
			 * @returns {boolean}
			 */
			isAllChecked: function() {
				var self = this;
				var _num = 0;
				this.datas.forEach(function(data) {
					_num += data.listItem.length;
				});
				return self.selecteds.length === _num;
			},
			goshow(index) {
				let show=document.getElementById('show'+index)
				let targetDiv = document.getElementById('trSelect' + index);
				if(targetDiv.style.display == 'block') {
					targetDiv.style.display = 'none'
				} else {
					targetDiv.style.display = 'block';					
				}
				if(show.className!=="iconTrans"){
					show.className="iconTrans"
				}else{
					show.className=""
				}
			}

		}
	}
</script>

<style scoped>
	.SP_con {
		position: fixed;
		top: 3rem;
		bottom: 0;
		width: 100%;
	}
	
	.SP_per {
		margin-top: 0.1rem;
	}
	
	.SP_bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		background: #fff;
	}
	
	.SP_bottom span {
		display: inline-block;
		float: left;
		margin: 0 1rem;
	}
	
	.SP_bottom p {
		display: inline-block;
	}
	
	.SP_bottom .save {
		position: absolute;
		right: 1rem;
		top: 0.8rem;
		background: none;
		border: 1px solid #51DA42;
		color: #51DA42;
		height: 2.5rem;
		font-size: 1.2rem;
	}
	
	.allSelect {
		background: #fff;
		width: 100%;
	}
	
	.allSelect>div {
		/*	padding: 1rem 0 0 2rem;*/
		font-size: 1.2rem;
	}
	
	.allSelect input[type="checkbox"] {
		-webkit-appearance: none;
		/*清除复选框默认样式*/
		background: #fff;
		/*复选框的背景图，就是上图*/
		height: 2rem;
		/*高度*/
		vertical-align: middle;
		width: 2rem;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin-left: 0.2rem;
	}
	
	.allSelect input[type="checkbox"]:checked {
		background: #fff url('../../../static/test/right03.png') no-repeat;
		background-size: 100% 100%;
		border: 1px solid #fff;
	}
	
	.allSelect label {
		margin-left: 0.5rem;
		vertical-align: middle;
	}
	
	.er {
		padding: 0.5rem 0;
	}
	
	#quanxuan {
		padding: 0.5rem 0;
	}
	
	.er input {
		margin-left: 2rem !important;
	}
	
	.er label {
		display: inline-block;
		width: 80%;
	}
	
	.erSelect {
		line-height: 3rem;
	}
	
	.erSelectStyle {
		position: relative;
	}
	
	.erSelectStyle i {
		display: inline-block;
		width: 2rem;
		height: 2em;
		background: url('../../../static/test/bottom.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		right: 1rem;
		top: 0.5rem;
		transform: rotate(-90deg);
		-webkit-transition: transform .25s linear;
		-moz-transition: transform .25s linear;
		-o-transition: transform .25s linear;
		transition: transform .25s linear;
	}
	
	.erSelectStyle .iconTrans {
		transform: rotate(0deg);
		-webkit-transition: transform .25s linear;
		-moz-transition: transform .25s linear;
		-o-transition: transform .25s linear;
		transition: transform .25s linear;
	}
	
	.allSelect div {
		border-bottom: 1px solid #efeded;
		padding-left: 1rem;
	}
	
	.erSelect .er:last-child,
	.allSelect .erSelect {
		border-bottom: none;
	}
	
	.trSelect {
		display: none;
	}
	
	.more {
		-webkit-transition: max-height .35s ease-in-out;
		-moz-transition: max-height .35s ease-in-out;
		-o-transition: max-height .35s ease-in-out;
		transition: max-height .35s ease-in-out;
		max-height: 0;
		overflow: hidden;
	}
	
	.more.active {
		max-height: 1000px;
	}
</style>