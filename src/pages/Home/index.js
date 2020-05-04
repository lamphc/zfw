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
import HookDemo from '../Hook';

class Home extends Component {

  state = {
    // 选中状态
    selectedTab: this.props.location.pathname
  };


  componentDidMount() {
    this.listenRouter()
  }

  // 监听路由变化 => 不能用PureCompotent做性能优化
  // 路由监听事件解绑
  listenRouter = () => {
    // let id = setTimeout(() => {
    //   console.log(1000)
    // }, 2000)
    // console.log(id)
    // // 清除定时器
    // clearTimeout(id)
    this.unlisten = this.props.history.listen((location) => {
      if (location.pathname !== this.state.selectedTab) {
        this.setState({
          selectedTab: location.pathname,
        });
      }
    })
    // console.log('路由监听事件返回值', sd)
  }


  // 组件销毁
  componentWillUnmount() {
    // 销毁路由监听事件
    this.unlisten()
  }




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
              // this.setState({
              //   selectedTab: item.path,
              // });
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
        {/* hook */}
        <Route path="/home/hook" component={HookDemo} />

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