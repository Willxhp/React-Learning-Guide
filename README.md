## React18 学习指南

本指南中的代码为多个使用react制作的Demo，包含了React 18的核心用法以及redux、react-router等生态的使用方法。

### 一、基础概念

#### 1. 创建React项目

使用React脚手架可以快速创建React项目。其核心是使用了`react-scripts`这个库来进行创建。

```powershell
npm i -g create-react-app
create-react-app 项目名
```

#### 2. 基本API

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

// 获取根节点，HTML文件中实现声明一个id为root的div
const root = ReactDOM.createRoot(document.getElementById('root'))
// 创建React元素
const div = React.createElement('div', {}, 'Hello World')
// 将元素渲染到root节点中
root.render(div)
```

`React.createElement()`用来创建一个React元素，方法的参数：1.元素的名称（html标签必须小写）；2.标签中的属性：class属性需要使用className来设置，事件的属性名需要修改为驼峰命名法；3.元素的内容，可以包括子元素，可以有多个元素。React元素最终会通过虚拟DOM转换为真实的DOM元素，React元素一旦创建就无法修改，只能通过新创建的元素进行替换。

`ReactDOM.createRoot()`用来获取根元素，`root.render()`用来将React元素渲染到根元素中，根元素中所有的内容都会被删除，被React元素所替换，当重复调用`render()`时，React会将两次的渲染结果进行比较，它会确保只修改那些发生变化的元素，对DOM做最少的修改(diff算法)。**在老版本中的使用方式为`ReactDOM.render(div, document.getElementById('root'))`**。

#### 3. JSX

JSX就是`React.createElement()`的语法糖，JSX在执行之前都会被转换成JS代码，使用babel来进行翻译，如果要在HTML文件的`<script>`标签中书写JSX代码，则需要使用`<script type="text/babel"></script>`并引入babel来进行编译。

```jsx
// JSX常见用法
const div = <div>
   Hello World
   <button>click me</button>
</div>
// 以下是JSX的注释方法
{/* 注释内容 */}
```

JSX的注意事项：1. JSX不是字符串，不要加引号；2. JSX中html标签应该小写，React组件应该大写开头；3. JSX中有且只有一个根标签；4. JSX的标签必须正确结束（自结束标签必须写/）；5. 在JSX中可以使用{}嵌入表达式，有值的语句的就是表达式；6. 如果表达式是空值、布尔值、undefined，将不会显示；7. object不能放入JSX语法中；8. 当JSX中使用array时，会将数组中的每一项合并展示；8. 在JSX中，属性可以直接在标签中设置，class需要使用className代替，style中必须使用对象设置，如style={{background:'red'}}。

```jsx
// 使用jsx来渲染列表
// 由于jsx中不能写循环语句，可以借助数组的方法对数组进行遍历，将数组的每一项转换成React元素
// 渲染列表时一定要添加key属性，充分发挥diff算法的优势，而且最好使用数组每一项的id属性作为key
const data = ['a', 'b', 'c']
const list = <ul>{data.map((item, index) => <li key={index}>{item}</li>)}</ul>
```

React事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象，React中的事件对象同样不是原生的事件对象，是经过React包装后的事件对象，由于对象进行过包装，所以使用过程中无需再去考虑兼容性问题。在React中，无法通过return false取消默认行为。属性值不能直接执行代码，而是需要一个回调函数。

```jsx
const clickHandler = (e) => {
    e.preventDefault() // 阻止默认行为
    e.stopPropagation() // 阻止事件冒泡
}
const btn = (<div onClick={() => {alert('ok')}}><button onClick={clickHandler}>click me</button></div>)
```

#### 4. 组件

React中有两种组件定义方式，其中React18主要使用函数式组件，而React16、17则以类组件为主。

函数式组件就是一个返回JSX的普通函数，组件名的首字母必须大写。

```jsx
const App = () => {
    return <div>APP根组件</div>
}
export default App

// index.js文件中
import App from './App'
// React组件可以通过render方法直接渲染
root.render(<App/>)
```

类组件需要继承`React.Component`，其包含一个返回JSX的render方法。

```jsx
import React from 'react'
class App extends React.Component {
    render() {
        return <div>App根组件</div>
    }
}
export default App
```

在React项目中，组件一般放在Components文件夹中，每个组件都是一个单独的文件夹，包含.jsx文件和.css文件以及其子组件。

### 二、React核心用法

#### 1. props

props是父组件用来向子组件传递参数，是最简单的一种组件通信方式。

**注意：**props是只读的，不能在子组件中对props的值进行修改，该设计体现了React中的单向数据流。

```jsx
// Log.jsx
const Log = () => {
    const userInfo = {
        name: 'Willxhp',
        age: 23
    }
    return <div>
        {/* 如果要把一个对象所有的属性作为单独的props进行传递，可以直接对这个对象进行解构 */}
        <LogItem desc={'描述信息'} time={60} {...userInfo} />
    </div>
}
// LogItem.jsx
// 在子组件的形参中定义一个props，指向一个对象，包含了父组件传递的所有参数
const LogItem = (props) => {
    return <div>
    	<h2 className="desc">{props.desc}</h2>
        <div className="time">{props.time}</div>
        <div>{props.name} --- {props.age}</div>
    </div>
}
```

而在类组件中，props是存储到实例对象中，可以通过`this.props`来访问。

#### 2. state

在React中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染。要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染，就需要一个特殊变量，当这个变量被修改使组件会自动重新渲染。state相当于一个变量，只是这个变量在React中进行了注册，React会监控这个变量的变化，当state发生变化时，会自动触发组件的重新渲染，使得修改可以在页面中呈现出来。在函数组件中，我们需要通过钩子函数`useState()`来获取state。

**注意：**类似于`useState()`这样的函数被称为钩子函数，React中的所有钩子函数都只能在函数组件内调用。

```jsx
import {useState} from 'react'
// useState()需要一个参数，这个参数就是state的初始值
// 该方法会返回一个数组，第一个元素是初始值，而第二个元素是用来修改state值的函数，调用该函数会触发组件的重新渲染
const App = () => {
    const [counter, setCounter] = useState(1)
	const addHandler = () => {
    	setCounter(counter + 1)
	}
	const subHandler = () => {
    	setCounter(counter - 1)
	}
    return <div className='app'>
    	<h1>{counter}</h1>
		<button onClick={addHandler}>+</button>
        <button onClick={subHandler}>-</button>
    </div>
}
// 当state的值是一个对象时，修改是用新的对象去替换已有对象
// setState()并没有真正改变接收state的变量值，而是改变了下一次渲染时state的初始值
// setState()方法是一个异步操作，当多个修改操作一起进入队列后，会合并针对同一个state的多次修改
// 所以当setState用到旧值时可能会出现计算错误的情况，为了避免错误，可以向setState方法中传入回调函数
// setState()中回调函数的返回值将会成为新的state值，回调函数执行时，React会将最新的state值作为参数传递
setCounter(preCounter => preCounter + 1)
```

类组件中的state统一存储到了实例对象的state属性中，可以通过`this.state`来访问，同时使用`this.setState()`来修改state，React只会修改设置了的属性。

#### 3. ref

在React中获取DOM元素可以通过`useRef()`进行获取。

```jsx
import {useRef} from 'react'

