<template>
	<div class="login-pages">
		<!-- logo -->
		<div class="logo">
			<img src="../../assets/img/logo.png" alt="">
		</div>
		<!-- 背景图 -->
		<div class="loginbj">
			<img src="../../assets/img/loginbj.png" alt="">
		</div>
		<!-- 登录面板 -->
		<div class="login">
			<div class="bie">欢迎登陆</div>
			<div class="one">
				<el-input v-model="username" placeholder="请输入内容">
					<template slot="prepend">账号</template>
				</el-input>
			</div>
			<div class="tow">
				<el-input v-model="password" placeholder="请输入密码" show-password>
					<template slot="prepend">密码</template>
				</el-input>
			</div>
			<div class="btn">
				<el-button ref='btt' type="primary" :loading="loadDood" @click="mitbtn" class="loing-btn">立即登录</el-button>
			</div>
			<div class="btn">
				<el-button ref='btt' type="primary" :loading="loadDood" @click="registerbtn" class="loing-btn">注册账号</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 用户名
				username: 'voyboy',
				// 用户密码
				password: '123456',
				//加载显示
				loadDood: false,
				// 账号信息
				user:{}
			}
		},
		methods: {
			// 登录事件
			mitbtn() {
				let _this = this;
				_this.loadDood = true;
				_this.$post('/user/login', {
					username: _this.username,
					password: _this.password,
				})
				.then(res => {
					if(res.code !=0){
						_this.$message(res.msg);
						return;
					}
					_this.$store.state.user = res.data
					console.log(_this.$store.state.user = res.data)
					_this.$Cookie.set('userId',res.data.userId)
					_this.$Cookie.set('username',res.data.username)
					_this.$Cookie.set('phoneNumber',res.data.phoneNumber)
					_this.$router.push({ path:'/Home'})
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 注册账号
			registerbtn(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	//  body{width: 100%;height: 100%;background-color: #1E1E22}
	.login-pages {
		height: 100%;
		position: relative;
		border-color: #BB2222;

		.logo {
			position: fixed;
			top: 30px;
			left: 30px;
		}

		.loginbj {
			position: fixed;
			top: 16%;
			left: 0;

			img {
				width: 100%;
				min-width: 1200px;
				max-height: 860px;
			}
		}

		.login {
			position: absolute;
			right: 5%;
			top: 0;
			padding-top: 16%;
			height: 100%;
			box-sizing: border-box;
			background-color: rgba(223, 223, 223, 0.6);

			.bie {
				padding: 15px 0;
				border-bottom: #fff solid 1px;
				color: #fff;
				letter-spacing: 2px;
				font-size: 24px;
				font-weight: 600;
			}

			.one {
				margin-top: 20px;
				padding: 0 15px;
			}

			.tow {
				margin-top: 20px;
				padding: 0 15px;
			}

			.btn {
				margin-top: 20px;

				.loing-btn {
					background-color: #BB2222;
					width: 90%;
					border: none;
				}
			}
		}
	}
</style>
