<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			}, 
			listenScroll:{
				type:Boolean,
				default:false
			},
			// 上拉更新
			pullup:{
				type:Boolean,
				default:false
			},
			// 下拉更新
			pulldown:{
				type:Boolean,
				default:false
			},
			beforeScroll:{
				type:Boolean,
				default:false
			},
			bottom:{
				type:Boolean,
				default:false
			}
			
		},
		// 绑定的时候 触发scroll 但可能数据还没加载完 所以在watch中也刷新下
		mounted(){
			this.$nextTick(()=>{
				this._initScroll();
				//是否默认滚动到底部
				if(this.bottom){
					this.scrollTo(0,this.scroll.maxScrollY-50)
				}
			})
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
				
				if(this.listenScroll){
					let me = this;
					this.scroll.on('scroll',(pos)=>{
						me.$emit('scroll',pos)
					})
				}

				if(this.pullup){
					this.scroll.on('scrollEnd',()=>{
						if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
							this.$emit('scrollToEnd')
						}
					})
				}
				if(this.pulldown){
					this.scroll.on('scrollEnd',()=>{
						if(this.scroll.y >= 0){						
							this.$emit('scrollToEnd',this.scroll.y)
						}
					})
				}
				if(this.beforeScroll){
					this.scroll.on('beforeScrollStart',()=>{
						this.$emit('beforeScroll')
					})
				}
				
			}, 
			enable(){
				this.scroll && this.scroll.enable();
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		// 这个挺关键的
		watch:{
			data(){
				setTimeout(()=>{
				this.refresh()
			},20)
			}
		}
	}
</script>

<style>
</style>