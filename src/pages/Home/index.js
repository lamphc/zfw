/**
 * TabBar
 */
import React, { Component } from 'react';

import { Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import './index.css'


import Index from '../Index';
import House from '../House';
import Profile from '../Profile';
import TabBarConfig from '../../utils/tabBarConfig';

class Home extends Component {

  state = {
    // 选中状态
    selectedTab: this.props.location.pathname
  };



  // 渲染TabBar组件
  renderTabBar = () => {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        noRenderContent={true}
      >
        {
          TabBarConfig.map((item) => <TabBar.Item
            title={item.title}
            key={item.path}
            icon={<i className={`iconfont ${item.icon}`} />}
            selectedIcon={
              <i className={`iconfont ${item.icon}`} />
            }
            selected={this.state.selectedTab === item.path}
            // 点击事件=》切换路由
            onPress={() => {
              this.setState({
                selectedTab: item.path,
              });
              this.props.history.push(item.path)
            }}
          />
          )
        }
      </TabBar>
    )
  }


  render() {
    return (
      <div className="home">
        {/* 配置二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        {/* 标签栏TabBar */}
        <div className="tabBar">
          {
            this.renderTabBar()
          }
        </div>
      </div>
    );
  }
}

export default Home;