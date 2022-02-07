import React, { Fragment } from 'react';
import headerImg from '../../assets/HeaderBackground.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header} >
        <h1>MarrFood</h1>
        <HeaderCartButton onOpenCart={props.onOpenCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={headerImg} alt='Various delicious moroccan food' />
      </div>
    </Fragment>
  )
};

export default Header;
