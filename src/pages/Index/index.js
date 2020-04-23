/**
 * 默认首页
 */
import React, { Component } from 'react';
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile';
import { BASE_URL } from '../../utils/axios';
import { getSwiper, getGruops, getNews } from '../../utils/api/Home';

import './index.scss'
import Navs from '../../utils/navConfig';
import { getCurCity } from '../../utils';


class Index extends Component {
  state = {
    // 轮播图的数据
    swiper: [],
    // 租房小组的数据
    groups: [],
    // 咨询列表数据
    news: [],
    // 当前城市
    curCity: {
      // 城市名字
      label: '--',
      // 城市ID
      value: ''
    },
    // 头部搜索的关键词
    keyword: '',
    // 设置轮播图的默认高度
    imgHeight: 176,
    // 是否自动播发
    isPlay: false,
  }
  componentDidMount() {
    this.getAllDatas();
    this.getCurCity()

  }

  getCurCity = async () => {
    const res = await getCurCity()
    this.setState({
      curCity: res
    })
  }


  // 获取首页所有接口的数据
  getAllDatas = async () => {
    // const p1 = Promise.resolve(1);// 返回Promise对象 === new Promise()
    // const p2 = Promise.resolve([{ a: 1 }, { a: 2 }]);
    try {
      let [swiper, groups, news] = await Promise.all([getSwiper(), getGruops(), getNews()]);
      if (swiper.status === 200 && groups.status === 200 && news.status === 200) {
        this.setState({
          swiper: swiper.data,
          groups: groups.data,
          news: news.data
        }, () => {
          this.setState({
            isPlay: true
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 渲染顶部导航
  renderTopNav = () => {
    const { push } = this.props.history
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={() => {
            push('/cityList')
          }}>
            {this.state.curCity.label}<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            // 受控组件（双向绑定）
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={
          () => {
            push('/map')
          }
        }>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel
        // 自动播放
        autoplay={this.state.isPlay}
        autoplayInterval={2000}
        infinite
      >
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="http://www.itheima.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                // 窗口大小改变的时候=》自适应 =》移动端适配
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  // 渲染栏目导航
  renderNavs = () => {
    return (
      <Flex className="nav">
        {
          Navs.map((item) => <Flex.Item onClick={
            () => {
              this.props.history.push(item.path)
            }
          } key={item.id}>
            <img src={item.img} />
            <p>{item.name}</p>
          </Flex.Item>)
        }
      </Flex>
    )
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  // 渲染租房小组
  renderGroups = () => {
    return (
      <>
        {/* title */}
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/* 宫格布局 */}
        <Grid
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => (
            // item结构
            <Flex key={item.id} className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </>
    )
  }

  render() {
    return (
      <div className="index">
        {/* 头部搜索 */}
        {
          this.renderTopNav()
        }
        {/* 轮播图 */}
        {
          this.renderSwiper()
        }
        {/* 栏目导航 */}
        {
          this.renderNavs()
        }
        {/* 租房小组 */}
        <div className="group">
          {
            this.renderGroups()
          }
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default Index;