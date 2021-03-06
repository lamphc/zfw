/**
 * 封装全局axios
 * 1. 创建一个axios实例=》添加全局的配置：后台接口的基础路径、超时时间等
 * 2. 给axios实例添加拦截器
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getToken } from '.';


// 后台的基础路径

// const BASE_URL = 'https://api-haoke-dev.itheima.net';
const BASE_URL = 'https://api-haoke-web.itheima.net';
// 创建一个axios实例(单例模式)
const myAxios = axios.create({
  baseURL: BASE_URL,
});

// 添加拦截器
// Add a request interceptor=》请求之前调用
myAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('开始请求了：', config)
  Toast.loading('加载中...', 0);
  // 统一加token
  // console.log(config.headers)
  // 给那些接口加？
  // 白名单 =》定义不要加token的接口
  const { url, headers } = config;
  const whiteName = ['/user/login', '/user/registered'];
  // 用户相关的接口需要加（排除白名单）
  if (url.startsWith('/user') && !whiteName.includes(url)) {
    headers.authorization = getToken()
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor=》请求成功调用
myAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('请求成功了：', response)
  Toast.hide()
  // 设计一个新的简化的数据结构，然后返回
  let _res = {
    status: response.data.status,
    data: response.data.body,
    description: response.data.description
  }

  return _res;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default myAxios;
export { BASE_URL }



