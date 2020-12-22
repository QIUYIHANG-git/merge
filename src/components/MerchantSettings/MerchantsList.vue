<template>
	<!-- 商户列表页面 -->
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商户设置</el-breadcrumb-item>
			<el-breadcrumb-item>商户列表</el-breadcrumb-item>
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
		<el-card class="box-card">
			<div class="header-box">
				<div>
					<i></i>
					<span>商户列表</span>
				</div>
				<el-button type="primary" icon="el-icon-plus" @click='addMerchantsPop()'>新增商户</el-button>
			</div>

			<!-- 表格 -->
			<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="name" label="商户名称" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="180">
				</el-table-column>
				<el-table-column prop="couponNum" label="剩余优惠卷数量">
				</el-table-column>
				<el-table-column prop="limit" label="优惠卷分配限制">
				</el-table-column>
				<el-table-column prop="depositAmount" label="预存金额">
				</el-table-column>
				<el-table-column label="账户操作">
					<el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="open">删除</el-button>
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
				currentPage4: 4
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
			addMerchantsPop(){
				this.$router.push('/MerchantsList/AddMerchants')
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

	// 商户表表头
	.header-box {
		height: 3.125rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
