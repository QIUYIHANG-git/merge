<template>
	<div class="presented-box">
		<div class="top-box">
			<!-- <span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select> -->
			<span>当前停车场</span>
			<el-select v-model="parkName" placeholder="请选择" @visible-change="ondistr" @change="parkon">
				<el-option v-for="item in options" :key="item.parkId" :label="item.parkName" :value="item.parkId">
				</el-option>
			</el-select>
		</div>
		<!-- 赠送优惠与设置 -->
		<div class="messge-itme">
			<div :class="doubt?'activate':'deactivation'" @click="favorablePrice">
				<span>立即赠送优惠</span>
			</div>
			<div :class="doubtTow?'activate':'deactivation'" @click="account">
				<span>设置优惠赠送</span>
			</div>
		</div>
		<!--  -->
		<div class="form-box">
			<div class="select">
				<span>商户名称：</span>
				<!-- <el-select v-model="commercialName" placeholder="请选择">
					<el-option v-for="item in optionsx" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
				<el-select v-model="shopName" placeholder="请选择" @visible-change="oncommercial" @change="otshopId">
					<el-option v-for="item in obtions" :key="item.shopId" :label="item.shopName" :value="item.shopName">
					</el-option>
				</el-select>
			</div>
			<div class="select">
				<span>优惠卷名称</span>
				<el-input v-model="discountName" placeholder="请输入内容"></el-input>
			</div>
			<div class="select">
				<span>赠送时间：</span>
				<el-date-picker v-model="giveTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="select">
				<el-button type="primary" v-if="offseek" @click="seekClick">搜索</el-button>
				<el-button type="primary" v-else @click="seekTowClick">设置搜索</el-button>
			</div>
		</div>
		<!--  -->
		<div class="details-box" v-show="detailsShow">
			<div class="details-box-top">
				<div><i class="el-icon-s-promotion"></i>立即赠送列表</div>
				<!-- 打开立即赠送页面 -->
				<div>
					<el-button type="primary" @click="immediately">立即赠送优惠</el-button>
				</div>
			</div>
			<div class="form-box">
				<el-table :data="tableData" height="300" border style="width: 100%">
					<el-table-column prop="shopName" label="商户名称" width="180">
					</el-table-column>
					<el-table-column prop="couponInfo" label="优惠内容" width="180">
					</el-table-column>
					<el-table-column prop="couponName" label="优惠名称" width="180">
					</el-table-column>
					<el-table-column prop="giveNumber" label="赠送数量" width="180">
					</el-table-column>
					<el-table-column prop="operator" label="操作人" width="180">
					</el-table-column>
					<el-table-column prop="giveTime" label="赠送时间">
					</el-table-column>
				</el-table>
			</div>
			<div class="paging-box">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page.sync="pagenum"
				  :page-size="10"  layout="prev, pager, next, jumper"   :total="1000">
				</el-pagination>
			</div>
		</div>
		<!-- 优惠赠送设置页面 -->
		<div class="set-discount" v-show="setDiscount">
			<div class="set-discount-top">
				<div><i class="el-icon-s-promotion"></i>优惠赠送计划列表</div>
				<!-- 打开优惠赠送设置页面 -->
				<div>
					<el-button type="primary" @click="setDiscountShow">优惠赠送设置</el-button>
				</div>
			</div>
			<div class="form-box">
				<el-table :data="discountData" height="300" border style="width: 100%">
					<el-table-column prop="commodityName" label="商户名称">
					</el-table-column>
					<el-table-column prop="discountsName" label="优惠名称">
					</el-table-column>
					<el-table-column prop="discounts" label="赠送期限">
					</el-table-column>
					<el-table-column prop="give" label="赠送频率">
					</el-table-column>
					<el-table-column prop="give" label="是否清零">
					</el-table-column>
					<el-table-column prop="give" label="状态">
					</el-table-column>
					<el-table-column prop="addgiveTime" label="创建时间">
					</el-table-column>
					<el-table-column prop="name" label="操作人">
					</el-table-column>
					<el-table-column prop="name" label="操作">
					</el-table-column>
				</el-table>
			</div>
			<!-- <div class="paging-box">
				<el-pagination background layout="prev, pager, next" :total="100">
				</el-pagination>
			</div> -->
			<!-- 分页区域 -->
			<div class="paging-box">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page.sync="pagenum"
				  :page-size="10"  layout="prev, pager, next, jumper"   :total="1000">
				</el-pagination>
			</div>
		</div>
		<!-- 立即赠送页面 -->
		<div class="immediately-give" v-show="immediatelyGive">
			<div class="title">
				赠送商户优惠卷
			</div>
			<div class="warn">
				<i class="el-icon-sunrise"></i>立即赠送，即时到账，不清零，不可撤
			</div>
			<div class="column-one">
				<div class="column-one-itme">赠送商户:</div>
				<div class="column-one-itme">
					<el-select v-model="shopName" placeholder="请选择" @visible-change="oncommercial" @change="otshopId">
						<el-option v-for="item in obtions" :key="item.shopId" :label="item.shopName" :value="item.shopId">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="column-tow">
				<div class="column-tow-itme">赠送类别:</div>
				<div class="column-tow-itme">
					<el-select v-model="onlabel" placeholder="请选择">
						<el-option v-for="item in oetions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="column-therr">
				<div class="column-therr-itme">优惠卷:</div>
				<div class="column-therr-itme">
					<el-checkbox v-model="checked">全选中</el-checkbox>
					<div class="checkbox">
						<el-checkbox-group v-model="checkList">
							<el-checkbox v-for="(itme,index) in disc" :key="index" :label="itme.couponName" @change="update(index)"></el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
			</div>
			<div class="column-four">
				<div class="column-four-itme">赠送数量:</div>
				<div class="column-four-itme">
					<el-input placeholder="请输入内容" v-model="numberz">
						<template slot="append">张</template>
					</el-input>
				</div>
			</div>
			<div class="btn">
				<div class="btn-itme"></div>
				<div class="btn-itme">
					<el-button type="primary" @click="immediatelyClick">立即赠送</el-button>
					<el-button plain style="margin-right: 3.125rem;">返回</el-button>
				</div>
			</div>
		</div>
		<!-- 优惠赠送设置 -->
		<div class="set-give" v-show="setGive">
			<div class="title">
				赠送商户优惠卷
			</div>
			<!-- 未完成变量设置 -->
			<div class="give-one">
				<div class="give-one-itme">赠送商户:</div>
				<div class="give-one-itme">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in optionsx" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="give-tow">
				<div class="give-tow-itme">优惠卷:</div>
				<div class="give-tow-itme">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in optionsx" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="give-therr">
				<div class="give-therr-itme">赠送数量:</div>
				<div class="give-therr-itme">
					<el-input placeholder="请输入内容" v-model="number">
						<template slot="append">张</template>
					</el-input>
				</div>
			</div>
			<div class="give-four">
				<div class="give-four-itme">赠送频率*:</div>
				<div class="give-four-itme">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in optionsx" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="give-five">
				<div class="give-five-itme">赠送期限*:</div>
				<div class="give-five-itme">
					<el-date-picker v-model="tmiedata" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
			<div class="give-six">
				<div class="give-six-itme">是否清零:</div>
				<div class="give-six-itme">
					<el-radio-group v-model="radio">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="2">否</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="btn">
				<div class="btn-itme"></div>
				<div class="btn-itme">
					<el-button type="primary">立即设置</el-button>
					<el-button plain style="margin-right: 3.125rem;">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				doubt: true,
				doubtTow: false,
				// 显示
				detailsShow: true,
				setDiscount: false,
				// 立即赠送页面
				immediatelyGive: false,
				// 赠送设置页面
				setGive: false,
				// 当前页数
				pagenum:1,
				// 商户名称
				commercialName: '',
				// 优惠卷名称
				discountName: '',
				// 赠送时间
				giveTime: '',
				// 表格
				tableData: [{
					commodityName: '万利记',
					discounts: '停车费八折',
					discountsName: '车费打八折',
					give: '100',
					name: '小明',
					addgiveTime: '2020-12-18 11:11:11'
				}],
				// 
				discountData: [],
				// 立即赠送下拉一
				options: [],
				// 默认值
				parkName: "",
				// 商户下拉
				obtions: [],
				// 商户默认值
				shopName: '',
				// 
				optionsx: [],
				value: '',
				// 类别
				oetions: [{
					label: '优惠卷',
					value: "123456"
				}],
				// 赠送期限
				tmiedata:'',
				// 赠送优惠卷
				disc: [],
				// 类别默认值
				onlabel: '',
				// 全选中
				checked: true,
				// 选择
				checkList: ['选中且禁用', '复选框 A'],
				// 
				number: 1,
				// 是否清零
				radio: 1,
				// 停车ID
				parkId: '',
				// 优惠id
				parkLotId: '',
				//数量张
				numberz: 1,
				// 搜索按钮
				offseek: true
			}
		},
		methods: {
			//页面列表方法
			getSeeMonthlyCard(indexe){
				let _this = this
				this.$post('/coupon/findCouponList', {
						beginTime: '',
						couponName: this.discountName,
						endTime: '',
						pageIndex: indexe,
						pageSize: 10,
						parkingLotId: this.parkId,
						shopName: this.shopName
					})
					.then(res => {
						if (res.code != 0) {
							this.$message(res.msg)
							return
						} else {
							this.tableData = res.data.list
							console.log(res)
						}
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
			// 显示立即赠送优惠
			favorablePrice() {
				this.doubt = true
				this.doubtTow = false
				this.detailsShow = true
				this.setDiscount = false
				// 默认关闭
				this.immediatelyGive = false
				this.setGive = false
				// 
				this.offseek = true
			},
			// 显示设置优惠赠送
			account() {
				this.doubt = false
				this.doubtTow = true
				this.detailsShow = false
				this.setDiscount = true
				// 默认关闭
				this.immediatelyGive = false
				this.setGive = false
				// 
				this.offseek = false
			},
			// 打开立即赠送页面
			immediately() {
				this.detailsShow = false
				this.immediatelyGive = true

			},
			// 打开优惠赠送设置页面
			setDiscountShow() {
				this.setDiscount = false
				this.setGive = true

			},
			// 停车触发事件
			ondistr(e) {
				let _this = this
				if (e == true) {
					this.$fetch('/park/query', {
							index: 1,
							pageSize: 10
						})
						.then(res => {
							if (res.code != 0) {
								this.$message(res.msg);
								return
							} else {
								this.options = res.data.list;
								console.log(res);
							}
						})
						.catch(err => {
							console.log(err);
						})
				}
			},
			// 停车选择事件
			parkon(parkId) {
				this.parkId = parkId;
				console.log(this.parkId);
			},
			// 充值商户选择事件
			otshopId(Id) {
				let _this = this
				this.shopId = Id
				console.log("----------->>>", this.shopId)
				// 列表
				_this.$fetch('/coupon/getShopCoupon', {
						shopId: this.shopId
					})
					.then(res => {
						if (res.code != 0) {
							_this.$message(res.msg)
							return
						} else {
							this.disc = res.data
							console.log(res)
						}
					})
					.catch(err => {
						console.log(err)
					})

			},
			// 商户下拉事件
			oncommercial(e) {
				let _this = this
				if (e == true) {
					this.$post('/shop/queryByExample', {
							// 未动态
							index: 1,
							limitCoupon: 1,
							pageSize: 5,
							parkId: _this.parkId,
							// phoneNumber: _this.$Cookie.get('phoneNumber')
						})
						.then(res => {
							this.obtions = res.data.list
							console.log(this.obtions)
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			// 更新之后
			update(index) {
				console.log(index)
				this.parkLotId = this.disc[index].electricCouponId
			},
			// 立即赠送
			immediatelyClick() {
				this.$post('/coupon/giveCoupon', {
						giveCategorys: [this.parkLotId],
						givenumber: this.numberz,
						parkLotId: this.parkId,
						shopid: this.shopId
					})
					.then(res => {
						if (res.code != 0) {
							this.$message(res.msg)
							return
						} else {
							this.$message(res.msg)
							this.favorablePrice()
							console.log(res)
						}

					})
					.catch(err => {
						console.log(err)
					})
			},
			// 搜索列表
			seekClick() {
				console.log(this.shopName)
				console.log(this.discountName)
				console.log(this.giveTime[0])
				this.$post('/coupon/findCouponList', {
						beginTime: '',
						couponName: this.discountName,
						endTime: '',
						pageIndex: 1,
						pageSize: 10,
						parkingLotId: this.parkId,
						shopName: this.shopName
					})
					.then(res => {
						if (res.code != 0) {
							this.$message(res.msg)
							return
						} else {
							this.tableData = res.data.list
							console.log(res)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 搜索列表
			seekTowClick() {
				console.log(this.shopName)
				console.log(this.discountName)
				console.log(this.giveTime[0])
				// this.$post('/electricCoupon/query',{
				// 	parkId :0,
				// 	index:1,
				// 	pageSize :10
				// })
				// .then(res =>{
				// 	if(res.code !=1){
				// 		this.$message(res.msg)
				// 		return
				// 	}else{
				// 		console.log(res)
				// 	}
				// })
				// .catch(err => {
				// 	console.log(err)
				// })
			}
		},

	}
</script>

<style scoped="scoped" lang="less">
	// 左距离
	@userleft: 3rem;
	// 上下距离
	@usertb: 0.2rem;
	// 字体大小
	@font: 14px;

	.presented-box {
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

		.messge-itme {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgb(113, 113, 113);
			margin-bottom: 10px;
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

		.form-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			width: 90%;
			margin: 0 auto;
			padding: 0.875rem;
			border-radius: 0.5rem;

			.select {
				display: flex;
				justify-content: space-between;
				align-items: center;

				span {
					width: 6.75rem;
					font-size: 0.875rem;
					color: #000;
				}
			}
		}

		// 
		.details-box {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;

			.details-box-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 0.875rem;
				margin-bottom: 10px;
			}
		}

		// 
		.set-discount {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;

			.set-discount-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 0.875rem;
				margin-bottom: 10px;
			}
		}

		// 立即赠送
		.immediately-give {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;

			.title {
				padding: 10px 0;
				font-size: 1rem;
			}

			.warn {
				padding: 10px;
				background-color: rgb(224, 234, 246);
				color: rgb(43, 93, 152);
			}

			.column-one {
				display: flex;
				justify-content: left;
				padding: 1.25rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.column-one-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.column-tow {
				display: flex;
				justify-content: left;
				padding: 1.25rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.column-tow-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.column-therr {
				display: flex;
				justify-content: left;
				padding: 1.25rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.column-therr-itme {
					width: 50%;
					font-weight: bold;

					.checkbox {
						margin-top: 0.625rem;
						padding: 10px;
						border: 1px solid rgba(0, 0, 0, .2);
					}
				}
			}

			.column-four {
				display: flex;
				justify-content: left;
				padding: 1.25rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.column-four-itme {
					width: 50%;
					font-weight: bold;
				}

			}

			.btn {
				display: flex;
				justify-content: left;
				padding: 0.625rem 0;

				.btn-itme {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}

		.set-give {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;

			.title {
				padding: 10px 0;
				font-size: 1rem;
			}

			.give-one {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-one-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.give-tow {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-tow-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.give-therr {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-therr-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.give-four {
				display: flex;
				justify-content: left;
				padding: 0.25rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-four-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.give-five {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-five-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.give-six {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.give-six-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.btn {
				display: flex;
				justify-content: left;
				padding: 0.625rem 0;

				.btn-itme {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>
