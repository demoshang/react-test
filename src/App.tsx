import React, { Component } from 'react';
import './App.css';

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

function App() {
  return (
    <BlackBorderContainer>
    <div className='name'>My Name：Lucy</div>
    <p className='age'>
      My Age：<span>12</span>
    </p>
  </BlackBorderContainer>
  )
}


/**
#13 黑色边框的容器组件
实现一个组件 BlackBorderContainer，它会把作为它的嵌套结构的 每个直接子元素 都用一个黑色边框的 div 包裹起来。例如：
```
<BlackBorderContainer>
  <div className='name'>My Name：Lucy</div>
  <p className='age'>
    My Age：<span>12</span>
  </p>
</BlackBorderContainer>
```
最后的 div.name 和 p.age 都具有一层黑色边框（1px solid #000000）外层结构。
 */

 class BlackBorderContainer extends Component<any, any> {
   render() {
     return (
     <div>
       {(this.props.children as any).map((ele: any) => {
         return (
           <div className="black-container">
             {ele}
           </div>
         )
       })}
     </div>
     )
   }
 }

// class Post extends Component<any, any> {
//   constructor(props: any) {
//     super(props);

//   }

 
//   render() {
//     return (
//       <p style={this.props.style}>任意内容</p>
//     )
//   }

// }

export default App;
