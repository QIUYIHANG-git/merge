<template>
	<div class="activity-page">
		<div class="top-box">
			<span>当前停车场</span>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>
		<div class="messge-itme">
			<div class="itme">
				<span style="margin-right:1.625rem ;">优惠卷内容</span>
				<el-input placeholder="请输入用户名" style="width: 14rem;" v-model="userName">
				</el-input>
			</div>
			<div class="itme">
				<span style="margin-right:1.625rem ;">有效时间</span>
				<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="itme">
				<span style="margin-right:1.625rem ;">创建时间</span>
				<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
		</div>
		<!-- 活动卷页面 -->
		<div class="activate" v-show="offActivate">
			<div class="activate-box-top">
				<div><i class="el-icon-s-promotion"></i>活动优惠卷列表</div>
				<!-- 打开创建活动优惠页面 -->
				<div>
					<el-button type="primary" @click="activityClick">创建活动优惠</el-button>
				</div>
			</div>
			<div>
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column prop="content" label="优惠内容" width="100">
					</el-table-column>
					<el-table-column prop="next" label="优惠次数" width="80">
					</el-table-column>
					<el-table-column prop="validTime" label="有效时间" width="240">
					</el-table-column>
					<el-table-column prop="state" label="状态">
					</el-table-column>
					<el-table-column prop="creator" label="创建人">
					</el-table-column>
					<el-table-column prop="creationTime" label="创建时间">
					</el-table-column>
					<el-table-column prop="look" label="查看">
						<div>
							<span style="color: rgba(77, 168, 247, 1.0);">查看使用记录</span>
						</div>
					</el-table-column>
					<el-table-column label="操作" width="300">
						<div style="display: flex;justify-content: left;align-items: center;color: rgba(92, 192, 238, 1.0);">
							<span style="margin-right: 0.625rem;">生成静态二维码</span>
							<span style="margin-right: 0.625rem;">生成动态二维码</span>
							<span style="margin-right: 0.625rem;">删除</span>
						</div>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="establish-box" v-show="offEstablish">
			<div class="establish-one">
				<div class="establish-one-itme">有效时间:</div>
				<div class="establish-one-itme">
					<el-date-picker v-model="giveTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</div>
			<div class="establish-tow">
				<div class="establish-tow-itme">优惠次数:</div>
				<div class="establish-tow-itme">
					<el-radio-group v-model="radio" change="btnDisabled">
						<div class="radio-one">
							<el-radio label="1">
								<span style="margin-right: 2.25rem;">不限次数</span>
							</el-radio>
							
						</div>
						<div class="radio-tow">
							<el-radio label="2">
								<span style="margin-right: 1.25rem;">限制次数，优惠</span>
							</el-radio>
							<el-input style="width: 10.25rem;" size="mini" placeholder="请输入金额" v-model="money" type="number">
							</el-input>
						</div>
					</el-radio-group>
				</div>
			</div>
			<div class="establish-therr">
				<div class="establish-therr-itme">优惠内容:</div>
				<div class="establish-therr-itme">
					<el-radio-group v-model="radio" change="btnDisabled">
						<div class="radio-one">
							<el-radio label="1">
								<span style="margin-right: 2.25rem;">全免</span>
							</el-radio>
							<el-radio label="1">
								<span style="margin-right: 2.25rem;">只免当天</span>
							</el-radio>
						</div>
						<div class="radio-therr">
							<el-radio label="2">
								<span style="margin-right: 1.25rem;">减免金额</span>
							</el-radio>
							<el-input style="width: 10.25rem;" size="mini" placeholder="20" v-model="money" type="number">
								<template slot="append">元</template>
							</el-input>
						</div>
						<div class="radio-therr">
							<el-radio label="2">
								<span style="margin-right: 1.25rem;">减免金额</span>
							</el-radio>
							<el-input style="width: 10.25rem;" size="mini" placeholder="20" v-model="money" type="number">
								<template slot="append">小时</template>
							</el-input>
						</div>
						<div class="radio-therr">
							<el-radio label="2">
								<span style="margin-right: 1.25rem;">减免金额</span>
							</el-radio>
							<el-input style="width: 10.25rem;" size="mini" placeholder="20" v-model="money" type="number">
								<template slot="append">折</template>
							</el-input>
						</div>
					</el-radio-group>
				</div>
			</div>
			<div class="establish-five">
				<div class="establish-five-itme">备注:</div>
				<div class="establish-five-itme">
					<el-input type="textarea" :autosize="size" placeholder="请输入内容" v-model="textarea" maxlength="60" show-word-limit></el-input>
				</div>
			</div>
			<div class="establish-four">
				<div class="establish-four-itme"></div>
				<div class="establish-four-itme">
					<el-button type="primary" @click="estabclick">立即创建</el-button>
					<el-button plain style="margin-right: 3.125rem;">返回</el-button>
				</div>
			</div>
			<!-- <el-pagination background layout="prev, pager, next" :total="100">
			</el-pagination> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 好的优惠页面开关默认值
				offActivate: true,
				// 创建优惠页面默认值
				offEstablish: false,
				// 表格数组
				tableData: [{
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}, {
					content: '停车全免',
					next: '无限',
					validTime: '2020-11-11至2020-11-12',
					state: '正常',
					creator: '小模',
					creationTime: '2020-11-11 17:20',
				}]
			}
		},
		methods: {
			// 创建活动优惠
			activityClick() {
				this.offActivate = false
				this.offEstablish = true
				this.$message('创建活动优惠成功')
			},
			// 创建成功
			estabclick(){
				this.$alert('已完成优惠卷创建操作', '创建已成功', {
					confirmButtonText: '确定'
				});
			}
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

	.activity-page {
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
			justify-content: space-between;
			align-items: center;
			padding: 0.5rem @userleft;
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			border-radius: 0.5rem;
			font-size: 0.875rem;
			box-sizing: border-box;

		}

		.activate {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;
			box-sizing: border-box;

			.activate-box-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 0.875rem;
				margin-bottom: 10px;
			}

			.paging-box {
				padding: 1.5rem;
			}
		}

		.establish-box {
			background-color: #fff;
			width: 90%;
			margin: 10px auto;
			padding: 0.875rem;
			border-radius: 0.5rem;
			font-size: 0.875rem;
			box-sizing: border-box;

			.establish-one {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.establish-one-itme {
					width: 50%;
					font-weight: bold;
				}
			}

			.establish-tow {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.establish-tow-itme {
					width: 50%;
					font-weight: bold;
					
					.radio-tow{
						margin-top: 0.825rem;
					}
				}
			}
			
			.establish-therr {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
			
				.establish-therr-itme {
					width: 50%;
					font-weight: bold;
					
					.radio-therr{
						margin-top: 0.825rem;
					}
				}
			}
			
			.establish-five {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
			
				.establish-five-itme {
					width: 50%;
					font-weight: bold;
					
				}
			}
			
			.establish-four {
				display: flex;
				justify-content: left;
				padding: 0.75rem 0.625rem;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
			
				.establish-four-itme {
					width: 50%;
					font-weight: bold;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
