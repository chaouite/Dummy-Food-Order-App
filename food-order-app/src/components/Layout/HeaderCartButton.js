import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

  const { items } = cartCtx;
  useEffect(() => {
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
    return () => { clearTimeout(timer) }
  }, [items]);

  const badgeAmount = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button className={btnClasses} onClick={props.onOpenCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{badgeAmount}</span>
    </button>
  )
};

export default HeaderCartButton;

