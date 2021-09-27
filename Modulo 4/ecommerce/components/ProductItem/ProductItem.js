import Link from 'next/link';
import styles from '../../styles/ProductItem.module.css';

const ProductItem = props => {
  const { id } = props;
  const link = '/details/' + id;
  return (
    <div className={styles.productContainer}>
      <div className={styles.productDescription}>Product Summary</div>
      <div>
        <Link href={link}>
          <a>Detalhes</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
