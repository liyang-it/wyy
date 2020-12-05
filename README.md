## 运行地址: [网易云](http://liyangit.top/wyy)
## Vue安装脚手架:
安装node.js后

在cmd或者vscode打开终端

选择好文件夹

安装脚手架:    

npm install -g vue-cli

安装 webpack(打包js的工具): 	npm install -g webpack 

以上操作 是 只安装一次即可

创建vue项目:  vue init webpack 项目名 

运行项目:   先cd到项目文件夹，cd Vue项目，然后输入以下指令  npm run dev

## Git:

连接远程git库

git init 初始化当前目录为git可管理状态

git remote add origin git 项目地址

查看当前项目 新增了那些文件是否已提交 
git status

将项目的所有文件添加到缓存中:
git add .

将缓存中的文件Commit到git库

git commit -m "添加你的注释,一般是一些更改信息"

将代码推送到git

git push origin master 或者 git push 或者 git push -f
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
