<template>
	<div class="home-pages">
		<div id="nav" style="padding: 0 18px;">
			<!-- 头部左边 -->
			<div class="nav-left" ref="navLeft">
				<el-radio-group v-model="isCollapse">
					<el-button type="primary" plain @click="btnMenu" class="toggle-button">
						<div class="img-box">
							<img src="../../assets/icon/nav.png" alt="">
						</div>
					</el-button>
				</el-radio-group>
				<div>
					<h2 style="color: aliceblue;font-size:20xpx;">铭泊停车后台管理系统</h2>
				</div>
			</div>

			<!-- 头部右边 -->
			<div class="nav-rigth">

				<div class="tow">
					<div class="tow-img">
						<i class="el-icon-warning-outline" style="font-size:20px"></i>
						<span>问题反馈</span>
					</div>
					<div class="login-img">
						<el-dropdown @command="endurse">
							<div class="el-dropdown-link">
								<img src="../../assets/icon/admin.png" alt="退出"><span>{{this.$store.state.user.username}}</span>
							</div>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="a">退出账号</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</div>

		</div>
		<el-scrollbar :style="{height: `calc(100vh - ${topHeight}) - 10px`}">
			<div id="matter">
				<!--导航部分 -->
				<div ref="navWidth" :style="{height: `calc(100vh - ${topHeight} - 10px)`}">
					<el-menu default-active="1-4-1" class="el-menu-vertical-demo" style="height: 100%; color:#fff;" background-color="rgb(44, 62, 80)"
					 text-color="#fff" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router>
						<!-- 菜单首页 -->
						<el-menu-item index="page">
							<i class="el-icon-s-home"></i>
							<span slot="title">菜单首页</span>
						</el-menu-item>
						<!--  -->
						<el-menu-item index="userMange">
							<i class="el-icon-s-platform"></i>
							<span slot="title">用户管理</span>
						</el-menu-item>
						<!-- 商户管理 -->
						<el-submenu index="4">
							<template slot="title">
								<i class="el-icon-suitcase"></i>
								<span slot="title">优惠管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="distributionOfPreferential">分配优惠</el-menu-item>
								<el-menu-item index="presented">赠送优惠</el-menu-item>
								<el-menu-item index="cash">现金购买</el-menu-item>
								<el-menu-item index="activity">活动卷</el-menu-item>
								<el-menu-item index="paperCapacitor">纸质卷</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</div>
				<el-main>
					<router-view></router-view>
				</el-main>
			</div>

		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		data() {

			return {
				// 是否折叠
				isCollapse: true,
				// 头部高度
				topHeight: null,
				// 底部剩余高度
				bomHeigth: null,
				// 导航数组
				showNavigationList: [],
				// 导航宽度
				navWidthvul: '',
				bud: 0,
				// 下拉选择
				pullDown: '下拉选择'
			}
		},
		methods: {
			// 导航开启事件
			btnMenu() {
				if (this.isCollapse == false) {
					this.isCollapse = true
				} else {
					this.isCollapse = false
				}
				this.navWidthvul = this.$refs.navWidth.offsetWidth + 'px'
				console.log(this.navWidthvul)
				if (this.navWidthvul == '201px') {
					this.navWidthvul = '65px'
					this.bud = 0
				} else if (this.navWidthvul == '65px') {
					this.navWidthvul = '201px'
					this.bud = 0
				}
				this.$usd.$emit('clickWith', this.navWidthvul)
			},
			// 导航事件
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
				console.log(keyPath)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			// 菜单激活回调
			handleSelect(index, indexPath) {
				console.log(index)
				console.log(indexPath)
			},
			// 
			handleCommand(command) {
				console.log(command)
				this.pullDown = command
			},
			// 账号
			endurse() {
				console.log('账号事件')
			}
		},
		mounted() {
			this.navWidthvul = this.$refs.navWidth.offsetWidth + 'px'

			this.topHeight = this.$refs.navLeft.offsetHeight + 'px'

			this.$usd.$emit('navWidth', this.navWidthvul)
			this.$usd.$emit('navHeigt', this.topHeight)
		}
	}
</script>

<style lang="less">
	.home-pages {

		#nav {
			background-color: rgb(44, 62, 80);
			display: flex;
			align-items: center;
			box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);

			.nav-left {
				width: 20%;
				display: flex;
				align-items: center;

				.toggle-button {
					background-color: rgb(44, 62, 80);
					font-size: 10px;
					color: #fff;
					text-align: center;
					cursor: pointer;
					border: none;
					padding-left: 4px;
				}

				.img-box {
					width: 24px;
					height: 24px;
					display: flex;
					justify-content: center;
					align-items: center;

					img {
						width: 24px;
						height: 24px;
					}
				}

			}

			.nav-rigth {
				display: flex;
				width: 80%;
				justify-content: flex-end;
				// justify-content: space-between;
				align-items: center;

				.one {
					margin-left: 20%;
					width: 20.375rem;
					height: 2.45rem;
					border-radius: 0.975rem;
					background-color: #fff;
					color: #111111;
					display: flex;
					align-items: center;

					.one-left {
						width: 46%;
						height: 80%;
						border-radius: 0.975rem 0 0 0.975rem;
						padding-right: 4%;
						border-right: 1px solid rgba(0, 0, 0, 1);
						display: flex;
						justify-content: center;
						align-items: center;
						// border: 1px solid rgba(0,0,0,.2);
					}

					.one-right {
						width: 46%;
						height: 100%;
						margin-left: 4%;
						border-radius: 0 0.975rem 0.975rem 0;
						background-color: rgba(0, 0, 0, .1);
					}
				}

				.tow {
					padding: 0 12px;
					display: flex;
					align-items: center;
					font-size: 17px;
					color: #f3f2f1;

					.tow-img {
						display: flex;
						justify-content: left;
						align-items: center;


						img {
							width: 24px;
							height: 24px;
						}

						span {
							font-size: 17px;
							display: inline-block;
							margin-left: 5px;
						}
					}

					.login-img {
						display: flex;
						justify-content: left;
						align-content: center;

						.el-dropdown-link {
							display: flex;
							justify-content: left;
							align-items: center;
							margin-left: 10px;
							color: #f3f2f1;

							img {
								width: 34px;
								height: 34px;
							}

							span {
								font-size: 18px;
								display: inline-block;
							}

						}
					}
				}
			}

		}

		#matter {
			width: 100%;
			display: flex;
			justify-content: left;
			background-color: #ebebeb;
		}

	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
	}

	.img-box:hover {
		background-color: rgba(77, 107, 150, 1.0);
	}
</style>