const App = () => {
	const divRef = useRef() // {current: undefined}
    const clickHandler = () => {
        alert(divRef.current === document.getElementById('div')) // true
    }
    return <div ref={divRef} id="div" onClick={clickHandler}>div</div>
}
// useRef()返回一个普通的js对象，这个对象就是一个容器，React会将DOM对象传递到这个容器中
// 通过给被引用的元素添加ref属性，就可以通过容器的current属性访问到该DOM对象
// useRef()可以通过自己定义一个对象来代替{current: null}，自己创建的对象组件每次渲染时都会重新创建一个新的对象，而通过useRef()创建的对象可以确保组件每次的重渲染获取到的都是相同的对象。
```

类组件中使用`React.createRef()`创建实例对象上的一个属性，需要将这个属性设置为指定元素的ref值，获取该值时前面需要加`this`。

#### 4. 双向数据绑定

首先使用React定义表单和之前传统网页中的表单有一些区别，传统网页中form需要指定action和method两个属性，而表单项也必须要指定name属性，这些属性都是提交表单所必须的。但是在React中定义表单时，这些属性通通都可以不指定。当改变表单中的内容时，state中的值会变为表单中的相应内容，而当state中的值发生改变时，表单内容也会发生改变。这种表单组件称为受控组件。

```jsx
import {useState} from 'react'
const MyForm = () => {
    const [username, setUsername] = useState('')
    const changeHandler = (e) => {
        setUsername(e.target.value)
    }
    const formSubmitHandler = (e) => {
        e.preventDefault() // 阻止表单的默认提交行为
        // 发送Ajax请求
        // 请求完毕后清空数据
        setUsername('')
    }
    return <form onSubmit={formSubmitHandler}>
     	<div>
        	用户名 <input type="text" value={username} onChange={changeHandler}/>
        </div>
    </form>
}
```

#### 5. Portal

在React中，父组件引入子组件后，子组件会直接在父组件内部渲染。换句话说，React元素中的子组件，在DOM中，也会是其父组件对应DOM的后代元素。如果要在父组件中使用子组件却不想让子组件成为父组件的后代元素，可以使用Protal传送门功能。在组件中中通过`ReactDOM.createPortal()`将元素渲染到新建的元素中。 

```jsx
import reactDOM from 'react-dom/client'
// 首先在HTML文件中创建一个新元素与root平级 <div id="backdrop"></div>

// 将backdrop组件渲染到id位backdrop的div中
const backdropDOM = document.getElementById('backdrop')
const Backdrop = () => {
    return reactDOM.createPortal(<div></div>, backdropDOM)
}
```

#### 6. CSS样式

+ 内联样式

  在React中可以直接通过标签的style属性来为元素设置样式。style属性需要的是一个对象作为值，来为元素设置样式。如果样式名不符合驼峰命名法，需要将其修改为符合驼峰命名法的名字。

  ```jsx
  const styleDemo = () => {
      const divStyle = {color: 'red', backgroundColor: '#fff', margin: '10px auto'}
      return <div style={divStyle}>
      	div
      </div>
  }
  ```

+ 外部样式

  外部样式是将样式编写到外部的css文件中，然后直接通过import进行引入。

  ```css
  /* styleDemo.css */
  .myDiv {
      color: red;
      background-color: #fff;
      margin: 10px auto;
  }
  ```

  ```jsx
  // styleDemo.jsx
  import './styleDemo.css'
  const styleDemo = () => {
      return <div className='myDiv'>
      	div
      </div>
  }
  ```

+ CSS Module

  使用内联样式和外部样式有时会出现命名冲突的问题，为了解决该问题可以使用CSS Module。使用CSS Module编写的样式文件的文件名必须为`xxx.module.css`，在组件中引入样式的格式为`import xxx from './xxx.module.css'`，设置类名时需要使用`xxx.yyy`的形式来设置。CSS模块可以动态的设置唯一的class值来确保不会发生命名冲突。

  ```css
  /* styleDemo.module.css */
  .myDiv {
      color: red;
      background-color: #fff;
      margin: 10px auto;
  }
  ```

  ```jsx
  import classes from './styleDemo.module.css'
  const styleDemo = () => {
      return <div className={classes.myDiv}>
      	div
      </div>
  }
  ```

#### 7. Fragment

在React中，JSX必须有且只有一个根元素，这会导致在有些情况下不得不在子元素的外部添加一个额外的父元素，可以通过定义这样一个组件来消除多余的结构。

```jsx
// MyFragment.jsx
const MyFragment = (props) => {
    // 当组件采用双标签写法时，props.children是一个数组，存储着当前组件的子元素
    return props.children
}
export default MyFragment

