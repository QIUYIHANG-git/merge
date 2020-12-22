<template>
	<div class="user-manage-box">
		<div class="pages">
			<div class="messge-itme">
				<div :class="doubt?'activate':'deactivation'" @click="favorablePrice">
					<span>查看用户</span>
				</div>
				<div :class="doubtTow?'activate':'deactivation'" @click="account">
					<span>添加用户</span>
				</div>
			</div>
			<!-- 查看用户区域 -->
			<div class="user-list-box" v-show="userLook">
				<div>
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column label="选择" width="50">
							<el-checkbox v-model="checked"></el-checkbox>
						</el-table-column>
						<el-table-column prop="userId" label="编号" width="180">
						</el-table-column>
						<el-table-column prop="username" label="用户名" width="180">
						</el-table-column>
						<el-table-column prop="name" label="姓名">
						</el-table-column>
						<el-table-column prop="phoneNumber" label="手机号">
						</el-table-column>
						<el-table-column prop="sex" label="性别">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<div style="display: flex;justify-content: left;align-items: center;color: aliceblue;cursor: pointer;">
									<span style="margin-right: 0.625rem;padding: 0.3125rem;background-color: #d9c14a;border-radius: 0.3125rem;"
									 @click="spanclick(scope.$index, scope.row)">编辑</span>
									<span style="margin-right: 0.625rem;padding: 0.3125rem;background-color: #4089b9;border-radius: 0.3125rem;">角色</span>
									<span style="margin-right: 0.625rem;padding: 0.3125rem;background-color: #b95533;border-radius: 0.3125rem;">删除</span>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- 分页区域 -->
				<div class="paging-box">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page.sync="pagenum"
					  :page-size="10"  layout="prev, pager, next, jumper"   :total="100">
					</el-pagination>
				</div>
			</div>
			<!-- 添加用户区域 -->
			<div class="add-user" v-show="userAdd">
				<el-form ref="form" :model="form" label-width="80px" style="width: 50%;margin: 80px auto;">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="用户名">
						<el-input v-model="form.userName"></el-input>
					</el-form-item>
					<el-form-item label="用户密码">
						<el-input v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-radio-group v-model="form.radio">
							<el-radio :label="1">男</el-radio>
							<el-radio :label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="籍惯">
						<el-input v-model="form.nativePlace"></el-input>
					</el-form-item>
					<el-form-item label="备注">
						<el-input v-model="form.notes"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-if="offSave" @click="onSubmit">保存</el-button>
						<el-button type="primary" v-else-if="offCompile" @click="oncompile">编辑保存</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				// 选择时间
				value1: '',
				value: '',
				// 下拉选项
				options: [{
					label: '指南'
				}, {
					label: '反馈'
				}, {
					label: '反馈'
				}],
				// 当前页数
				pagenum:1,
				// 表格
				tableData: [
					// {
					// 	userId: '123',
					// 	username: 'admin',
					// 	phoneNumber: '15578946352',
					// 	sax: '女',
					// 	name: '小红'
					// }
				],
				// 显示激活状态
				doubt: true,
				doubtTow: false,
				// 选项
				checked: true,
				// 显示
				userLook: true,
				userAdd: false,
				// 表单
				form: {
					name: '',
					userName: '',
					password: '',
					radio: 1,
					phone: '',
					email: '',
					nativePlace: '',
					notes: ''
				},
				// 
				offSave: true,
				offCompile: false,
				// 编辑ID
				userId: ''
			}
		},
		methods: {
			//页面列表方法
			getSeeMonthlyCard(indexe){
				let _this = this
				this.$post('/user/queryByExample', {
						index: indexe,
						pageSize: 10
						// username: this.$Cookie.get('username')
					})
					.then(res => {
						_this.tableData = res.data.list
						console.log('----------》》》', res)
					})
					.catch(err => {
						console.log(err)
					})
			},
			//监听pagesize改变的事件
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			//监听页码值改变的事件
			handleCurrentChange(val) {
				this.getSeeMonthlyCard(val)
				console.log(`当前页: ${val}`);
			},
			// 下拉触发事件/
			handleChange() {

			},
			// 显示查看用户
			favorablePrice() {
				this.doubt = true;
				this.doubtTow = false;
				this.userLook = true;
				this.userAdd = false;
			},
			// 显示添加用户
			account() {
				this.doubt = false;
				this.doubtTow = true;
				this.userLook = false;
				this.userAdd = true;
				this.offSave = true
			},
			// 添加用户
			onSubmit() {
				console.log(this.form)
				let _this = this;
				console.log('------------->>>', _this.$http + '/user/insert');
				_this.$put('/user/insert', {
						email: _this.form.email,
						location: _this.form.nativePlace,
						name: _this.form.name,
						notes: _this.form.notes,
						password: _this.form.password,
						username: _this.form.userName,
						phoneNumber: _this.form.phone,
						sex: _this.form.radio
					})
					.then(res => {
						if (res.code != 0) {
							_this.$message(res.msg)
							return
						}
						_this.$message(res.data)
						_this.favorablePrice()
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 编辑
			spanclick(index, row) {
				console.log('编辑')
				this.offSave = false
				this.offCompile = true
				this.doubt = false;
				this.doubtTow = true;
				this.userLook = false;
				this.userAdd = true;
				console.log(index, row)
				// 选中参数
				this.form.name = row.name
				this.form.email = row.email
				this.form.nativePlace = row.location
				this.form.userName = row.username
				this.form.password = row.password
				this.form.radio = row.sex
				this.form.phone = row.phoneNumber
				this.form.notes = row.notes
				this.userId = row.userId
			},
			//编辑保存
			oncompile() {
				let _this = this
				console.log(this.userId)
				console.log(_this.form)
				_this.$post('/user/update', {
						userId: _this.userId,
						name: _this.form.name,
						email: _this.form.email,
						location: _this.form.nativePlace,
						userName: _this.form.userName,
						password: _this.form.password,
						radio: _this.form.radio,
						phone: _this.form.phone,
						notes: _this.form.notes
					})
					.then(res => {
						if (res.code != 0) {
							_this.$message(res.msg)
							return
						}
						console.log(res)
						_this.$message(res.data)
						_this.favorablePrice()
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {
			console.log(this.$Cookie.get('userId'))
			console.log(this.$Cookie.get('username'))
			this.getSeeMonthlyCard(1);
			// this.$post('/user/queryByExample', {
			// 		index: 1,
			// 		pageSize: 10
			// 		// username: this.$Cookie.get('username')
			// 	})
			// 	.then(res => {
			// 		_this.tableData = res.data.list
			// 		console.log('----------》》》', res)
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
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

	.user-manage-box {
		text-align: left;
		// padding: 4rem 3rem;
		font-size: @font;
		background-color: rgba(144, 144, 144, 1.0);
		border-radius: 0.875rem;

		.pages {
			// background-color: #fff;
			padding-top: 20px;
			width: 100%;
			border-radius: 0.875rem;

			.messge-itme {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgb(113, 113, 113);
				margin-bottom: 20px;
				color: #fff;
				align-items: center;
				padding: @usertb @userleft;

				.activate {
					padding: @usertb;
					box-sizing: border-box;
					margin-right: 50px;
					cursor: pointer;

					span {
						padding-bottom: 0.2rem;
						border-bottom: 0.125rem solid rgba(78, 165, 254, 1);
					}
				}

				.deactivation {
					cursor: pointer;
					padding: @usertb;
					margin-right: 50px;
					box-sizing: border-box;

					span {
						padding-bottom: 0.875rem;
					}
				}
			}

			.user-list-box {
				padding: 0 @userleft;

				.list-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: @usertb 0;

					.list-title {
						font-size: 1.0625rem;
					}

					.btn-box {}

				}
			}

			.add-user {
				padding: 0.875rem;
			}

			.paging-box {
				padding: 5px 0;
				display: flex;
				justify-content: center;
			}
		}

	}
</style>
