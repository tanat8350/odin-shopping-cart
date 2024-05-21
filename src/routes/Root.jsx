import { Link, Outlet } from 'react-router-dom';
import styles from './Root.module.css';
import { useState } from 'react';

const Root = () => {
  const [itemCart, setItemCart] = useState([]);
  return (
    <>
      <div>
        <nav className={styles.navBar}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({itemCart.length})</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.content}>
        <Outlet context={[itemCart, setItemCart]} />
      </div>
    </>
  );
};

export default Root;
