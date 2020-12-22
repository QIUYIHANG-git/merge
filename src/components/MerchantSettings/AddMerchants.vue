<template>
	<!-- 商户列表新增用户页面 -->
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商户设置</el-breadcrumb-item>
			<el-breadcrumb-item>商户列表</el-breadcrumb-item>
			<el-breadcrumb-item>新增用户</el-breadcrumb-item>
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
						<el-form-item label="活动名称" prop="name">
							<el-input v-model="ruleForm.name" style="width: 31.25rem;" ></el-input>
						</el-form-item>
						<el-divider></el-divider>
						<el-form-item label="活动名称" prop="name">
							<el-input v-model="ruleForm.name" style="width: 31.25rem;" ></el-input>
						</el-form-item>
						<el-divider></el-divider>
						<el-form-item label="是否限制优惠劵分配张数" prop="name" label-suffix='asdasds' >
							<el-radio v-model="radio" label="1">不限制</el-radio>
							<el-radio v-model="radio" label="2">限制	</el-radio>
							<el-input v-model="ruleForm.name" style="width: 18.75rem;" disabled></el-input>
							张
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
				radio: '1'
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			addMerchantsPop() {
				this.$router.push('/MerchantsList/AddMerchants')
			},
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
			getBeforeReturn(){
				this.$router.push('/MerchantsList')
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
	.surface-card{
		// 新增from表
		.addSurface{
			width: 100%;
			height: 400px;
			display: flex;
			justify-content: center;
			.addSurface-box{
				width: 100%;
				text-align: left !important;
				.btnAdd{
					text-align: center;
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
</style>
