## 项目简介

#### 1、是一个简单express项目，功能是展示构建日志

#### 2、可基于此项目快速搭建自己想要的项目


## 本地预览

1. npm i

2. node server.js

3. 前端页面地址：`http://localhost:8080/yoursite/loggers/1`


## webapi地址

1. 提交构建日志：

```javascript
// 提交构建日志：
const saveLogger = (option) => {
  return axios.post('http://localhost:8080/yoursite/loggers', {
    content: option.content,
    publisher: option.publisher,
    env: option.env
  });
}
```