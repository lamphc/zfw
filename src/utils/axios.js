/**
 * 封装全局axios
 * 1. 创建一个axios实例=》添加全局的配置：后台接口的基础路径、超时时间等
 * 2. 给axios实例添加拦截器
 */
import axios from 'axios';

// 创建一个axios实例
const myAxios = axios.create({
  baseURL: 'http://api-haoke-dev.itheima.net',
});

// 添加拦截器
// Add a request interceptor=》请求之前调用
myAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('开始请求了：', config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor=》请求成功调用
myAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('请求成功了：', response)
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default myAxios



