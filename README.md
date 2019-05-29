# easymakingdir

## 功能简介

### **快速创建资源文件夹**

VS Code中资源管理器右键选择目录时，会弹出额外的上下文菜单选项，用于美术在laya IDE中快速创建资源目录结构。
![demo](https://i.loli.net/2019/04/13/5cb1aaf7b4db0.gif)
Windows用户在
> `C:\Users\[用户名]\AppData\Roaming\Code\User\globalStorage`

目录下放置一个名为`QuickPluginDirConstruct.json`文件，插件会根据json配置来生成指定结构的目录。文件格式如下，注意一定要有这几个键值：
> `playerDir,npcDir,monsterDir,mountDir,douhunDir,shbbDir`

![jsonconfig](https://i.loli.net/2019/05/29/5cee4a9a03f3049118.png)

### **快速归类序列帧**

一键归类序列帧，用于快速将序列帧按顺序归类到对应的方向和子文件夹中。需要在选择的目录下放置一个config.json，结构如下，可以自定义添加内容到struct键值对应的数组中:
![jsonconfig2](https://i.loli.net/2019/05/09/5cd3e686d2efe.png)

## 要求

- Node环境，基本上安装VS Code自带

## 发布日志

### 0.1.0

2019.05.29: 快速创建目录的结构通过读取json配置，托管到Github

### 0.0.4

2019.05.24: 修改monster怪物默认文件夹结构

### 0.0.3

2019.05.09: 支持读取config.json，一键快速归类序列帧

### 0.0.2

2019.04.28: 增加新建合体技模板文件夹需求

### 0.0.1

2019.04.13: 第一次发布

#### Author: zpo Qdazzle tingsven@163.com