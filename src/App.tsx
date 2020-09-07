import React, { Component } from 'react';

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

function App() {
  return (
    <Post content="完成 Post 组件，接受一个字符串的 content 作为 props，Post 会把它显示到自己的 <p> 元素内。"></Post>
  )
}


/**
#11 获取文本的高度
完成 Post 组件，接受一个字符串的 content 作为 props，Post 会把它显示到自己的 <p> 元素内。
并且，点击 <p> 元素的时候，会使用 console.log 把元素的高度打印出来。
*/

class Post extends Component<any, any> {

  p:HTMLParagraphElement | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      content: '数据加载中...',
    }
  }

  showHeight() {
    if(!this.p) {
      return;
    }

    console.info(this.p.clientHeight)
  }
 
  render() {
    return (
    <p ref={(p) => {
      this.p = p;
    }} onClick={this.showHeight.bind(this)}>
      {this.props.content}
    </p>
    )
  }

}

export default App;