// MyComponent.jsx
import MyFragment from './MyFragment'
const MyComponent = () => {
    return <MyFragment>
    	<div>组件一</div>
        <div>组件二</div>
    </MyFragment>
}
```

React中提供了Fragment组件以便直接使用。

```jsx
// 用法一
import React from 'react'
const MyComponent = () => {
    return <React.Fragment>
    	<div>组件一</div>
        <div>组件二</div>
    </React.Fragment>
}
// 用法二
import React, {Fragment} from 'react'
const MyComponent = () => {
    return <Fragment>
    	<div>组件一</div>
        <div>组件二</div>
    </Fragment>
}
// 用法三
import React from 'react'
const MyComponent = () => {
    return <>
    	<div>组件一</div>
        <div>组件二</div>
    </>
}
```

#### 8. Context

Context是实现组件通信的一种方法，Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使得所有的组件都可以访问到这些数据。由于Context对象需要在不同的组件中被使用，所以通常会将Context对象设置到一个单独的模块中并设置为默认导出。`React.createContext(defaultValue)`用来创建一个Context对象，它需要一个初始值作为参数，这个初始值可以是一个原始值，也可以是一个JS对象。调用以后，方法将会返回一个Context对象，这个对象非常关键，当我们想在其他组件中访问Context中的数据时，必须要通过这个对象。

```jsx
// store/test-context.js
import React from 'react'
const TestContext = React.createContext({
    name: 'Willxhp',
    age: 18,
    sayHi() {
        alert(this.name)
    }
})
export default TestContext
```

+ 使用Consumer标签来访问Context中的数据：Consumer的标签体必须是一个函数，这个函数会在组件渲染时调用并且将Context中存储的数据作为参数传递进函数，该函数的返回值将会作为组件被最终渲染到页面中。如果需要访问多个Context可以使用多个Consumer嵌套即可。

  ```jsx
  // component/MyComponent.jsx
  import TestContext from '../store/test-context'
  const MyComponent = () => {
      return (
      	<TestContext.Consumer>
          	{(ctx) => {
                  return (
                  	<ul>
                      	<li>{ctx.name}</li>
                          <li>{ctx.age}</li>
                      </ul>
                  )
              }}
          </TestContext.Consumer>
      )
  }
  ```

+ 使用`useContext`访问Context中的数据：将Context对象作为参数传递给钩子函数，它就会直接给我们返回Context对象中存储的数据。

  ```jsx
  import React, {useContext} from 'react'
  import TestContext from '../store/test-context'
  const MyComponent = () => {
      const ctx = useContext(TestContext)
      return (
      	<ul>
          	<li>{ctx.name}</li>
              <li>{ctx.age}</li>
          </ul>
      )
  }
  ```

+ 使用Provider指定Context中的值：Provider会设置在外层组件中，通过value属性来指定Context的值。这个Context值在所有的Provider子组件中都可以访问。Context的搜索流程和JS中函数作用域类似，当我们获取Context时，React会在它的外层查找最近的Provider，然后返回它的Context值。如果没有找到Provider，则会返回Context模块中设置的默认值。

  ```jsx
  // App.js
  import React, {useContext} from 'react'
  import TestContext from './store/test-context'
  import MyComponent from './component/MyComponent'
  
  const App = () => {
      return <TestContext.Provider value={{name: 'Will', age: 20}}>
      	<MyComponent/>
      </TestContext.Provider>
  }
  ```

#### 9. Effect

副作用：React组件有部分逻辑都可以直接编写到组件的函数体中的，像是对数组调用filter、map等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。例如，如果直接将修改state的逻辑编写到了组件之中，就会导致组件不断的循环渲染，直至调用次数过多内存溢出。如果React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会去检查组件中是否写有副作用的代码，这种检查是通过重复调用来实现的。React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。以下方法会在严格模式的开发模式下重复调用两次：

+ 类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法
+ 类组件的静态方法 `getDerivedStateFromProps`
+ 函数组件的函数体
+ 参数为函数的`setState`
+ 参数为函数的`useState`, `useMemo`, or `useReducer`

函数组件中`setState`的执行流程：调用`setState`函数时，首先会判断当前组件处于什么阶段：如果是渲染阶段（即`setState`在组件函数体内部调用），则不会检查state的值是否相同；如果是不是渲染阶段，则会检查state的值是否相同，若值不相同，则对组件进行重新渲染，若值相同，则不对组件进行重新渲染，但是在一些情况下（通常为state值第一次相同时），即使值相同，React也会继续执行当前组件的渲染，但是这次渲染不会触发其子组件的渲染，而且这次渲染也不会产生实际的效果。这种执行流程导致了如果在组件函数体内部执行`setState`的话会导致Too many re-renders的错误。

为了解决这个问题React专门提供了钩子函数`useEffect()`，专门用来处理那些不能直接写在组件内部的代码。`useEffect()`中的回调函数会在组件每次渲染完毕之后执行，这也是它和写在函数体中代码的最大的不同，函数体中的代码会在组件渲染前执行，而`useEffect()`中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染。

```jsx
import React, {useEffect, useState} from 'react'
const App = () => {
    const [count, setCount] = useState(0)
    // setCount(1) // 报错
    useEffect(() => {
        setCount(1)
    }, [count])
    return <div>{count}</div>
}
```

默认情况下，`useEffect()`中的函数，会在组件渲染完成后调用，并且是每次渲染完成后都会调用，可以在`useEffect()`中传递第二个参数，第二个参数是一个数组，在数组中可以指定Effect的依赖项。指定后，只有当依赖发生变化时，Effect才会被触发，通常会将Effect中使用的所有的局部变量都设置为依赖项，这样一来可以确保这些值发生变化时，会触发Effect的执行。像`setState()`方法是由钩子函数`useState()`生成的，`useState()`会确保组件的每次渲染都会获取到相同`setState()`对象，所以`setState()`方法可以不设置到依赖中。如果依赖项设置了一个空数组，则意味Effect只会在组件初始化时触发一次。

`useEffect()`函数中可以返回一个函数作为清除函数，effect返回的函数，会在下一次effect执行前调用，可以在这个函数中清除前一次effect执行所带来的影响。

```jsx
const App = () => {
    const [count, setCount] = useState(0)
    const changeHandler = (e) => {
        setCount(e.target.value)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            // 执行发送ajax请求的业务逻辑
        })
        return () => {
            // 清除定时器实现防抖功能，该函数会在下一次effect执行前调用
			clearTimeout(timer)
        }
    }, [count])
    return (
    	<div><input type="text" onChange={changeHandler}/></div>
    )
}
```

#### 10. Reducer

在React的函数组件中，我们可以通过`useState()`来创建state。这种创建state的方式会给我们返回两个东西state和`setState()`。state用来读取数据，而`setState()`用来设置修改数据。但是这种方式也存在着一些不足，因为所有的修改state的方式都必须通过`setState()`来进行，如果遇到一些复杂度比较高的state时，就需要对`setState()`进行多次封装。在较为复杂的state使用场景之下，Reducer可以整合多种`setState()`操作，便于代码的维护。

`useReducer(reducer, initialArg, init)`的返回值是一个数组，数组中的第一个元素是state值，第二个元素是state的修改派发器.`useReducer()`接收三个参数：

+ reducer：整合函数，对于当前state的所有操作都应该在该函数中定义，该函数的返回值会成为state的新值，reducer在执行时会接收两个参数，第一个参数为state，即当前最新的state值，第二个参数为action，是一个对象，存储dispatch所发送的指令。可以通过action中的属性来区分要对state所做的操作。
+ initialArg：state的初始值，作用和`useState()`中的相同。

```jsx
import React, {useReducer} from 'react'
// 为了防止组件在每次渲染时都重新生成一个reducer，所以将reducer定义在组件函数外
const reducer = (state, action) => {
    switch(state.type) {
        case 'ADD':
            return state + 1
        case 'SUB':
            return state - 1
        default:
            return state
    }
}

const App = () => {
    // useReducer在复杂的state使用条件下可以代替useState
    const [count, countDispatch] = useReducer(reducer, 1)
    
    const subHandler = () => {
        countDispatch({type: 'SUB'})
    }
    
    const addHandler = () => {
		countDispatch({type: 'ADD'})
    }
    
    return (
    	<div>
        	<button onClick={subHandler}>-</button>
            {count}
            <button onClick={addHandler}>+</button>
        </div>
    )
}
```

#### 11. React.memo

React组件会在两种情况下发生重新渲染。第一种，当组件自身的state发生变化时。第二种，当组件的父组件重新渲染时。第二种情况在一些情况下会造成性能的浪费。React提供了一个高阶组件`React.memo()`来实现组件的缓存功能，它接收另一个组件作为参数，并且会返回一个包装过的新组件，包装过后，只有组件的props发生变化后才会触发组件的重新渲染，否则总是会返回缓存中的结果。

```jsx
import React from 'react'
const A = (props) => {
	return (
    	<div>组件A<button onClick={props.onAdd}>+</button></div>
    )
}
export default React.memo(A)
```

在组件函数体内部定义的函数，会在组件渲染时生成一个新的函数，在这种情况下，如果将这个函数作为props传入子组件，那么`React.memo()`将会失去作用，因为props接收的函数每次都是一个新的函数（地址不同）。可以使用`useCallback()`来创建不会总在组件重新渲染时重新创建的回调函数。`useCallback()`接收两个参数，第一个是回调函数，第二个是依赖数组，只有当依赖数组中的变量发生变化时，回调函数才会重新创建，要将回调函数中使用到的所有变量都设置到依赖数组中，`setState()`方法除外，因为此类方法不会发生改变。当依赖数组为空时，只会在初始化时创建回调函数，然后此回调函数不会发生变化。

```jsx
import React, {useCallback} from 'react'
import A from './A'

