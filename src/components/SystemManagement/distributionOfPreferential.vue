<template>
	<!-- 规则设置 -->
	<div class="distri-page">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="distribution">
			规则设置
		</div>

		<el-card class="box-card">
			<h3>车场运行规则</h3>
			
			<p>优惠规则</p>
			<div>
				<el-checkbox v-model="checked">
					没自然日可使用<el-input style="width: 3.125rem;" v-model="input" placeholder="1"></el-input>次
				</el-checkbox>
				<el-checkbox v-model="checked">
					没自然日可使用<el-input style="width: 3.125rem;" v-model="input" placeholder="1"></el-input>次
				</el-checkbox>
				<el-checkbox v-model="checked">
					没自然日可使用<el-input style="width: 3.125rem;" v-model="input" placeholder="1"></el-input>次
				</el-checkbox>
				<span>注：当次数为0时，表示不限制</span>
			</div>
			<p>优惠规则</p>
			<el-form ref="form" :inline='true' :model="form" label-width="80px" label-position='left'>
				<el-form-item label="首字母" label-width="100px">
					<el-input v-model="form.name" style="width: 12.5rem;"></el-input>
				</el-form-item>
				<el-form-item label="停车场名称" label-width="100px">
					<el-input v-model="form.name" style="width: 12.5rem;"></el-input>
				</el-form-item>
				<el-form-item label="总停车位" label-width="100px">
					<el-input v-model="form.name" style="width: 12.5rem;"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="submitForm('ruleForm')" class="btnAdd">修改</el-button>
			<el-button @click=''>取消</el-button>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				checked: true
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
