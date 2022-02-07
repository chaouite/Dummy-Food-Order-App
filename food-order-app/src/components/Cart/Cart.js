import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [orderIsClicked, setOrderIsClicked] = useState(false);
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit,] = useState(false);

  const cartItemAddHandler = (item) => {
    cartContext.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://food-app-59c50-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  }

  const cardItems = <ul className={classes['cart-items']}>
    {cartContext.items.map((item) =>
      <CartItem
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        key={item.id}
      />)}
  </ul>;

  const onOrderHandler = () => {
    setOrderIsClicked(true);
  }
  const cartModalContent = <React.Fragment>
    {cardItems}
    <div className={classes.total}>
      <span>Total Price</span>
      <span>{totalAmount}</span>
    </div>
    {orderIsClicked ?
      <Checkout onCancel={props.onCloseCart} submitOrderHandler={submitOrderHandler} /> :
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={props.onCloseCart}
        >Close</button>
        {hasItems && <button onClick={onOrderHandler} className={classes.button}>Order</button>}
      </div>
    }
  </React.Fragment>
  const isSubmittingModalContent = <p>Sending order data....</p>
  const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent the order....</p>
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={props.onCloseCart}
      >Close</button>
    </div>
  </React.Fragment>
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
};

export default Cart;