const B = () => {
    const [count, setCount] = useState(1)
    // 使用这种方式，就不会导致React.memo方法失效
    const changeHandler = useCallback(() => {
        setCount(preCount => preCount + 1)
    }, [])
    
    return (
    	<div>组件B{count}</div>
        <A onAdd={changeHanler}/>
    )
}
```

#### 12. 自定义钩子函数

React提供的钩子函数只能运行在函数组件或自定义钩子函数当中，自定义钩子函数就是一个普通的函数，但是函数的名字需要以use开头，通过使用自定义钩子函数，可以将组件中操作钩子函数的步骤进行封装，从而实现代码的复用。

### 三、redux

#### 1. redux

原生的redux并不是React所独有的，可以用于任何框架，甚至可以在网页中引入直接使用。redux的三个核心概念为Store、Action Creators和Reducers。其中Store中保存着所有的状态，Reducers用来实现对Store中状态的修改，而Action Creators用于创建一个action，通过向store派发action（普通的js对象，包含要对数据进行的操作信息），可以通知Reducers对store进行状态的修改，以下为redux原理图。原生redux的使用与React 18中的`useReducer()`非常相似。

![redux原理图](.\public\reactImg\redux原理图.png)

```powershell
npm i redux # 安装redux
```

```jsx
// 以下展示了原生redux的核心用法
// src/store/reducers/count.js
// 定义reducer时需要指定state的初始值
// action就是一个普通的js对象，一般结构为{type: xxx, data: xxx}
export default (preState = 0, action) => {
    switch (action.type) {
        case 'ADD':
            return preState + action.payload
        case 'SUB':
            return preState - action.payload
        default: 
            return preState
    }
}

// src/store/actions/count.js
// Action Creators用来生成action，即返回普通对象的函数
export const incrementAction = (data) => ({type: 'ADD', payload: data})

// src/store/index.js
import {createStore} from 'redux'
import countReducer from './reducers/count'

// 也可以在createStore中传入第二个参数作为state的初始值
const store = createStore(countReducer)

// src/App.jsx
// 使用store.getState()来获取redux中存储的state值
import store from './store'
import {incrementAction} from './store/actions/count'
export default function App() {
    const [num, setNum] = useState(0)
    const addHandler = () => {
        store.dispatch(incrementAction(num))
    }
    const changeHandler = (e) => {
		setNum(e.target.value)
    }
    return (
    	<div>
            {store.getState()}
            <input value={num} onChange={changeHandler} />
            <button onClick={addHandler}>+</button>
        </div>
    )
}

// src/index.js
// redux中的状态发生变化后，React无法检测到状态发生变化，也就无法重新渲染页面，所以必须监听redux中state的变化并手动更新页面
// store.subscribe(() => {}) 该方法接收一个函数，当store中的状态发生变化时触发
import store from './store'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)
// 监听store中状态的变化，每当状态发生变化，重新渲染App组件从而实现页面的更新
store.subscribe(() => {
    root.render(<App/>)
})
```

#### 2. react-redux

为了在React项目中更加方便的使用redux，可以在redux的基础上搭配使用react-redux。在react-redux中，将组件分为UI组件和容器组件两种：UI组件不能使用任何redux的api，只负责页面的呈现、交互等；容器组件负责和redux通信，将结果交给UI组件。在最新版本的react-redux中弱化了容器组件的概念，使用两个钩子函数实现了容器组件的功能，新版本的更加配合React 18版本的使用。react-redux的模型图见下图。react-redux设计的核心思想就是将redux的业务逻辑从组件中抽离出来，实现业务的解耦。

![react-redux模型图](.\public\reactImg\react-redux模型图.png)

```powershell
npm i redux react-redux -S
```

```jsx
// 旧版本用法
// src/store/reducers/count.js
// 定义reducer时需要指定state的初始值
// action就是一个普通的js对象，一般结构为{type: xxx, data: xxx}
export default (preState = 0, action) => {
    switch (action.type) {
        case 'ADD':
            return preState + action.payload
        case 'SUB':
            return preState - action.payload
        default: 
            return preState
    }
}

// src/store/actions/count.js
// Action Creators用来生成action，即返回普通对象的函数
export const incrementAction = (data) => ({type: 'ADD', payload: data})

// src/store/index.js
import {createStore} from 'redux'
import countReducer from './reducers/count'

// 也可以在createStore中传入第二个参数作为state的初始值
const store = createStore(countReducer)

// src/containers/Count/Count.jsx
// 使用store.getState()来获取redux中存储的state值
import store from './store'
import {incrementAction} from './store/actions/count'
import {connect} from 'redux-react'
function Count(props) {
    const [num, setNum] = useState(0)
    const addHandler = () => {
        props.increment(num)
    }
    const changeHandler = (e) => {
		setNum(e.target.value)
    }
    return (
    	<div>
            {props.count}
            <input value={num} onChange={changeHandler} />
            <button onClick={addHandler}>+</button>
        </div>
    )
}
// connect()()返回的就算是一个容器组件，这个组件目前已经建立与store和UI组件的关联
// connect接收两个参数，第一个参数mapStateToProps必须是函数，而第二个参数mapDispatchToProps可以是函数，也可以是对象
// mapStateToProps可以接收到store中存储的state，是用于映射状态，UI组件可以在自身的props上访问到相应的状态，必须返回一个对象
// mapDispatchToProps可以接收到store的dispatch方法，用于映射操作状态的方法，其为函数时必须返回一个对象
// mapDispatchToProps是对象时相当于其作为函数时的一种简写方式
export default connect(
	state => ({count: state}),
    dispatch => ({
        increment: (num) => {dispatch(incrementAction(num))}
    })
    /*
   	{increment: incrementAction} // 与函数写法等效，react-redux在底层进行dispatch操作
    */
)(Count)

// src/index.js
// 使用react-redux后，React可以自动检测到状态变化，无需手动更新
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // 借助Provider组件，可以将store一次性传给APP组件下的所有容器组件，不需要单独进行传递
	<Provider store={store}>
    	<App/>
    </Provider>
)
```

在新版本中，react-redux提供了一个钩子函数`useSelector()`，用于获取redux中存储的数据，它需要一个回调函数作为参数，回调函数的第一个参数就是当前的state，回调函数的返回值，会作为`useSelector()`的返回值返回，所以`state => state`表示直接将整个state作为返回值返回。`useDispatch()`同样是react-redux提供的钩子函数，用来获取redux的派发器，对state的所有操作都需要通过派发器来进行。使用两个钩子函数可以不需要使用`connect()()`来创建容器组件。

```jsx
// 新版本用法（多个Reducer情况）
// src/store/reducers/student.js
const initState = {name: 'Willxhp', age: 18}
export default (preState = initState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...preState, name: action.payload}
        case 'SET_AGE':
            return {...preState, age: action.payload}
        default: 
            return preState
    }
}

// src/store/reducers/school.js
// const initState = {name: 'WillSchool', address: 'Argentina'}
export default (preState = initState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...preState, name: action.payload}
        case 'SET_ADDRESS':
            return {...preState, address: action.payload}
        default: 
            return preState
    }
}

// src/store/actions/student.js
// Action Creators用来生成action，即返回普通对象的函数
export const setStuNameAction = (name) => ({type: 'SET_STUDENT_NAME', payload: name})
export const setStuAgeAction = (age) => ({type: 'SET_STUDENT_AGE', payload: age})

// src/store/actions/school.js
export const setSchNameAction = (name) => ({type: 'SET_SCHOOL_NAME', payload: name})
export const setSchAddressAction = (address) => ({type: 'SET_SCHOOL_AGE', payload: address})

