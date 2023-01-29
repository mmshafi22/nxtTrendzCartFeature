import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increaseQuantityList = cartList.map(each => {
      if (each.id === id) {
        return {
          id: each.id,
          title: each.title,
          imageUrl: each.imageUrl,
          brand: each.brand,
          price: each.price,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    this.setState({cartList: increaseQuantityList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(eachItem => eachItem.id === id)
    if (item.quantity === 1) {
      this.removeCartItem(id)
    } else {
      const decreaseQuantityList = cartList.map(each => {
        if (each.id === id) {
          return {
            id: each.id,
            title: each.title,
            imageUrl: each.imageUrl,
            brand: each.brand,
            price: each.price,
            quantity: each.quantity - 1,
          }
        }
        return each
      })
      this.setState({cartList: decreaseQuantityList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isPresent = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (isPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const filteredCartItems = cartList.filter(
        eachItem => eachItem.id !== isPresent.id,
      )
      const newCartItem = {
        id: isPresent.id,
        imageUrl: isPresent.imageUrl,
        price: isPresent.price,
        brand: isPresent.brand,
        quantity: isPresent.quantity + 1,
      }
      this.setState({cartList: [...filteredCartItems, newCartItem]})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
