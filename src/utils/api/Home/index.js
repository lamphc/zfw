/**
 * 首页相关的所有接口
 */

import api from '../../axios';

// 轮播图接口
export function getSwiper() {
  // 返回是个啥？=>promise
  return api.get('/home/swiper')
}