// src/store/index.js
// 在有多个reducers的情况下，使用redux提供的combineReducers方法将多个reducers合并
import {createStore, combineReducers} from 'redux'
import studentReducer from './reducers/student'
import schoolReducer from './reducers/school'
// 合并reducer
const reducer = combineReducers({
    student: studentReducer,
    school: schoolReducer
})
const store = createStore(reducer)

// src/containers/MyComponent/MyComponent.jsx
import {useSelector, useDispatch} from 'react-redux'
import store from './store'
import {setStuNameAction, setStuAgeAction} from './store/actions/student'
import {setSchNameAction, setSchAddressAction} from './store/actions/school'

export default function MyComponent(props) {
    // 获取两种数据
    const student = useSelector(state => state.student)
    const school = useSelectore(state => state.school)
    // 获取操作数据的方法
    const dispatch = useDispatch()
    
    return (
    	<div>
            <p>{student.name} - {student.age}</p>
            <div>
            	<button onClick={() => {dispatch(setStuNameAction('Will'))}}>修改学生姓名</button>
                <button onClick={() => {dispatch(setStuAgeAction(28))}}>修改学生年龄</button>
            </div>
            <p>{school.name} - {school.address}</p>
            <div>
            	<button onClick={() => {dispatch(setSchNameAction('BeijingSchool')}}>修改学校名称</button>
                <button onClick={() => {dispatch(setSchAddressAction('China')}}>修改学校地址</button>
            </div>
        </div>
    )
}

// src/index.js
// 使用react-redux后，React可以自动检测到状态变化，无需手动更新
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // 借助Provider组件，可以将store一次性传给App组件下的所有容器组件，不需要单独进行传递
	<Provider store={store}>
    	<App/>
    </Provider>
)
```

#### 3. redux toolkit (RTK）

原生redux的使用存在几种问题，需要手动创建多个Action Creators，而且actions中case后面的常量维护非常麻烦，不同actions之间也不能使用相同的常量，此外state每次操作时，都需要对state进行复制，然后再去修改，使用redux toolkit则可以有效解决上述问题。redux toolkit的特点是将Reducer和Action Creators的创建过程合并，只需要创建一个Slice就可以自动生成对应的Reducer和Action Creators。

```powershell
npm i react-redux @reduxjs/toolkit -S # @reduxjs/toolkit完全替代了redux核心库的功能
```

```jsx
// 多个Reducers的情况
// src/store/slices/stuSclice
import {createSlice} from '@reduxjs/toollit'

// 使用createSlice()方法可以创建一个reducer切片，接收一个配置对象作为参数
const stuSlice = createSlice({
    name: 'stu', // 用来生成action中的type
    initialState: {
        name: 'Willxhp',
        age: 18
    }, // state的初始值
    reducers: { // 操作state的方法
        // 与redux核心库的不同之处在于，不再将多个操作state的方法通过switch case结构写在一个reducer函数中
        // 将不同操作state的方法分别写在各自的函数中，每个函数都可以接收到state和action，无需手动对action.type再进行判断
		setName(state, action) {
            // 接收到的state是一个代理对象，可以对其直接修改，而无需先复制后再修改
            state.name = action.payload
        },
        setAge(state, action) {
            state.age = action.paylaod
        }
    }
})

// 切片的actions属性中存储的是slice自动生成的action creators(普通函数)，调用后会自动创建action对象
// 自动创建的action对象的结构 {type: 'name/函数名', payload: 传入创建器函数的参数}
export const {setName, setAge} = stuSlice.actions
// 切片的reducer属性就是redux核心库中的Reducer函数
export const {reducer: stuReducer} = stuSlice

// src/store/slice/schoolSlice
import {createSlice} from '@reduxjs/toolkit'

const schoolSlice = createSlice({
    name: 'school',
    initialState: {
        name: 'Willschool',
        address: 'Argentina'
    }, 
    reducers: {
        // 不同切片中操作state的方法可以重名，只需在组件使用的时候进行重命名即可
		setName(state, action) {
            state.name = action.payload
        },
        setAddress(state, action) {
            state.address = action.paylaod
        }
    }
})

export const {setName, setAddress} = stuSlice.actions
export const {reducer: stchoolReducer} = stuSlice

// src/store/index.js
// configureStore()用来创建store对象，需要一个配置对象作为参数
import {configureStore} from '@reduxjs/toolkit'
import {stuReducer} from './slice/stuSlice'
import {schoolReducer} from './slice/schoolSlice'

export default configureStore({
    reducer: {
        student: stuReducer,
        school: schoolReducer
    }
})

// src/components/MyComponent/MyComponent.jsx
import {useSeletor, useDispatch} from 'react-redux'
import {setName, setAge} from '../../store/slice/stuSlice'
import {setName as setSchoolName, setAdddress} from '../../store/slice/schoolSlice'

export default function MyComponent() {
    const {student, school} = useSeletor(state => state)
	const dispatch = useDispatch()
    
    return (
    	<div>
        	<p>{student.name} - {student.age}</p>
            <div>
            	<button onClick={() => {dispatch(setName('Will'))}}>修改学生姓名</button>
                <button onClick={() => {dispatch(setAge(28))}}>修改学生年龄</button>
            </div>
            <hr/>
            <p>{school.name} - {school.address}</p>
            <div>
            	<button onClick={() => {dispatch(setSchoolName('Beijingschool'))}}>修改学校名称</button>
                <button onClick={() => {dispatch(setAddress('China'))}}>修改学校地址</button>
            </div>
        </div>
    )
}
```

#### 4. RTK Query (RTKQ)

在之前的操作中，store中的state值都是在本地进行设置，而在实际项目中，state都是通过向后端发送Ajax请求后返回的数据。RTK不仅解决了state的管理问题，同时还提供了RTK Query用来帮助处理数据加载的问题。RTK Query是一个强大的数据获取和缓存工具让Web应用中的加载变得十分简单，不再需要自己编写获取数据和缓存数据的逻辑。

Web应用中加载数据时需要处理的问题：

1. 根据不同的加载状态显示不同UI组件；
2. 减少对相同数据重复发送请求；
3. 使用乐观更新，提升用户体验；
4. 在用户与UI交互时，管理缓存的生命周期。

RTKQ可以对以上问题进行处理。首先，可以直接通过RTKQ向服务器发送请求加载数据，并且RTKQ会自动对数据进行缓存，避免重复发送不必要的请求。其次，RTKQ在发送请求时会根据请求不同的状态返回不同的值，可以通过这些值来监视请求发送的过程并随时中止。

```js
// RTKQ中将一组相关功能统一封装到一个Api对象中
// src/store/api/studentApi
// 使用createApi()创建Api对象
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

const studentApi = createApi({
    // Api的标识，不能与其他的Api或reducer重复
    reducerPath: 'studentApi', 
    // 指定查询的基础信息，fetchBaseQuery表明使用fetch作为Ajax请求的工具
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:1337/api/'
    }),
    // endpoints 用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
    endPoints(build) {
        // build是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents: build.query({
                // 用来指定请求的路径
                query() {
                    return 'students'
                },
                // transformResponse用来转换响应数据的格式，baseQueryReturnValue就是请求原始返回的数据
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data
                }
            }),
            getStudentById: build.query({
                // 调用useGetStudentByIdQuery()传入的参数将会作为实参传入query()函数
                query(id) {
                    return `students/${id}`
                },
                transformResponse(baseQueryReturnValue, meta, arg) {
                    return baseQueryReturnValue.data
                },
                // keepUnusedDateFor用于设置数据缓存的时间，单位为秒，默认为60，设置为0表示不进行缓存
                keepUnusedDataFor: 0
            })
        }
    }
})
// Api对象创建后，对象中会根据各种方法自动的生成对应的钩子函数
// 通过这些钩子函数，可以来向服务器发送请求
// 钩子函数的命名规则 getStudents --> useGetStudentsQuery
export const {
    useGetStudentsQuery,
    useGetStudentByIdQuery
} = studentApi
export default studentApi

