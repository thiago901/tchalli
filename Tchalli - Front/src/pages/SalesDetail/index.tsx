import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { Total } from './styles';

interface IProduct {
  id: string;
  name: string;
}
interface ISalesDetail {
  id: string;
  amount: number;
  price: number;
  formattedPrice: string;
  formattedPriceTotal: string;
  product: IProduct;
}
interface IParams {
  id: string;
}
const SalesDetail: React.FC = () => {
  const [sales, setSales] = useState<ISalesDetail[]>([]);
  const [total, setTotal] = useState('');
  const { id } = useParams<IParams>();

  useEffect(() => {
    async function load() {
      const response = await api.get<ISalesDetail[]>(`/salesdetail/${id}`);
      const { data } = response;
      setSales(
        data.map(d => ({
          ...d,
          formattedPrice: formatPrice(d.price),
          formattedPriceTotal: formatPrice(d.price * d.amount),
        })),
      );
      setTotal(
        formatPrice(data.reduce((acum, s) => acum + s.price * s.amount, 0)),
      );
    }
    load();
  }, [id]);
  return (
    <>
      <Header />

      <Table header={['Nome', 'Quantidade', 'Valor Unitario', 'Valor Total']}>
        {sales.map(s => (
          <tr key={s.id}>
            <td>{s.product.name}</td>
            <td>{s.amount}</td>
            <td>{s.formattedPrice}</td>
            <td>{s.formattedPriceTotal}</td>
          </tr>
        ))}
      </Table>
      <Total>
        <strong>{total}</strong>
      </Total>
    </>
  );
};

export default SalesDetail;
