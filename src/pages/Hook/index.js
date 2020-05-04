import React, { useState, useEffect, useRef } from 'react';
/**
 * 函数组件
 * 1. 怎么玩响应式=》state
 * 2. 钩子函数 =》加载时候 ｜ 更新触发 ｜  销毁 =》钩子函数
 */
function HookDemo() {
  // count => 设置了一个state = {count:0}
  // setCount(改变的值) =》 this.setState({count: this.state.count+1})
  // 值类型
  // count 值
  const [count, setCounts] = useState(0);
  // 引用类型
  // list 列表
  const [list, setList] = useState([1, 2, 3])

  const inputEl = useRef(null);

  // 拆分代码
  useEffect(() => {
    // componentDidMount、componentDidUpdate 和 componentWillUnmount
    document.title = '你好，hook！';
    console.log(100)
  })

  useEffect(() => {
    // componentDidMount、componentDidUpdate 和 componentWillUnmount
    // ajax
    console.log('我是effect hook!')
  }, [count])


  return (
    <div>
      <p ref={inputEl}>{count}</p>
      {/* 自加一 */}
      <button style={{ background: 'red', color: 'white' }} onClick={() => {
        setCounts(count + 1);
        console.log(inputEl)
      }}>点击加一</button>
      <hr />
      <ul>
        {
          list.map((item) => <li key={item}>{item}</li>)
        }
      </ul>
      <button style={{ background: 'orange', color: 'white' }} onClick={() => {
        setList([...list, Math.random() * 100])
      }}>点击新增</button>
    </div>
  )
}

export default HookDemo