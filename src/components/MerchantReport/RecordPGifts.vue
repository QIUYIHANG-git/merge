<template>
	<!-- 物业赠送优惠记录 -->
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商户报表</el-breadcrumb-item>
			<el-breadcrumb-item>物业赠送优惠记录</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 当前停车场 -->
		<el-card class="box-card">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-card>


		<el-card class="box-card">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- 立即赠送优惠记录 -->
				<el-tab-pane label="立即赠送优惠记录" name="first">
					<!-- 搜索模块 -->
					<div>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" class="demo-ruleForm" size="mini">													
							<!-- 商户名称 -->
							<el-form-item label="商户名称:" prop="name">
								<el-select v-model="ruleForm.region" placeholder="请选择活动区域" clearable>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<!-- 优惠名称 -->
							<el-form-item label="优惠名称:" prop="region">
								<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
							</el-form-item>
							<!-- 赠送时间 -->
							<el-form-item label="赠送时间:" prop="region">
								<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<!-- 搜索按钮 -->
							<el-button type="primary" size="mini" class="btnSou" icon="el-icon-search">搜索</el-button>
						</el-form>
					</div>

					<!-- 商户列表 -->
					<div class="header-box">
						<div>
							<i></i>
							<span>物业立即赠送优惠记录</span>
						</div>
						<el-button type="primary" icon="el-icon-plus">导出文件</el-button>
					</div>

					<!-- 表格 -->
					<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column prop="phone" label="商户名称">
						</el-table-column>
						<el-table-column prop="couponNum" label="优惠内容">
						</el-table-column>
						<el-table-column prop="limit" label="优惠券名称">
						</el-table-column>
						<el-table-column prop="depositAmount" label="赠送数量">
						</el-table-column>
						<el-table-column prop="depositAmount" label="赠送时间">
						</el-table-column>
					</el-table>

					<!-- 分页 -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
					 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
					</el-pagination>
				</el-tab-pane>

				<!-- 定时赠送优惠记录 -->
				<el-tab-pane label="定时赠送优惠记录" name="second">
					<!-- 搜索模块 -->
					<div>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" class="demo-ruleForm" size="mini">													
							<!-- 商户名称 -->
							<el-form-item label="商户名称:" prop="name">
								<el-select v-model="ruleForm.region" placeholder="请选择活动区域" clearable>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<!-- 优惠名称 -->
							<el-form-item label="优惠名称:" prop="region">
								<el-input v-model="ruleForm.name" placeholder="请输入内容" clearable></el-input>
							</el-form-item>
							<!-- 赠送时间 -->
							<el-form-item label="赠送时间:" prop="region">
								<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<!-- 搜索按钮 -->
							<el-button type="primary" size="mini" class="btnSou" icon="el-icon-search">搜索</el-button>
						</el-form>
					</div>
				
					<!-- 商户列表 -->
					<div class="header-box">
						<div>
							<i></i>
							<span>物业定时赠送优惠记录</span>
						</div>
						<el-button type="primary" icon="el-icon-plus">导出文件</el-button>
					</div>
				
					<!-- 表格 -->
					<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column prop="phone" label="商户名称">
						</el-table-column>
						<el-table-column prop="couponNum" label="优惠内容">
						</el-table-column>
						<el-table-column prop="limit" label="优惠券名称">
						</el-table-column>
						<el-table-column prop="depositAmount" label="赠送数量">
						</el-table-column>
						<el-table-column prop="depositAmount" label="赠送时间">
						</el-table-column>
					</el-table>
				
					<!-- 分页 -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
					 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
					</el-pagination>
				</el-tab-pane>
			</el-tabs>
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
				// 选项卡
				activeName: 'first',
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
					purchase: "商户列表"
				}, {
					phone: '抵用3元',
					name: '减免3元',
					couponNum: 1,
					limit: "当天使用",
					depositAmount: '2020-12-11 17:32:54',
					purchase: "商户列表"

				}],
				// 分页
				currentPage4: 4,
				// 搜索下拉获取的值
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
			handleClick(tab, event) {
				console.log(tab, event);
			},
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

<style lang="less" scoped="scoped">
	// 当前停车场
	.box-card {
		text-align: left !important;
		margin-bottom: 0.9375rem;

		span {
			margin-right: 20px;
		}
	}

	.header-box {
		display: flex;
		justify-content: space-between;
	}
</style>
