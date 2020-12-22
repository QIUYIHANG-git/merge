<template>
	<div class="paper-box">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	// 左距离
	@userleft: 3rem;
	// 上下距离
	@usertb: 0.2rem;
	// 字体大小
	@font: 14px;
	.paper-box{
		width: 100%;
		height: 100%;
		background-color: rgb(77, 77, 77);
		text-align: left;
		
		.top-box {
			color: #fff;
			padding: 1.25rem 0.875rem;
			margin-left: 2.0rem;
		
			span {
				margin-right: 1.25rem;
			}
		}
	}
</style>
