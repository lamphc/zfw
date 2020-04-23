/**
 * 全局公共方法
 */
import { getCityInfo } from './api/City';

const CURR_CITY = 'curr_city';
// 封装本地存储方法
// 存储本地数据
export function setLocal(key, val) {
  localStorage.setItem(key, val)
}
// 获取本地数据
export function getLocal(key) {
  return localStorage.getItem(key)
}

// 删除本地数据
export function delLocal(key) {
  localStorage.removeItem(key)
}

//  1. 返回Promise =》外边调用者可以通过async和await的方式获取resolve的数据
//  2. 城市信息存储到本地=》localStotage


// 根据百度地图API获取定位城市名字
const getCityName = async () => {
  return new Promise((resolve, reject) => {
    let myCity = new window.BMap.LocalCity();
    myCity.get((res) => {
      resolve(res.name)
    })
  })
}

export async function getCurCity() {
  // 先从本地获取之前保存过的城市定位信息
  let curCity = JSON.parse(getLocal(CURR_CITY));
  // 获取到城市名字=》做比对 
  // 同步方式
  let res = await getCityName();
  let realName = res.substr(0, 2);
  if (!curCity || realName !== curCity.label) {
    // 如果没有（第一次定位）
    // 获取定位信息,返回promise对象=》resolve结果
    return new Promise(async (resove, reject) => {
      // 调用接口获取城市详细信息
      const { status, data } = await getCityInfo(realName);
      if (status === 200) {
        // 存储到本地
        setLocal(CURR_CITY, JSON.stringify(data))
        // 传递数据
        resove(data)
      } else {
        reject('error')
      }
    })
  }
  else {
    // 如果有，返回本地存储获取的信息
    return Promise.resolve(curCity)
  }
}

/**
 * 本地存储的方式？
 * 1. cookie
 *  不安全；4k
 * 2. localStotage
 * 5M；除非你手动清理，否则一直存在
 * 3. sessionStorage
 * 5M；浏览器窗口关闭了，就消失了
 * 4. IndexDB
 * 无限制；
 */