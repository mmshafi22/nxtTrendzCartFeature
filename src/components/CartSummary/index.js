import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
      return (
        <div className="total-price-container">
          <div className="total-price">
            <h1 className="total-amount">
              Order Total: <span className="amount">Rs {totalPrice}</span>
            </h1>
            <p className="cart-count">{cartList.length} Items in cart</p>
          </div>
          <button type="button" className="btn-checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
