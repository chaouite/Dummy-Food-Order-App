import React from 'react';
import classes from './MealsSummery.module.css';

const MealsSummery = () => {
  return (
    <section className={classes.summary}>
      <h2>Welcome to MarrFood.</h2>
      <p> One of the best ordering apps that offers you a variety of delicious Moroccan food choices.
        You can pay with Master Card, PayPal or cash.
      </p>
      <p>
        If you place an order, our delivery man will knock at your door after 30 minutes maximum.
        Don't hesitate to call us if you have any questions.
      </p>
    </section>
  )
}

export default MealsSummery
