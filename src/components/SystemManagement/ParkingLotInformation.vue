<template>
	<div class="distri-page">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="distribution">
			停车场基本信息
		</div>

		<el-card class="box-card">
			<el-form ref="form" :model="form" label-width="80px" label-position='left'>
				<el-form-item label="首字母" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-form-item label="停车场名称" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-form-item label="总停车位" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-form-item label="停车场地址" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-form-item label="停车场定位" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-form-item label="停车场类型" label-width="100px">
					<el-input v-model="form.name" style="width: 31.25rem;"></el-input>
				</el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" class="btnAdd">修改</el-button>
				<el-button @click=''>取消</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped="scoped" lang="less">
	.distri-page {
		width: 100%;
		height: 100%;
		background-color: #4D4D4D;
		text-align: left;

		.top-box {
			color: #fff;
			padding: 1.25rem 0.875rem;
			margin-left: 2.0rem;

			span {
				margin-right: 1.25rem;
			}
		}

		.distribution {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;
			color: #fff;
			padding: 0.875rem 0;
			background-color: #717171;
		}
	}
</style>
