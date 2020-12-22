<template>
	<!-- 纸质优惠券使用记录 -->
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商户报表</el-breadcrumb-item>
			<el-breadcrumb-item>纸质优惠券使用记录</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 当前停车场 -->
		<el-card class="box-card">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-card>

		<!-- 优惠劵名称模块-->
		<el-card class="box-card coupon-box">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' :inline="true" class="demo-ruleForm">
				<!-- 公司名称 -->
				<el-form-item label="公司名称:" prop="region">
					<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
				<!-- 车牌号 -->
				<el-form-item label="车牌号:" prop="region">
					<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
				<!-- 优惠劵内容 -->
				<el-form-item label="优惠内容:" prop="name">
					<el-select v-model="ruleForm.region" placeholder="全部内容" clearable>
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<!-- 使用时间 -->
				<el-form-item label="使用时间:" prop="region">
					<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-button type="primary" size="medium" class="btnSou" icon="el-icon-search">搜索</el-button>
			</el-form>
		</el-card>

		<!-- 商户列表 -->
		<el-card class="box-card">
			<div class="header-box">
				<div>
					<i></i>
					<span>纸质优惠券使用记录</span>
				</div>
				<el-button type="primary" icon="el-icon-plus">新建电子劵</el-button>
			</div>

			<!-- 表格 -->
			<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
			 :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column prop="name" label="公司名称" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="优惠劵内容" width="180">
				</el-table-column>
				<el-table-column prop="couponNum" label="优惠劵有效期">
				</el-table-column>
				<el-table-column prop="limit" label="打印数量">
				</el-table-column>
				<el-table-column prop="depositAmount" label="打印时间">
				</el-table-column>
				<el-table-column prop="purchase" label="操作员">
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
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
					// 内容
					phone: '停车1折',
					// 优惠劵名称
					name: '商场打折劵',
					// 单价
					couponNum: 1,
					// 创建者
					limit: "小王",
					// 创建时间
					depositAmount: '2020-12-11 17:32:54',
					// 可购买权限
					purchase:"商户列表"
				}, {
					phone: '抵用3元',
					name: '减免3元',
					couponNum: 1,
					limit: "当天使用",
					depositAmount: '2020-12-11 17:32:54',
					purchase:"商户列表"
					
				}],
				// 分页
				currentPage4: 4,
				// 下拉获取的值
				input: '',
				// 创建时间的值
				value1: '',
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
				rules: {
					name: [{
							// required: true,
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
					region: [{
						// required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						// required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						// required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						// required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						// required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						// required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				}
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

	// 优惠劵名称模块

	.coupon-box {
		margin-bottom: 0.9375rem;

		.demo-ruleForm {
			width: 100%;
			height: 100%;
			margin-top: 1.25rem;
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
