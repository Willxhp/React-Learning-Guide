import React, {useState} from 'react'
import Filter from './components/Filter/Filter'
import Meals from './components/Meals/Meals'
import CartContext from './store/cart-context'
import Cart from './components/Cart/Cart'

function App() {

  // 模拟一组食物数据
const MEALS_DATA = [
  {
      id: '1',
      title: '汉堡包',
      desc: '百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！',
      price: 12,
      img: '/img/meals/1.png'
  },
  {
      id: '2',
      title: '双层吉士汉堡',
      desc: '百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！',
      price: 20,
      img: '/img/meals/2.png'
  },
  {
      id: '3',
      title: '巨无霸',
      desc: '两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！',
      price: 24,
      img: '/img/meals/3.png'
  }, {
      id: '4',
      title: '麦辣鸡腿汉堡',
      desc: '金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！',
      price: 21,
      img: '/img/meals/4.png'
  }, {
      id: '5',
      title: '板烧鸡腿堡',
      desc: '原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！',
      price: 22,
      img: '/img/meals/5.png'
  }, {
      id: '6',
      title: '麦香鸡',
      desc: '清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！',
      price: 14,
      img: '/img/meals/6.png'
  }, {
      id: '7',
      title: '吉士汉堡包',
      desc: '百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！',
      price: 12,
      img: '/img/meals/7.png'
  }
]
  // 商品列表渲染数据
  const [mealsData, setMealsData] = useState(MEALS_DATA)

  // 购物车数据，购物车中每个商品对象与MEALS_DATA中的对象内存地址相同
  const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  })

  // 改变购物车中的数据
  const changeItem = (id, isAdd) => {
    const newCartData = {...cartData}
    let item
    if (isAdd) {
      if(newCartData.items.some(item => item.id === id)) {
        item = newCartData.items.find(item => item.id === id )
        item.amount++
      } else {
        item = {...MEALS_DATA.find(item => item.id === id ), amount: 1}
        newCartData.items.push(item)
      }
      newCartData.totalAmount++
      newCartData.totalPrice += item.price
    } else {
      item = newCartData.items.find(item => item.id === id )
      item.amount--
      newCartData.totalAmount--
      newCartData.totalPrice -= item.price
    }
    setCartData(newCartData)
  }

  const filterData = (keyword) => {
    const filterMealsData = MEALS_DATA.filter(item => item.title.includes(keyword))
    // console.log(filterMealsData)
    setMealsData(filterMealsData)
  }

  return (
    <div>
      <CartContext.Provider value={{...cartData, changeItem}}>
        <Filter onFilter={filterData}/>
        <Meals mealsData={mealsData}/>
        <Cart/>
      </CartContext.Provider>
    </div>
  );
}

export default App;
