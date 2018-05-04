<template>
	<transition name="showed">
		<div class="changeConfirm">
			<div class="confirm_con">
				<slot></slot>
				<!--<div class="confirm_top">提示</div>
				<div class="confirm_center">{{str}}</div>
				<div class="confirm_bottom" @click="changeshow()">确定</div>-->
			</div>
		</div>
	</transition>
	
</template>

<script>
</script>

<style>

</style>