// src/store/index.js
import {configureStore} from "@reduxjs/toolkit";
import studentApi from "./studentApi";

const store = configureStore({
    reducer:{
        // studentApi.reducerPath就是配置的Api标识，将其作为reducer的名称
        [studentApi.reducerPath]:studentApi.reducer
    },
    // 配置中间件
    // getDefaultMiddleware是一个函数，调用这个函数会返回一个数组，包含默认的全部中间件，将Api对象的中间件进行注册
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware().concat(studentApi.middleware)
});

export default store;
```

```js
// useQuery()的返回值
/*
    currentData: undefined // 当前参数的最新数据
    data: undefined // 最新的数据
    isError: false // 布尔值，是否有错误
    error: Error() // 对象，有错时才存在
    isFetching: true // 布尔值，数据是否在加载
    isLoading: true // 布尔值，数据是否第一次加载
    isSuccess: false // 布尔值，请求是否成功
    isUninitialized: false // 布尔值，请求是否还没有开始发送
    refetch: f() // 一个函数，用来重新加载数据
    status: "pending" // 字符串，请求的状态
*/

// useQuery可以接收一个对象作为第二个参数，通过该对象可以对请求进行配置
const result = useGetStudentsQuery(null, {
    // 用来指定useQuery返回的结果
    selectFromResult: result => result
    pollingInterval: 0, // 设置轮询的间隔，单位毫秒 如果为0则表示不轮询
    skip: false, // 设置是否跳过当前请求，默认false
    refetchOnMountOrArgChange: false, // 设置是否每次都重新加载数据 false正常使用缓存，true每次都重载数据，数字表示数据缓存的时间（秒）
    refetchOnFocus: false, // 是否在重新获取焦点时重载数据
    refetchOnReconnect: true, // 是否在重新连接后重载数据
})
```

### 四、React-Router

#### 1. router-v5

```powershell
npm i react-router-dom@5 -S # 在浏览器环境中使用的是react-router-dom这个库
```

##### （1）基本使用

在React中依靠路由链接来实现切换组件，需要编写路由链接和配置路由。`Link`组件用来编写路由组件，`to`属性表示要跳转的路由地址；`Route`组件用来映射地址和组件，有两个主要属性`path`和`component`，当路由地址与`Route`组件的`path`属性相匹配时，其`component`属性指定的组件就会自动挂载。使用`component`属性不能方便地向路由组件传递props，所以`Route`组件还提供了`render`和`children`属性用来指定路由匹配的组件。使用`component`属性可以通过路由组件传参的方式进行传参。

```jsx
// src/App.js
import {Link, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
    return (
    	<div>
        	<div className="navHeader">
                {/* 编写路由链接，Link组件最终会被渲染成为a标签 */}
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="content">
                {/* 配置路由，匹配到的路由组件最终会渲染在指定位置, component属性中不能写jsx，只能写组件的名称 */}
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                {/* render属性需要一个回调函数作为参数，回调函数的返回值会最终被挂载 */}
                <Route path="/about" render={(routeProps) => {
                        return <About {...routeProps}/>
                    }}/>
                {/* children属性即组件的标签体，有两种用法: 
                1. 接收一个回调函数，使用方法与render属性相同，但是这种用法会导致无论路径是否匹配组件都会挂载
                2. 接收一个组件作为参数，以下两种写法等效 */}
                <Route path="/about" children={<About/>}/>
                <Route path="/about"><About/></Route>
            </div>
        </div>
    )
}

