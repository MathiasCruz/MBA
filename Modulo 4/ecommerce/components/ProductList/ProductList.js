import styled from 'styled-components';
import { fetchData } from '../../API';
import { useQuery } from 'react-query';
import ProductItem from '../../components/ProductItem/ProductItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
`;
const Item = styled.span`
  background-color: blanchedalmond;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ProductList = () => {
  const { isLoading, data } = useQuery('productList', () => fetchData);
  if (isLoading || !data) {
    return <div>Carregando</div>;
  }
  console.log(data);
  return (
    <Container>
      <>
        {data.map(item => (
          <Item key={item.ProductID}>
            <ProductItem
              id={item.ProductID}
              name={item.Name}
              price={item.Price}
              thumbnail={item.ThumbnailURL}
              lastPrice={item['Retail Price']}
            ></ProductItem>
          </Item>
        ))}
      </>
    </Container>
  );
};

export default ProductList;
