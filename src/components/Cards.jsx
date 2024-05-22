import { useState } from 'react';
import styles from './Cards.module.css';
import { useOutletContext } from 'react-router-dom';

const Card = ({ prop }) => {
  const [itemCart, setItemCart] = useOutletContext();
  const [qty, setQty] = useState(0);

  const title =
    prop.title.length > 20
      ? prop.title.slice(0, 17).trim() + '...'
      : prop.title;
  const clickIncrement = () => {
    setQty(+qty + 1);
  };
  const clickDecrement = () => {
    qty && setQty(+qty - 1);
  };
  const clickAddToCart = () => {
    if (!qty) return;
    let found = false;
    itemCart.reduce((data = [], item) => {
      if (item.id === prop.id) {
        item.qty += +qty;
        found = true;
      }
      data.push(item);
    }, []);
    if (!found) {
      setItemCart([
        {
          id: prop.id,
          title: prop.title,
          image: prop.image,
          price: prop.price,
          qty: +qty,
        },
        ...itemCart,
      ]);
    }

    setQty(0);
  };
  const onInput = (e) => {
    setQty(+e.target.value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={prop.image} alt="" />
      </div>
      <h2>{title}</h2>
      <p>Price {prop.price}</p>
      <p>
        Quantity{' '}
        <button className={styles.buttonQty} onClick={clickDecrement}>
          -
        </button>
        <input
          className={styles.inputQty}
          type="tel"
          value={qty}
          onInput={onInput}
          maxLength="2"
        />
        <button className={styles.buttonQty} onClick={clickIncrement}>
          +
        </button>
      </p>
      <button className={styles.buttonAdd} onClick={clickAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

const Cards = ({ data }) => {
  return (
    <div className={styles.cards}>
      {data.map((data) => (
        <Card key={data.id} prop={data}></Card>
      ))}
    </div>
  );
};

export default Cards;
