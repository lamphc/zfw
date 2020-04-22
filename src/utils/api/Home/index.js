/**
 * 首页相关的所有接口
 */

import api from '../../axios';

// 轮播图接口
export function getSwiper() {
  // 返回是个啥？=>promise
  return api.get('/home/swiper')
}

// 租房小组
export function getGruops(area = 'AREA|88cff55c-aaa4-e2e0') {
  return api.get('/home/groups', {
    params: {
      area
    }
  })
}

// 咨询列表
export function getNews(area = 'AREA|88cff55c-aaa4-e2e0') {
  return api.get('/home/news', {
    params: {
      area
    }
  })
}