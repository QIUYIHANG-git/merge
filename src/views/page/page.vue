<template>

	<div class="page-box" :style="{width:`calc(100vw - ${pageWidth})`}">
		<!-- 面包屑导航区域 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>菜单首页</el-breadcrumb-item>
       </el-breadcrumb>
		<el-card>
		<div class="itme-box">

			<div class="itme">
				<div class="top-itme">
					<div class="tb-text"><span>当日营业流水</span></div>
					<div class="itme-one"><span>￥2555.66</span><span>元/日</span></div>
				</div>
				<div class="itme-therr">
					查看更多>>
				</div>
			</div>

			<div class="itme">
				<div class="top-itme">
					<div class="tb-text"><span>当日营业流水</span></div>
					<div class="itme-one"><span>￥2555.66</span><span>元/日</span></div>
				</div>
				<div class="itme-therr">
					查看更多>>
				</div>
			</div>

			<div class="itme">
				<div class="top-itme">
					<div class="tb-text"><span>当日营业流水</span></div>
					<div class="itme-one"><span>￥2555.66</span><span>元/日</span></div>
				</div>
				<div class="itme-therr">
					查看更多>>
				</div>
			</div>

			<div class="itme">
				<div class="top-itme">
					<div class="tb-text"><span>当日营业流水</span></div>
					<div class="itme-one"><span>￥2555.66</span><span>元/日</span></div>
				</div>
				<div class="itme-therr">
					查看更多>>
				</div>
			</div>

			<div class="itme" style="margin-right:0px !important">
				<div class="top-itme">
					<div class="tb-text"><span>当日营业流水</span></div>
					<div class="itme-one"><span>￥2555.66</span><span>元/日</span></div>
				</div>
				<div class="itme-therr">
					查看更多>>
				</div>
			</div>
		</div>
    </el-card>
	 <el-card style="margin-top:10px" >
		 <div class="chart-box">
			 <div ref="main" style="width: 400px;height:400px;"></div>
			 <div ref="chart1" style="width: 400px;height:400px;"></div>
		 </div>
		
	 </el-card>
	</div>
	
</template>

<script>
	const echarts = require('echarts')
	export default {
		data() {
			return {
				pageWidth: ''
			}
		},
		methods: {
			drawChart() {
				let myChart = echarts.init(this.$refs.main);
				myChart.setOption({
					// backgroundColor: '#f1f1f1',
					title: {
						text: '用户购买分类',
						// subtext: '虚构数据',
						left: 'center',
						textStyle: {
							color: '#1E90FF'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						// orient: 'vertical',
						// top: 'middle',
						bottom: 10,
						left: 'center',
						data: ['一星好评', '两星好评', '三星好评', '四星好评', '五星好评']
					},
					series: [{
						type: 'pie',
						radius: '60%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						roseType: 'angle',
						data: [{
								value: 300,
								name: '一星好评',
								itemStyle: {
									color: '#87CEEB'
								},
							},
							{
								value: 250,
								name: '两星好评',
								itemStyle: {
									color: '#FACFA9'
								},
							},
							{
								value: 280,
								name: '三星好评',
								itemStyle: {
									color: '#71D4D4'
								},
							},
							{
								value: 240,
								name: '四星好评',
								itemStyle: {
									color: '#CEDD79'
								},
							},
							{
								value: 230,
								name: '五星好评',
								itemStyle: {
									color: '#C3B6E6'
								},
							},
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				})
			},
		
			initCharts1() {
			    let myChart1 = echarts.init(this.$refs.chart1);
			    // 绘制图表
			    myChart1.setOption({
			     backgroundColor: '#fff',
			     legend: {
			      top: 20,
			      right: 20
			     },
			     tooltip: {},
			     dataset: {
			      source: [
			       ['product', '男生订单', '女生订单'],
			       ['00:00', 430, 220],
			       ['02:00', 700, 460],
			       ['04:00', 181, 160],
			       ['06:00', 182, 246],
			       ['08:00', 312, 160],
			       ['10:00', 648, 600],
			       ['12:00', 512, 873],
			       ['14:00', 0, 0],
			       ['16:00', 0, 0],
			       ['18:00', 0, 0],
			       ['20:00', 0, 0],
			       ['22:00', 0, 0],
			       ['24:00', 0, 0],
			      ]
			     },
			     xAxis: {
			      type: 'category',
			      nameLocation: 'end',
			      name: "时间",
			      nameGap: 20,
			      nameTextStyle: {
			       fontStyle: 'bolder',
			       fontSize: 14,
			       color: "#e21225"
			      }
			     },
			     yAxis: {
			      name: "订单数",
			      min: 0,
			      max: 1000,
			      nameLocation: 'end',
			      nameGap: 20,
			      nameTextStyle: {
			       fontStyle: 'bolder',
			       fontSize: 14,
			       color: "#e21225"
			      }
			
			     },
			     // Declare several bar series, each will be mapped
			     // to a column of dataset.source by default.
			     series: [{
			       type: 'bar'
			      },
			      {
			       type: 'bar'
			      },
			     ]
			    });
			   }
		},
		mounted() {
			this.drawChart()
			this.initCharts1();
		}
	}
</script>

<style lang="less">
	.page-box {
		width: 100% ;

		.itme-box {
			width: 100%;
			display: flex;

			.itme {
				flex: 1;
				background-color:#83A8C8;
				margin-right: 40px;
				font-size: 0.75rem;
				border-radius: 0.25rem;

				.top-itme {
					padding: 10px;

					.tb-text{
					color: #fff;
					}
					.itme-one {
						display: flex;
						text-align: center;
						justify-content: center;
						line-height: 50px;
						font-weight: bold;
						color: #fff;
						font-size: 20px;
					}
				}

				.itme-therr {
					height: 1.5rem;
					background-color: #EAEAEA;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #4187b6;
				}
			}
		}
	}
	.chart-box{
		display: flex;
		flex-direction: row;
	}
</style>
