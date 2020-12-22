# aparkingparkingsystem

###文件说明
```
node_modules文件是本项目从npm上下载的包，用于存放项目的各种依赖
public:用于存放静态文件
src:存放各种vue文件
src/assets:用于存放各种静态文件，如图片等
src/compnents：用于存放公共组件
src/views：用于存放写好的各种页面
src/APP.VUE:主vue模块 引入其他模块，app.vue是项目的主组件，所有页面都是在app.vue下切换的
src/main.js:入口文件，主要作用是初始化vue实例，同时可以在此文件中引用某些组件库或者全局挂在一些变量
src/router/router.js:路由文件，这个里边可以理解为各个页面的地址路径，用于我们访问，同时可以直接在里边编写路由守卫
src/store/store.js：主要用于项目里边的一些状态的保存，state中保存状态，mutations中写用于修改state中的状态
package.json:模块基本信息项目开发所需要模块，版本，项目名称
package-lock.json:是在 npm install时候生成一份文件，用以记录当前状态下实际安装的各个npm package的具体来源和版本号
babel.config.js:是一个工具链，主要用于在当前和较旧的浏览器或环境中将ECMAScript 2015+代码转换为JavaScript的向后兼容版本
gitignore:git上传需要忽略的文件格式
src/views/home/home.vue 项目首页
src/views/login/login.vue 项目登录页
src/views/page/page.vue 项目默认第一页
src/views/page/page.vue 项目默认第一页
```
###环境框架依赖
```
项目需要node.js的运行环境，使用了javascript的vue2.0框架,vue/cli3搭建
组件有用到ElementUI，v-echarts图表组件，vue中的插件router,axios,store，
事件总线，父子之间的通信。
css部分只使用less的预处理器，请在编译器中安装less编译器,
```
###编译工具
```
编译工具HBuilderX
```

### 项目初始化
```
npm init
```
### 项目设置
```
npm install使用该操作命令下载所有插件
```

### 项目启动
```
npm run serve
```

### 项目打包
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
