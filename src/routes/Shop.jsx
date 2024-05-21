import { useEffect, useState } from 'react';
import Cards from '../components/Cards';

function Shop() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=20', { mode: 'cors' })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Cards data={data}></Cards>
    </>
  );
}

export default Shop;
