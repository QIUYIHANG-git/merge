<template>
	<div class="distri-page">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="parkName" placeholder="请选择" @visible-change="ondistr" @change="parkon">
				<el-option v-for="item in options" :key="item.parkId" :label="item.parkName" :value="item.parkId">
				</el-option>
			</el-select>
		</div>
		<div class="distribution">
			分配优惠
		</div>
		<!-- 赠送车辆 -->
		<div class="particulars-box">
			<div class="one">赠送车辆：</div>
			<div class="tow">
				<div class="input-box">
					<el-input type="text" v-model="textOne" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-input type="text" v-model="textTow" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<span>·</span>
					<el-input type="text" v-model="textTherr" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-input type="text" v-model="textFour" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-input type="text" v-model="textSix" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-input type="text" v-model="textSeven" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-input type="text" v-model="textEigth" maxlength="1" style="width: 3.25rem;margin-right: 0.625rem;">
					</el-input>
					<el-button icon="el-icon-search" circle tyle="width: 3.25rem;margin-right: 0.625rem;" @click="searchCilck"></el-button>
				</div>
				<div class="time-box">
					<span>入场时间</span>
					<span>{{timeDate}}</span>
					<span>{{timeHour}}</span>
				</div>
				<div class="time-box">
					<span>入场时长</span>
					<span>{{parkTime.parkdate}}</span>
				</div>
			</div>
		</div>
		<!-- 选择优惠 -->
		<div class="set-box">
			<div class="one">选择优惠：</div>
			<div class="tow">
				<el-checkbox-group v-model="checkList">
					<div class="itme">
						<el-radio-group v-model="radioExempt" @change="exempt">
							<el-radio :label="1">车费全免</el-radio>
							<el-radio :label="2">只免当天(只限免除停车费用)</el-radio>
						</el-radio-group>
					</div>
					<div class="itme">
						<el-radio-group v-model="radioExempt" @change="exempt">
							<el-radio label="减免时长"></el-radio>
						</el-radio-group>
						<!-- <el-checkbox label="减免时长"></el-checkbox> -->
						<el-input type="text" :disabled="offOne" v-model="textHour" maxlength="4" style="width: 9.25rem;height: 0.625rem;margin-left: 1.875rem;"
						 size="mini">
							<template slot="append">小时</template>
						</el-input>
					</div>
					<div class="itme">
						<el-radio-group v-model="radioExempt" @change="exempt">
							<el-radio label="减免金额"></el-radio>
						</el-radio-group>
						<!-- <el-checkbox label="减免金额"></el-checkbox> -->
						<el-input type="text" :disabled="offTow" v-model="textUnit" maxlength="4" style="width: 9.25rem;height: 0.625rem;margin-left: 1.875rem;"
						 size="mini">
							<template slot="append">元</template>
						</el-input>
					</div>
					<div class="itme">
						<el-radio-group v-model="radioExempt" @change="exempt">
							<el-radio label="车费打折"></el-radio>
						</el-radio-group>
						<!-- <el-checkbox label="车费打折"></el-checkbox> -->
						<el-input type="text" :disabled="offTherr" v-model="textBreak" maxlength="4" style="width: 9.25rem;height: 0.625rem;margin-left: 1.875rem;"
						 size="mini">
							<template slot="append">折</template>
						</el-input>
					</div>
				</el-checkbox-group>
			</div>
		</div>
		<!-- 备注 -->
		<div class="remark-box">
			<div class="one">备注:</div>
			<div class="tow">
				<el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="60" show-word-limit>
				</el-input>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="btn">
			<el-button type="primary" style="width: 50%;" @click="openConfirm">确定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 停车id
				parkId: '',
				// 下拉选择
				options: [],
				// 默认值
				parkName: '',
				//第一个值
				textOne: '湘',
				textTow: 'A',
				textTherr: '2',
				textFour: '2',
				textSix: '2',
				textSeven: '2',
				textEigth: '',
				// 搜索显示
				parkTime:{},
				// 免
				radioExempt: 1,
				deposite: '',
				// 时长
				textHour: '',
				//减免金额
				textUnit: '',
				// 车费打折
				textBreak: '',
				// 复选框选择
				checkList: ['A'],
				// 备注
				textarea: '',
				// 操作成功
				succeed: true,
				// 禁用
				offOne: true,
				offTow: true,
				offTherr: true,
				// 时间
				timeDate:"",
				// 小时
				timeHour:""
			}
		},
		methods: {
			// shoSucceed() {
			// 	this.succeed = true
			// },
			// 搜索事件
			searchCilck(){
				console.log('---------')
				let licences = this.textOne + this.textTow + this.textTherr + this.textFour + this.textSix + this.textSeven + this.textEigth
				this.$fetch('/coupon/findParkLicence',{
					licence:licences
				})
				.then(res => {
					if(res.code != 0){
						this.$message(res.msg)
						return
					}else{
						console.log(res);
						this.parkTime = res.data
						let inTime = new Date()
						console.log(inTime.getFullYear(this.parkTime.inTime))
						console.log(inTime.getMonth(this.parkTime.inTime))
						console.log(inTime.getDate(this.parkTime.inTime))
						console.log(inTime.getHours(this.parkTime.inTime))
						console.log(inTime.getMinutes(this.parkTime.inTime))
						let di = inTime.getFullYear(this.parkTime.inTime) +'-'+inTime.getMonth(this.parkTime.inTime)+'-'+inTime.getDate(this.parkTime.inTime)
						let hu = inTime.getHours(this.parkTime.inTime) + '-'+ inTime.getMinutes(this.parkTime.inTime)
						this.timeDate = di
						this.timeHour = hu 
						// console.log(inTime.toDateString(this.parkTime.inTime))
						// let i = inTime.toISOString(this.parkTime.inTime)
						// console.log(i.getFullYear())
					}
				})
				.catch(err => {
					console.log(err);
				})
			},
			// 分配操作完成
			openConfirm() {
				let licences = this.textOne + this.textTow + this.textTherr + this.textFour + this.textSix + this.textSeven + this.textEigth;
				this.$post('/coupon/sendCoupon', {
						creditAmount: this.textUnit,
						discount: this.textUnit,
						info: this.textarea,
						parkLotId: this.parkId,
						licence: licences,
						reductionTime: this.textHour,
						toDay: this.deposite
					})
					.then(res => {
						console.log(res);
						if(res.code != 0){
							this.$message(res.msg);
							return
						}else{
							this.$alert('已完成优惠分配操作', '操作已成功', {
								confirmButtonText: '确定'
							});
						}
					})
					.catch(err => {
						console.log(err);
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
							if(res.code != 0){
								this.$message(res.msg);
								return
							}else{
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
			// 单选事件
			exempt(e) {
				if (e == 1 || e == 2) {
					console.log(e);
					this.deposite = e;
					this.offOne = true;
					this.offTow = true;
					this.offTherr = true;
				} else if(e=='减免时长'){
					this.offOne = false;
					this.offTow = true;
					this.offTherr = true;
					// 前面两个
					this.deposite = '';
					//减免金额
					this.textUnit = '';
					// 车费打折
					this.textBreak = '';
					console.log(this.radioExempt, '---------')
				}else if(e=='减免金额'){
					this.offOne = true;
					this.offTow = false;
					this.offTherr = true;
					// 前面两个
					this.deposite = '';
					// 时长
					this.textHour = '';
					// 车费打折
					this.textBreak = '';
				}else if(e=='车费打折'){
					this.offOne = true;
					this.offTow = true;
					this.offTherr = false;
					// 前面两个
					this.deposite = '';
					// 时长
					this.textHour = '',
					//减免金额
					this.textUnit = '';
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.distri-page {
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

		.distribution {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			padding: 0.875rem 0;
			background-color: rgb(71, 71, 71);
		}

		.particulars-box {
			width: 50%;
			margin: 10px auto;
			border: 1px solid #fff;
			padding: 0.875rem;
			display: flex;
			justify-content: center;
			border-radius: 0.875rem;
			color: #fff;

			.one {

				width: 20%;
				display: flex;
				justify-content: flex-end;
			}

			.tow {
				width: 80%;

				.input-box {
					display: flex;
					justify-content: left;
					align-items: center;


					span {
						display: flex;
						justify-content: center;
						align-items: center;
						font-weight: bold;
						margin-right: 0.625rem;
					}
				}

				.time-box {
					display: flex;
					align-items: center;
					margin: 1.875rem 0;

					span {
						margin-right: 1.25rem;
					}
				}
			}
		}

		.set-box {
			width: 50%;
			margin: 10px auto;
			border: 1px solid #fff;
			padding: 0.875rem;
			display: flex;
			justify-content: center;
			border-radius: 0.875rem;
			color: #fff;

			.one {
				width: 20%;
				display: flex;
				justify-content: flex-end;
			}

			.tow {
				width: 80%;
				
				.itme {
					margin-top: 1rem;

					/deep/.el-radio__label {
						color: #fff;
					}
				}
			}
		}

		.remark-box {
			width: 50%;
			margin: 10px auto;
			border: 1px solid #fff;
			padding: 0.875rem;
			display: flex;
			justify-content: center;
			border-radius: 0.875rem;
			color: #fff;

			.one {
				width: 20%;
				letter-spacing: 0.9rem;
				display: flex;
				justify-content: flex-end;
			}

			.tow {
				width: 80%;
			}
		}

		.btn {
			width: 50%;
			margin: 20px auto;
			display: flex;
			justify-content: center;
		}


	}
</style>
