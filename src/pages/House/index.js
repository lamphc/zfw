import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// import './name.scss'
// 导入样式
import styles from './index.module.css'


export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
        {/* 筛选结果：列表 */}
      </div>
    )
  }
}
