<template>
	<div class="feedback child">
		<mt-header fixed title="意见反馈">
				<router-link to="/myself" slot="left">
					<mt-button icon="back">关闭</mt-button>
				</router-link>
		</mt-header>
		<div class="wrap">
			<textarea class="feedTextarea" placeholder="请输入反馈意见（输入上限为240字）"></textarea>
			<mt-button type="primary" class="save" >提交</mt-button>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.feedTextarea{
		display: inline-block;
		width: 100%;
		min-height: 14rem;
		border: none;
		resize: none;
		outline: none;
		padding: 1rem 0;
		color: #9494949;
	}
	.save{
		position: absolute;
		bottom: 3rem;
		left:15%;
		width: 70%;
    	
	}
</style>