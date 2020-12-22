<template>
	<!-- 商户列表页面 -->
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商户设置</el-breadcrumb-item>
			<el-breadcrumb-item>商户列表</el-breadcrumb-item>
			<el-breadcrumb-item>新增电子劵</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 当前停车场 -->
		<el-card class="box-card">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-card>
		<!-- 商户列表 -->
		<el-card class="surface-card">
			<div class="addSurface">
				<div class="addSurface-box">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="30%" class="demo-ruleForm">
						<el-form-item label="优惠名称" prop="name">
							<el-input v-model="ruleForm.name" style="width: 17.5rem;"></el-input>
						</el-form-item>
						<el-divider></el-divider>
						<el-form-item label="活动名称" prop="name">
							<el-radio v-model="radio1" label="1">全免</el-radio>
							<el-radio v-model="radio1" label="2">只免当天</el-radio><br>
							<div class="mian">
								<div>
									<el-radio v-model="radio2" label="1">减免金额</el-radio>
									<el-input :disabled="true" inline='false' v-model="ruleForm.name" style="width:9.375rem;">
										<template slot="append">元</template>
									</el-input>
								</div>
								<div class="zhong">
									<el-radio v-model="radio2" label="2">减免时长</el-radio>
									<el-input :disabled='false' inline='false' v-model="ruleForm.name" style="width:9.375rem;">
										<template slot="append">小时</template>
									</el-input>
								</div>
								<div>
									<el-radio v-model="radio2" label="3">车费打折</el-radio>
									<el-input :disabled='false' inline='false' v-model="ruleForm.name" style="width:9.375rem;">
										<template slot="append">折</template>
									</el-input>
								</div>
							</div>
						</el-form-item>
						<el-divider></el-divider>
						<el-form-item label="是否限制优惠劵分配张数" prop="name" class="zhang">
							<el-input v-model="ruleForm.name" style="width: 17.5rem;" placeholder="0">
								<template slot="append">元</template>
							</el-input>

						</el-form-item>
						<el-divider></el-divider>
						<!-- 多选 -->
						<el-form-item label="活动名称" prop="name">
							<div class="duo">
								<!-- 全选 -->
								<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
								<div style="margin: 15px 0;"></div>
								<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
									<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
								</el-checkbox-group>
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
	const cityOptions = ['上海', '北京', '广州', '深圳','深圳', '北京', '广州', '深圳','深圳', '北京', '广州', '深圳'];
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
				// 表格测试数据
				tableData: [{
					phone: '13302335465',
					name: '王小虎',
					couponNum: 10,
					limit: "无",
					depositAmount: '2000元'
				}, {
					phone: '13302335465',
					name: '周小龙',
					couponNum: 15,
					limit: "当天使用",
					depositAmount: '4000元'
				}],
				currentPage4: 4,
				ruleForm: {
					name: '',
				},
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
					]
				},
				radio: '1',
				radio1: '1',
				radio2: '1',
				checkAll: false,
				checkedCities: ['上海'],
				cities: cityOptions,
				isIndeterminate: true

			}
		},
		methods: {
			open() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
			},
			// handleSizeChange(val) {
			// 	console.log(`每页 ${val} 条`);
			// },
			// handleCurrentChange(val) {
			// 	console.log(`当前页: ${val}`);
			// },
			// handleSelectionChange(val) {
			// 	this.multipleSelection = val;
			// },
			// addMerchantsPop() {
			// 	this.$router.push('/CommercialTenant/AddMerchants')
			// },
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getBeforeReturn() {
				this.$router.push('/CommercialTenant')
			},
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			}

		}

	}
</script>

<style lang="less" scoped>
	// 当前停车场
	.box-card {
		text-align: left !important;
		margin-bottom: 0.9375rem;

		span {
			margin-right: 20px;
		}
	}

	.surface-card {

		// 新增from表
		.addSurface {
			width: 100%;
			height: 42.5rem;
			display: flex;
			justify-content: center;

			.addSurface-box {
				width: 100%;
				text-align: left !important;

				.btnAdd {
					margin-left: 34.375rem;
					margin-right: 3.125rem;
				}
			}
		}
	}


	// 商户表表头
	.header-box {
		height: 3.125rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mian {
		display: flex;
		flex-direction: column;

		.zhong {
			margin: 10px 0;
		}

		/deep/.el-input-group__append {
			background-color: #fff;
			border-left: none;
		}

		/deep/.el-input__inner {
			border-right: none;
		}
	}

	.zhang {
		/deep/.el-input__inner {
			border-right: none;
		}

		/deep/.el-input-group__append {
			border-left: none;
			background-color: #fff;
		}
	}
	.duo{
		width: 25rem;
	}
</style>
