import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../util/format';

import Header from '../../components/Header';

import Table from '../../components/Table';

import api from '../../services/api';

import { Total } from './styles';

interface ISales {
  id: string;
  amount: number;
  price: number;
  type: string;
  created_at: Date;
  date: string;
  formattedPrice: string;
}

const Sales: React.FC = () => {
  const [sales, setSales] = useState<ISales[]>([]);
  const [total, setTotal] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateStr, setDateStr] = useState('');
  useEffect(() => {
    async function load() {
      const response = await api.get<ISales[]>(`/sales?date=${date}`);
      const { data } = response;
      setSales(
        data.map(d => ({
          ...d,
          date: format(new Date(d.created_at), 'dd/MM/yyyy'),
          formattedPrice: formatPrice(d.price),
        })),
      );
      setDateStr(format(date, 'dd/MM/yyyy'));
      setTotal(formatPrice(data.reduce((a, s) => a + s.price, 0)));
    }
    load();
  }, [date]);
  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          onClick={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
            )}
        >
          <FaChevronCircleLeft />
        </button>

        <button
          type="button"
          onClick={() =>
            setDate(
              new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            )
          }
        >
          <FaChevronCircleRight />
        </button>
        <span style={{ color: '#fff', marginLeft: 10 }}>{dateStr}</span>
      </div>
      <Table header={['Data', 'Quantidade', 'Valor Total', 'Tipo', '']}>
        {sales.map(s => (
          <tr key={s.id}>
            <td>{s.date}</td>
            <td>{s.amount}</td>
            <td>{s.formattedPrice}</td>
            <td>{s.type}</td>
            <td>
              <Link to={`sales/${s.id}`}>Abrir</Link>
            </td>
          </tr>
        ))}
      </Table>
      <Total>
        <strong>{total}</strong>
      </Total>
    </>
  );
};

export default Sales;
