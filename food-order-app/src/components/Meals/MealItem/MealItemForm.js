import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form onSubmit={submitHandler} className={classes.form} >
      <Input
        label='amount'
        ref={amountInputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          step: '1',
          min: '1',
          max: '5',
          defaultValue: '1',
        }} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  )
};

export default MealItemForm;
