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
			预存账户设置
		</div>

		<el-card class="box-card">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' :inline="true" class="demo-ruleForm">
				<el-form-item label="商户名称:" prop="name">
					<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
				<el-form-item label="联系电话:" prop="region">
					<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
				<el-form-item label="启用状态:" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域" clearable>
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" size="medium" class="btnSou" icon="el-icon-search">搜索</el-button>
			</el-form>
		</el-card>

		<el-card class="surface-card">
			<div class="addSurface">
				<div class="addSurface-box">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="30%" class="demo-ruleForm">
						<!-- 商户名称 -->
						<el-form-item label="优惠名称" prop="name">
							<el-select v-model="ruleForm.region" placeholder="请选择活动区域" clearable>
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-divider></el-divider>
						<!-- 联系电话 -->
						<el-form-item label="活动名称" prop="name">
							<el-input v-model="ruleForm.name" style="width: 17.5rem;" placeholder="请输入内容" clearable disabled></el-input>
						</el-form-item>
						<el-divider></el-divider>
						<!-- 充值设置 -->
						<el-form-item label="充值设置" prop="name" class="zhang">
							<el-radio v-model="radio1" label="1">赠送</el-radio>
							<el-radio v-model="radio1" label="2">不赠送</el-radio><br>
							<!-- 充值表单 -->
							<div class="recharge">
								<el-table :data="tableData" stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
								 style="width: 100%" :show-header="false">
									<el-table-column prop="date" >
										<span>充值：</span> </span><el-input v-model="ruleForm.name" placeholder="请输入内容" clearable size="mini"></el-input>
									</el-table-column>
									<el-table-column prop="name" >
										<span>赠送：</span><el-input disabled v-model="ruleForm.name" placeholder="请输入内容" clearable size="mini"></el-input>
									</el-table-column>
									<el-table-column>
										<i class="el-icon-delete"></i>
									</el-table-column>
								</el-table>
							</div>
						</el-form-item>
						<el-divider></el-divider>

						<!-- 账户设置 -->
						<el-form-item label="账户设置" prop="name">
							<div class="recharge">
								<span>预存账户最低使用额度：</span><el-input  v-model="ruleForm.name" placeholder="请输入内容" clearable size="mini">
									<template slot="append">元</template>
								</el-input>
							</div>
						</el-form-item>
						<el-divider></el-divider>

						<el-button type="primary" @click="submitForm('ruleForm')" class="btnAdd">确定</el-button>
						<el-button @click='getBeforeReturn()'>返回</el-button>
					</el-form>
				</div>
			</div>
		</el-card>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 停车场测试数据
				options: [{
					value: '选项1',
					label: '长沙旭辉国际广场停车场'
				}, {
					value: '选项2',
					label: '长沙京武浪琴山停车场'
				}, {
					value: '选项3',
					label: '长沙新城新世界停车场'
				}],
				// 停车场测试选中的数据
				value: '',
				// 搜索表单验证数据
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				// 表单验证规则
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
				},
				// // 操作成功
				// succeed: true,
				// 充值表单
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
				}]
			}
		},
		methods: {
			shoSucceed() {
				this.succeed = true
			},
			getBeforeReturn(){
				this.$router.push('/DepositAccount')
			}
			
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

		// 充值表单
		.recharge {
			width: 25rem;
		}
	}
</style>
