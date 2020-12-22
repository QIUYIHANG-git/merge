<template>
	<div class="cash-box">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="parkName" placeholder="请选择" @visible-change="ondistr" @change="parkon">
				<el-option v-for="item in options" :key="item.parkId" :label="item.parkName" :value="item.parkId">
				</el-option>
			</el-select>
		</div>
		<!-- 现金购买与现金充值 -->
		<div class="messge-itme">
			<div :class="doubt?'activate':'deactivation'" @click="favorablePrice">
				<span>现金购买优惠卷</span>
			</div>
			<div :class="doubtTow?'activate':'deactivation'" @click="account">
				<span>预存账户现金充值</span>
			</div>
		</div>
		<!-- 现金购买优惠卷盒子页面 -->
		<div class="cash-page" v-show="offCash">
			<div class="cash-one">
				<div class="cash-one-itme">购买商户:</div>
				<div class="cash-one-itme">
					<el-select v-model="shopName" placeholder="请选择" @visible-change="oncommercial" @change="onshopId">
						<el-option v-for="item in obtions" :key="item.shopId" :label="item.shopName" :value="item.shopId">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="cash-tow">
				<div class="cash-tow-itme">可购买优惠卷:</div>
				<div class="cash-tow-itme">
					<div class="invitation-box" v-for="(itme,index) in counts" :key="index" @click="divClick(index)">
						<div class="invitation-one">减免{{itme.freeMoney}}元</div>
						<div class="invitation-tow">停车费减免{{itme.freeMoney}}元</div>
						<div class="invitation-therr">单价：{{itme.couponPrice}}元</div>
					</div>
				</div>
			</div>
			<div class="cash-therr">
				<div class="cash-therr-itme">购买数量:</div>
				<div class="cash-therr-itme">
					<el-input placeholder="请输入内容" v-model="number">
						<template slot="append">张</template>
					</el-input>
				</div>
			</div>
			<div class="cash-four">
				<div class="cash-four-itme">需要收现金:</div>
				<div class="cash-four-itme">
					<span>{{moneys}}</span>
				</div>
			</div>
			<div class="cash-five">
				<div class="cash-five-itme">备注:</div>
				<div class="cash-five-itme">
					<el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="60" show-word-limit>
					</el-input>
				</div>
			</div>
			<div class="btn">
				<el-button type="primary" @click="open">确定购买</el-button>
			</div>
		</div>
		<!-- 预存账户现金充值页面 -->
		<div class="prestore-box" v-show="offPrestore">
			<div class="prestore-one">
				<!-- <div class="prestore-one-itme">购买商户:</div>
				<div class="prestore-one-itme">
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div> -->
				<div class="prestore-one-itme">购买商户:</div>
				<div class="prestore-one-itme">
					<el-select v-model="shopName" placeholder="请选择" @visible-change="oncommercial" @change="otshopId">
						<el-option v-for="item in obtions" :key="item.shopId" :label="item.shopName" :value="item.shopId">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="prestore-tow">
				<div class="prestore-tow-itme">账户余额:</div>
				<div class="prestore-tow-itme">
					{{balance}}
				</div>
			</div>
			<div class="prestore-therr">
				<div class="prestore-therr-itme">充值金额:</div>
				<div class="prestore-therr-itme">
					<div class="prestore-therr-itme-one">
						<el-radio-group v-model="radio" @change="radioClick">
							<el-radio :label="1">快速充值</el-radio>
						</el-radio-group>
						<div class="money">
							<div v-for="(sum,index) in sumString" :key="index" @click="sunClick(index)" :class="activate==index?'sun-activate':'onsun-activate'">{{sum}}</div>
						</div>
					</div>
					<div class="prestore-therr-itme-tow">
						<el-radio-group v-model="radio" @change="radioClick">
							<el-radio :label="2">自定义充值</el-radio>
						</el-radio-group>
						<div class="input-box">
							<el-input type="text" v-model="customValue" maxlength="4" style="width: 9.25rem;height: 0.625rem;margin-left: 1.875rem;"
							 :disabled="offAlter" size="mini" @input="inputClick">
							</el-input>
						</div>
					</div>

				</div>
			</div>
			<div class="prestore-five">
				<div class="prestore-five-itme">需要收现金:</div>
				<div class="prestore-five-itme">
					{{incomeCash}}
				</div>
			</div>
			<div class="prestore-five">
				<div class="prestore-five-itme">备注:</div>
				<div class="prestore-five-itme">
					<el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="60" show-word-limit>
					</el-input>
				</div>
			</div>
			<div class="btn-tow">
				<el-button type="primary" @click="openTow">确定充值</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 停车下拉列表
				options: [],
				// 停车下拉列表默认值
				parkName: '',
				//停车id
				parkId: '',
				// 商户下拉列表
				obtions: [],
				// 商户下拉列表默认值
				shopName: '',
				//商户id
				shopId: '',
				// 现金购买优惠卷激活样式默认值
				doubt: true,
				// 预存账户现金充值激活样式默认值
				doubtTow: false,
				// 现金购买优惠卷页面默认值
				offCash: true,
				// 预存账户现金充值页面默认值
				offPrestore: false,
				// 备注默认值
				textarea: '',
				// 直接充值
				radio: 1,
				// 接收
				counts: [],
				// 
				moneys: 0,
				// 优惠ID
				discountCouponId: '',
				// 余额
				balance: '',
				// 快速充值数组
				sumString: ['1元', '2元', '4元'],
				// 样式
				activate: 0,
				// 禁用开关
				offAlter: true,
				// 自定义值
				customValue: 0,
				// 需要收现金
				incomeCash: 0,
				// 
				number: 1,
				value: '',

			}
		},
		methods: {
			// 显示现金购买优惠卷
			favorablePrice() {
				// 激活样式
				this.doubt = true;
				this.doubtTow = false;
				// 显示现金购买优惠卷页面
				this.offCash = true;
				// 关闭预存账户现金充值
				this.offPrestore = false
			},
			// 显示预存账户现金充值
			account() {
				// 激活样式
				this.doubt = false;
				this.doubtTow = true;
				// 隐藏现金购买优惠卷页面
				this.offCash = false;
				// 显示预存账户现金充值
				this.offPrestore = true
			},
			// 确定购买事件
			open() {
				this.$post('/cash/buyCash', {
						shopId: '1339119321122652161',
						discountCouponId: [this.discountCouponId],
						number: 1,
						info: this.textarea,
						money: this.moneys,
						parkLotId: this.parkId
					})
					.then(res => {
						console.log(res)
						this.$alert('已完成优惠卷购买操作', '购买成功', {
							confirmButtonText: '确定'
						});
					})
					.catch(err => {
						console.log(err)
					})

			},
			openTow() {
				this.$post('/cash/prestore', {
						money: String(parseInt(this.incomeCash)),
						parkLotId: '0731020001',
						remark: this.textarea,
						shopId: '1340606951421222913'
					})
					.then(res => {
						if (res.code != 0) {
							this.$message(res.msg)
							return
						} else {
							console.log(res)
							this.$alert('已完成预存账户现金充值操作', '充值已成功', {
								confirmButtonText: '确定'
							});
						}
					})
					.catch(err => {
						console.log(err)
					})
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
							this.options = res.data.list
							console.log(res)
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			divClick(index) {
				this.moneys = this.counts[index].couponPrice * this.number
				console.log(this.counts)
				this.discountCouponId = this.counts[index].electricCouponId
				console.log(this.moneys)
				console.log(this.discountCouponId)
			},
			// 停车选中事件
			parkon(parkId) {
				this.parkId = parkId
				console.log(this.parkId)
			},
			// 现金购买优惠商户选择事件
			onshopId(Id) {
				let _this = this
				this.shopId = Id
				console.log("----------->>>", this.shopId)
				this.$fetch('/cash/buyCoupon', {
						shopId: '1339119321122652161'
					})
					.then(res => {
						console.log('---------')
						console.log(res)
						if (res.code != 0) {
							_this.$message(res.msg)
							return
						}
						this.counts = res.data
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 充值商户选择事件
			otshopId(Id) {
				let _this = this
				this.shopId = Id
				console.log("----------->>>", this.shopId)
				this.$fetch('/cash/buyCoupon', {
						shopId: '1339119321122652161'
					})
					.then(res => {
						console.log('---------')
						console.log(res)
						if (res.code != 0) {
							_this.$message(res.msg)
							return
						}
						this.counts = res.data
					})
					.catch(err => {
						console.log(err)
					})
				// 余额
				this.$fetch('/cash/getBalance', {
						parkLotId: '0731020001',
						shopId: '1340606951421222913'
					})
					.then(res => {
						if (res.code != 0) {
							this.$message(res.msg)
							return
						} else {
							this.balance = res.data + '.00元'
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
			// 选择快速充值
			sunClick(index) {
				console.log(index)
				this.activate = index
				this.incomeCash = this.sumString[index]
			},
			// 
			inputClick(e) {
				this.incomeCash = this.customValue + '元'
			},
			// 单选项触发事件
			radioClick(e) {
				console.log(e)
				if (e == 1) {
					this.offAlter = true
					this.incomeCash = this.sumString[this.activate]
				} else if (e == 2) {
					this.offAlter = false
					this.activate = 3
					this.incomeCash = this.customValue + '元'
				}
			}
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped" lang="less">
	// 左距离
	@userleft: 3rem;
	// 上下距离
	@usertb: 0.2rem;
	// 字体大小
	@font: 14px;

	.cash-box {
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

		// 现金购买盒子页面
		.cash-page {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;

			.cash-one {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.cash-one-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.cash-tow {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.cash-tow-itme {
					width: 50%;
					font-weight: bold;
					display: flex;
					justify-content: left;
					flex-wrap: wrap;

					.invitation-box {
						padding: 0.3125rem;
						border: 1px solid rgba(0, 0, 0, .1);
						margin-right: 0.625rem;
						margin-top: 0.625rem;

						.invitation-one {
							font-size: 0.65rem;
							color: #ccc;
						}

						.invitation-tow {
							font-size: 0.875rem;
							padding: 12px;
						}

						.invitation-therr {
							font-size: 0.65rem;
							text-align: center;
							color: #ccc;
						}
					}
				}
			}

			.cash-therr {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.cash-therr-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.cash-four {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.cash-four-itme {
					width: 50%;
					font-weight: bold;

					span {
						color: #f00;
					}
				}
			}

			.cash-five {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.cash-five-itme {
					width: 50%;
					font-weight: bold;

				}
			}

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.625rem 0;
			}
		}

		// 预存账户现金充值页面
		.prestore-box {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;

			.prestore-one {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.prestore-one-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.prestore-tow {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.prestore-tow-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.prestore-therr {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.prestore-therr-itme {
					width: 50%;
					font-weight: bold;

					.prestore-therr-itme-one {
						display: flex;
						justify-content: left;
						align-items: center;

						.money {
							display: flex;
							justify-content: left;
							align-items: center;
							margin-left: 3.125rem;
							cursor: pointer;

							.onsun-activate {
								padding: 0.875rem;
								border: 1px solid rgba(0, 0, 0, .2);
								margin-right: 0.625rem;
							}

							.sun-activate {
								padding: 0.875rem;
								border: 1px solid rgba(40, 68, 250, 0.6);
								margin-right: 0.625rem;
							}
						}

					}

					.prestore-therr-itme-tow {
						margin-top: 1.225rem;
						display: flex;
						justify-content: left;
						align-items: center;
					}
				}
			}

			.prestore-five {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.prestore-five-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.btn-tow {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.625rem 0;
			}
		}

	}
</style>