// src/index.js
import {BrowserRouter, HashRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
// 项目中所有的Link组件和Route组件必须包裹在同一个Router组件中才可以使配置的路由生效
// 可以将Router组件包裹App组件
// Router组件分为BrowserRouter和HashRouter两种，分别对应路由的history模式和hash模式
root.render(
	<BrowserRouter> 
    	<App/>
    </BrowserRouter>
)
```

##### （2）严格匹配和模糊匹配

React Router-v5默认开启的是模糊匹配，只要路由地址的头部与Route组件的path属性相一致，组件就会挂载，而不会去检查子路径。可以给`Route`组件指定`exact`属性来开启严格匹配。开启严格匹配可能会导致路由嵌套时父组件的显示出现问题，一般采用模糊匹配。

```jsx
export default function App() {
    return (
    	<div>
        	<div className="navHeader">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="content">
                {/* exact表示开启严格模式，若为false，则/home/a/b同样可以匹配到/home */}
                <Route exact path="/home" component={Home}/>
                <Route exact path="/about" component={About}/>
            </div>
        </div>
    )
}
```

##### （3）NavLink组件

`NavLink`组件的功能与`Link`组件类似，区别在于`NavLink`组件可以指定链接激活后的样式。使用`activeClassName`属性可以给渲染后生成的a标签在激活时添加指定的类型，如果不指定该属性，则默认添加`active`类名。也可以通过`activeStyle`属性直接给激活时的a标签添加样式。

```jsx
// src/App.js
import {NavLink} from 'react-router-dom'

export default App() {
    return (
    	<ul>
        	<li>
            	<NavLink 
                    activeClassName='active-nav'
                    to='/home'>主页</NavLink>
            </li>
            <li>
            	<NavLink 
                   	activeStyle={{textDecoration: 'underline'}}
                    to='/about'>关于</NavLink>
            </li>
        </ul>
    )
}
```

##### （4）路由组件

在React项目中，路由组件一般放在pages文件夹中，而一般组件则会放在components文件夹下。路由组件并不是通过直接在jsx中通过`<Demo/>`的方式直接使用，而是通过Route组件来自动挂载。路由组件的props会固定接收三个对象，分别为`history`，`location`和`match`。`history`属性主要用来实现编程式路由导航，`location`中储存了当前路由地址的信息，`match`中记录了匹配的信息。

```jsx
// src/pages/Home/index.js
import {history, location, match} from 'react-router-dom'
export default function Home(props) {
    // const {history, location, match} = props
    // 除了使用props来获取三个对象外，还可以使用react-router提供的钩子函数
    const historty = useHistory()
    const location = useLocation()
    const match = useRouteMatch()
    {/*
    	三个对象的主要属性和方法
    	history:
    		go(n): 进行页面的跳转，n用来指定跳转的步数
    		goBack: 页面向前跳转
    		goForward: 页面向后跳转
    		push(path, state): 以push的方式跳转到指定的path，并且携带state参数
    		replace(path, state): 以replace的方式跳转到指定的path，并且携带statec参数
    	location:
    		pathname: 当前的url地址
    		hash: hash字符串
    		search: 接收到的search参数
    		state: 接收到的state参数
    	match:
    		isExact: 检查路径是否严格匹配
    		params: 接收到的params参数
    		path: Route组件指定的匹配路径
    		url: 匹配到path的url地址
    */}
    
    return (
    	<div>Home组件</div>
    )
}
```

##### （5）Switch组件

通常情况下，path和component是一一对应的关系，但是如果两个组件指定了相同的匹配路径，那么两个组件都会挂载。使用`Switch`组件将一系列`Route`组件包裹起来后可以提高路由的匹配效率，同时实现路由的单一匹配，即一个`Switch`中只会有一个路由显示。

```jsx
// src/App.js
import {Switch} from 'react-router-dom'
export default App() {
    return (
    	<div>
        	<div className="navHeader">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="content">
                <Switch>
                	<Route path="/home" component={Home}/>
               		<Route path="/about" component={About}/>
                    {/* 设置Switch后以下组件不会在路径为/about时显示 */}
                    <Route path="/about" component={Test} />
                </Switch> 
            </div>
        </div>
    )
}
```

##### （6）Redirect组件

`Redirect`组件一般写在所有路由注册的最下方，作用是当所有路由都无法匹配时，跳转到`Redirect`指定的路由。此外，`Redirect`组件还可以写在其他组件内部用来实现编程式路由导航，其共有三个属性，分别为`from`，`to`和`push`，`from`是需要重定向的地址，`to`是重定向的目标地址，可以是字符串也可以是对象，与`Link`组件的`to`属性非常类似，`push`是一个布尔值，表示是否使用push方式对请求进行重定向，默认为false，即使用replace方式进行重定向。

```jsx
import {Redirect} from 'react-router-dom'
export default App() {
    return (
    	<div>
        	<div className="navHeader">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="content">
                <Switch>
                	<Route path="/home" component={Home}/>
               		<Route path="/about" component={About}/>
                    <Redirect to="/home"/>
                </Switch> 
            </div>
        </div>
    )
}
```

##### （7）Prompt组件

当某些路由组件中有用户填写的表单项时，当切换组件显示时用户输入的表单数据将会丢失，可以使用`Prompt`组件在用户切换组件前弹出提示。`message`属性用于设置离开前显示的提示信息，`when`属性是一个布尔值，用于设置是否显示提示。

```jsx
// src/pages/Info/index.js
import {Prompt} from 'react-router-dom'
export default function Info() {
    const [isPrompt, setIsPrompt] = useState(false)
    return (
    	<div>
        	<Prompt when={isPrompt} message={'将要离开页面，确认吗？'} />
            <h2>表单项</h2>
            <input type="text" onChange={e => setIsPrompt(e.target.value.trim().length !== 0)}
        </div>
    )
}
```

##### （8）路由嵌套

子路由注册在父组件中，注册子路由时要**加上父路由的path值**。路由的匹配是按照注册路由的顺序进行的。

```jsx
// src/pages/About/index.js
import Info from './Info'
export default function About() {
    return (
    	<div>
        	<div>About组件</div>
            <Route path="/about/info" component={Info}/>
        </div>
    )
}
```

##### （9）路由组件传参

路由组件总共可以传递三种参数。

1. params参数（类似于Ajax中的params参数）：

   路由链接（携带参数）：`<Link to="/demo/Willxhp/18 >详情</Link>"`

   注册路由（声明接收）：`<Route path="/demo/:name/:age component={Demo} />"`

   接收参数：`props.match.params`或使用钩子函数`useParams()`

2. search参数（类似于Ajax中的query参数）：

   路由链接（携带参数）：`<Link to="/demo?name=Willxhp&age=18 >详情</Link>"`

   注册路由（声明接收）：`<Route path="/demo" component={Demo}/>`

   接收参数：`props.location.search`

   注意：获取到的search是urlencoded编码字符串，需要进行解析，使用相对较少。

3. state参数（类似于Ajax中的请求体参数）：

   路由链接（携带参数）：`<Link to={{pathname: '/demo', state: {name: 'Willxhp', age: 18}}}>详情</Link>`

   注册路由（声明接收）：`<Route path="/demo" component={Demo} />`

   接收参数：`props.location.state`

##### （10）编程式路由导航

路由导航分为声明式路由导航和编程式路由导航。编程式路由导航即不借助`Link`组件，而是借助`props.history`对象上的API对操作路由跳转、前进、后退。编程式路由导航同样可以携带参数。

```jsx
export default App() {
    const history = useHistory()
    const goHome = () => {
        // 使用push方式跳转并携带params参数,replace跳转的使用方式相同
		history.push('/home/Willxhp/18')
    }
    const goAbout = () => {
        // 使用push方式跳转并携带search参数
		history.push('/about?name=Willxhp&age=18')
    }
    const goInfo = () => {
        // 使用push方式跳转并携带state参数
        history.push('/info', {name: Willxhp, age: 18})
    }
    return (
    	<div>
        	<div className="navHeader">
                <button onClick={goHome}>Home</button>
                <button onClick={goAbout}>About</button>
                <button onClick={goInfo}>Info</button>
            </div>
            <div className="content">
                <Switch>
                	<Route path="/home/:name/:age" component={Home}/>
               		<Route path="/about" component={About}/>
                    <Route path="/info" component={Info} />
                </Switch> 
            </div>
        </div>
    )
}
```

##### （11）路由模式

react-router中提供了两种路由模式：`BrowserRouter`和`HashRouter`。使用`BrowserRouter`时，路径会直接根据url地址进行跳转，而当使用`HashRoute`时，组件的跳转不再是以完整的url形式，而是通过url地址中的hash值进行跳转。在使用`BrowserRouter`时，如果用户在某个路由下刷新页面或通过浏览器地址栏访问某个路由时，请求会发送给服务器从而返回404，使用`HashRouter`不会出现这种问题，因为url中的hash值不会发送给服务器。要解决`BrowserRouter`刷新页面返回404的问题，需要后端修改服务器的映射规则，将所有的请求交给React处理，禁止服务器自动匹配页面。以nginx为例，可以修改`nginx.conf`中的配置信息。此外，在router-v5中，使用`HashRouter`在页面刷新后会导致路由组件的state参数的丢失，而`BrowserRouter`会将state参数保存在浏览器的history对象中，所以在router-v5版本中的最佳实践为`BrowserRouter`。

```nginx
location / {
    root   html;
    # 任何请求均返回index.html
    try_files $uri /index.html;
}
```

##### （11）withRouter

与路由组件不同的是，一般组件的props不会接收到`match`，`history`和`location`这三个属性，若要在一般组件中访问到三个路由组件独有的props属性，需要使用`withRouter`。`withRouter`是一个函数，可以加工一般组件，让一般组件具备路由组件所特有的API，接收一个组件作为参数并且返回一个组件。

```jsx
import {withRouter} from 'react-router-dom'

// Header是一个一般组件
function Header(props) {
    // 使用withRouter后props可以接收到三个路由组件特有的属性
    const {history, match, location} = props
	return (
    	<div>Header组件</div>
    )
}

export default withRouter(Header)
```

#### 2. router-v6

##### （1）基本使用

router-v6的基本使用方法与v5相近，使用`Link`或`NavLink`组件设置路由链接，使用`Route`组件注册路由。但在v6中，移除了`Switch`组件，引入了新的`Routes`组件，且`Route`组件必须要包裹在`Routes`组件当中，被`Routes`组件包裹的路由也只有一个会进行挂载。`Route`组件的`component`和`children`属性被移除，取而代之的是`elememt`属性，且默认开启的是严格匹配。可以采用`<Route path="home/*" element={<Home/>}/>`的方式来实现模糊匹配。`<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

**注意：**路由组件的props中不再接收到`history`，`location`和`match`三个属性，需要使用对应的钩子函数进行获取。

```jsx
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
    return (
    	<div>
            {/* 设置路由链接时，可以省略/，React会自动补全  */}
        	<Link to="home">主页</Link>
            <Link to="about">关于</Link>
        </div>
        <div>
        	<Routes>
            	<Route path="home" element={<Home/>} />
                <Route path="about" element={<About/>} />
            </Routes>
        </div>
    )
}
```

##### （2）NavLink组件

使用`NavLink`组件实现激活时高亮的效果，默认添加的类名时`active`，自定义方式与v5有区别。

```jsx
// src/App.js
export default function App() {
    return (
    	<div>
            {/* NavLink的style和className属性都接收一个函数作为参数，函数的返回值就是链接的类名或样式  */}
            {/* 两个属性传入的回调函数都会接收到一个对象，对象的isActive属性表示当前链接是否激活 */}
            {/* 默认情况下，当子路由匹配成功后，父路由的导航也会高亮，可以添加end属性来取消父路由导航的高亮效果 */}
        	<NavLink to="home" className={({isActive}) => {
                    return isActive ? 'base one' : 'base'
                }}>主页</NavLink>
            <NavLink to="about" style={(isActive) => {
                    return isActive ? {backgroundColor: 'yellow'} : null
                }} end >关于</NavLink>
        </div>
        <div>
        	<Routes>
            	<Route path="home" element={<Home/>} />
                <Route path="about" element={<About/>} />
            </Routes>
        </div>
    )
}
```

##### （3）Navigate组件

作用类似于v5中的`Redirect`组件，只要被渲染到页面上，就会修改路径，切换视图。可以将其用于页面重定向。`replace`属性用于控制跳转模式（push 或 replace，默认是push），添加`replace`属性则表示跳转模式为replace。

```jsx
// src/App.js
import {Navigate} from 'react-router-dom'

export default function App() {
    return (
    	<div>
        	<Link to="home">主页</Link>
            <Link to="about">关于</Link>
        </div>
        <div>
        	<Routes>
            	<Route path="home" element={<Home/>} />
                <Route path="about" element={<About/>} />
                <Navigate to="home" />
            </Routes>
        </div>
    )
}
```

##### （4）路由嵌套

路由嵌套有两种方法，一种与v5中的方式相同，将子路由注册在父组件中，但是这种方式需要在配置父路由时开启模糊匹配，即使用`<Route path="about/*" element={<About/>}/>`，注册子路由时可以携带也可以不携带父路由的path值，但若不携带父路由的path值，不能添加`/`，否则表示从根目录开始匹配，如`<Route path='detail' element={<Detail/>} />`。第二种方式较为常用，是将父子路由的注册写在一起。

```jsx
// src/App.js
export default function App() {
    return (
    	<div>
        	<Link to="home">主页</Link>
            <Link to="about">关于</Link>
        </div>
        <div>
        	<Routes>
            	<Route path="home" element={<Home/>} />
                <Route path="about" element={<About/>} >
                    {/* 对应的路径为/about/detail */}
                	<Route path="detail" element={<Detail/>} />
                </Route>
            </Routes>
        </div>
    )
}

// src/pages/About
import {Outlet} from 'react-router-dom'
// Outlet组件一般用于嵌套路由中，用于指定路由子组件挂载的位置，非常类似于Vue中的router-view
export default function About() {
    return (
    	<div>
        	<div>About组件</div>
            {/* Detail组件会挂载在此处 */}
            <Outlet />
        </div>
    )
}
```

##### （5）路由表

除了使用`Routes`和`Route`组件来进行路由注册外，还可以使用`useRoutes()`这个钩子函数根据路由表来创建对应的路由规则。

```jsx
// src/App.js
import {useRoutes} from 'react-router-dom'

export default function App() {
    // useRoutes接收路由表作为参数，自动创建对应的路由规则
    const element = useRoutes([
        {
            path: 'home',
            elememt: <Home/>
        },
        {
            path: 'about',
            element: <About/>,
            // 使用children属性来配置嵌套路由
            children: [
                {
                    path: 'detail',
                    element: <Detail/>
                }
            ]
        }
    ])
    return (
    	<div>
        	<Link to="home">主页</Link>
            <Link to="about">关于</Link>
        </div>
        <div>
            {/* 生成的结构与前面完全相同 */}
        	{element}
        </div>
    )
}
```

##### （6）路由组件传参

路由组件传参的方式与v5类似，但部分钩子函数发生变化。

1. params参数（类似于Ajax中的params参数）：

   路由链接（携带参数）：`<Link to="/demo/Willxhp/18 >详情</Link>"`

   注册路由（声明接收）：`<Route path="demo/:name/:age element={Demo} />"`

   接收参数：使用钩子函数`useParams()`。

2. search参数（类似于Ajax中的query参数）：

   路由链接（携带参数）：`<Link to="/demo?name=Willxhp&age=18 >详情</Link>"`

   注册路由（声明接收）：`<Route path="demo" element={Demo}/>`

   接收参数：使用钩子函数`useSearchParams()`，该函数返回一个包含两个值的数组，第一个值是当前的search参数，第二个是更新search的函数。`const [search, setSearch] = useSearchParams()`，调用`search`对象的`get`方法可以获取对应的参数值，如`search.get('id')`。调用`setSearch()`方法会修改url地址中的查询字符串，使组件重新挂载，如`setSearch('id=01&title=content')`。

   注意：获取到的search是urlencoded编码字符串，需要进行解析，使用相对较少。

3. state参数（类似于Ajax中的请求体参数）：

   路由链接（携带参数）：`<Link to="demo" state={{name: 'Willxhp', age: 18}}>详情</Link>`

   注册路由（声明接收）：`<Route path="demo" element={Demo} />`

   接收参数：使用钩子函数`useLocation()`来获取`location`对象，通过`location.state`获取state参数。

##### （7）编程式路由导航

router-v6中取消了`useHistory()`这一钩子函数，不能获取到`history`对象，取而代之的是`useNavigate()`钩子函数，调用这个钩子函数会返回一个函数，这个函数用来实现编程式路由导航。

```jsx
import {useNavigate} from 'react-router-dom'

export default function Demo() {
  const navigate = useNavigate()
  const handle = () => {
    //第一种使用方式：指定具体的路径，默认为push方式
    navigate('home', {
      replace: false,
      state: {a:1, b:2}
    }) 
    //第二种使用方式：传入数值进行前进或后退，类似于v5中的 history.go()方法
    navigate(-1)
  }
  
  return (
    <div>
      <button onClick={handle}>按钮</button>
    </div>
  )
}
```

##### （8）其他Hooks

**useMatch()**

router-v6中使用`useMatch()`替代了v5中的`useRouteMatch()`，作用是返回`match`对象。

**useInRouterContext()**

如果当前组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。

**useNavigationType()**

返回当前页面的导航类型，即用户是如何来到当前页面的，返回值有POP、PUSH和REPLACE三种，POP是指在浏览器中直接打开了这个路由组件（刷新页面）。

**useOutlet()**

用来呈现当前组件中渲染的嵌套路由。如果嵌套路由没有挂载，则返回null；若嵌套路由已经挂载，则返回嵌套的路由对象。

**useResolvedPath()**

给定一个 URL值，解析其中的：path、search和hash值。
