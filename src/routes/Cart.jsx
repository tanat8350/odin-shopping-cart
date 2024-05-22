import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import cardsStyles from '../components/Cards.module.css';

const Card = ({ data, index }) => {
  const [itemCart, setItemCart] = useOutletContext();
  const updateQty = (qty, overwrite) => {
    const copy = itemCart.slice();
    if (overwrite) {
      copy[index].qty = qty;
    } else {
      copy[index].qty = +copy[index].qty + qty;
    }
    setItemCart(copy);
  };
  const clickDecrement = (e) => {
    e.target.value >= 0 && updateQty(-1);
    checkDelete(e);
  };
  const clickIncrement = () => updateQty(1);
  const onInput = (e) => {
    updateQty(e.target.value, true);
  };
  const checkDelete = (e) => {
    if (!+e.target.value) {
      let deleteConfirmation = confirm('Do you want to remove item');
      if (deleteConfirmation) {
        const copy = itemCart.slice();
        copy.splice(index, 1);
        setItemCart(copy);
        return;
      }
      updateQty(1, true);
    }
  };
  return (
    <tr className={styles.list}>
      <td className={styles.listProduct}>
        <img src={data.image} alt="" />
        <p>{data.title}</p>
      </td>
      <td className={styles.center}>{data.price}</td>
      <td>
        <div className={cardsStyles.column}>
          <button
            className={cardsStyles.buttonQty + ' ' + cardsStyles.block}
            onClick={clickIncrement}
          >
            +
          </button>
          <input
            className={cardsStyles.inputQty + ' ' + cardsStyles.block}
            type="tel"
            value={data.qty}
            onInput={onInput}
            onBlur={checkDelete}
            maxLength="2"
          />
          <button
            className={cardsStyles.buttonQty + ' ' + cardsStyles.block}
            onClick={clickDecrement}
          >
            -
          </button>
        </div>
      </td>
      <td className={styles.center}>{(data.price * 100 * data.qty) / 100}</td>
    </tr>
  );
};

const Cart = () => {
  const [itemCart, setItemCart] = useOutletContext();

  const clickCheckout = () => {
    alert('Checkout is not implemented');
  };

  if (itemCart.length === 0)
    return (
      <>
        <h1>There is nothing in cart</h1>
        <Link to="/shop">Click here to go back to shop</Link>
      </>
    );
  return (
    <>
      <h1>Cart</h1>
      <table>
        <tr>
          <th>Product</th>
          <th>Price per unit</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        {itemCart.map((item, index) => (
          <Card key={item.id} data={item} index={index} />
        ))}
      </table>
      <p className={styles.total}>
        Total{' '}
        {itemCart.reduce(
          (total, item) => total + item.price * 100 * item.qty,
          0
        ) / 100}
      </p>
      <button className={styles.buttonCheckout} onClick={clickCheckout}>
        Checkout
      </button>
    </>
  );
};

export default Cart;
