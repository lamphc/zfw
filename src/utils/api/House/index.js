/**
 * 房源相关的所有接口
 */

import api from '../../axios';

// 获取过滤器数据
export function getFilters(id) {
  return api.get('/houses/condition', {
    params: {
      id
    }
  })
}
// 根据筛选器条件获取房源列表
export function getListByFilter(cityId, filters, start, end) {
  return api.get('/houses', {
    params: {
      cityId,
      // 组装的过滤器数据结构出来
      ...filters,
      // 分页
      start,
      end
    }
  })
}

// 根据房源ID获取房源详情
export function getDetailById(id) {
  return api.get(`/houses/${id}`)
}
// 上传图片
export function uploadImgs(fd) {
  return api.post(`/houses/image`, fd)
}







