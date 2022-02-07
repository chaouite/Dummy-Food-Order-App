import { useState } from 'react';
import Meals from './components/Meals/Meals';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import ContextProvider from './store/ContextProvider';


function App() {

  const [isCloseCart, setIsCloseCart] = useState(true);

  const onCloseCart = () => {//hide the cart
    setIsCloseCart(true);
  }
  const onOpenCart = () => {//show the card
    setIsCloseCart(false);
  }

  return (
    <ContextProvider>
      {!isCloseCart && <Cart onCloseCart={onCloseCart} />}
      <Header onOpenCart={onOpenCart} />
      <main>
        <Meals />
      </main>
    </ContextProvider>
  );
}

export default App;