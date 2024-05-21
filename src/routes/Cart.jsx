import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <tr className={styles.list}>
      <td className={styles.listProduct}>
        <img src={data.image} alt="" />
        <p>{data.title}</p>
      </td>
      <td className={styles.center}>{data.price}</td>
      <td className={styles.center}>{data.qty}</td>
      <td className={styles.center}>{data.price * data.qty}</td>
    </tr>
  );
};

const Cart = () => {
  const [itemCart, setItemCart] = useOutletContext();

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
        {itemCart.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </table>
      <p>
        Total{' '}
        {itemCart.reduce((total, item) => total + item.price * item.qty, 0)}
      </p>
      <button className={styles.buttonCheckout}>Checkout</button>
    </>
  );
};

export default Cart;
