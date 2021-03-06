import React, { lazy, Suspense } from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home';
// 正常写法
// import CityList from './pages/CityList';
// import Map from './pages/Map';
// import NotFound from './pages/NotFound';
// import HouseDetail from './components/HouseDetail';
// import Login from './pages/Login';
// import Rent from './pages/Rent';
// import RentAdd from './pages/Rent/Add';
// import Search from './pages/Rent/Search';
// 懒加载写法
const CityList = lazy(() => import('./pages/CityList'));
const Map = lazy(() => import('./pages/Map'))
const NotFound = lazy(() => import('./pages/NotFound'))
const HouseDetail = lazy(() => import('./components/HouseDetail'))
const Login = lazy(() => import('./pages/Login'))
const Rent = lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const Search = lazy(() => import('./pages/Rent/Search'))


function App() {
  return (
    <Router>
      <Suspense fallback={<center>加载中...</center>}>
        <div className="app">
          <Switch>
            {/* 路由重定向 */}
            <Redirect exact from="/" to="/home" />
            {/* 应用的一级路由 */}
            <Route path="/home" component={Home} />
            {/* 城市选择列表 */}
            <Route path="/cityList" component={CityList} />
            {/* 地图找房 */}
            <Route path="/map" component={Map} />
            {/* 房源详情的路由 */}
            <Route path="/detail/:id" component={HouseDetail} />
            {/* 登录 */}
            <Route path="/login" component={Login} />
            {/* 发布房源相关 */}
            {/* 房源管理-登录人发布的房源列表 */}
            <Route path="/rent" exact component={Rent} />
            {/* 发布房源 */}
            <Route path="/rent/add" component={RentAdd} />
            {/* 搜索发布的房源小区 */}
            <Route path="/rent/search" component={Search} />
            {/* 配置404页面 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
