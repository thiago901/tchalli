import React, { useCallback } from 'react';
import { FaBook } from 'react-icons/fa';

import { useModal } from '../../../hooks/modal';
import { useToast } from '../../../hooks/toast';

import Form from '../../FormModal';
import TextArea from '../../TextArea';

import Input from '../../Input';

import api from '../../../services/api';
import { Buttons, ButtonSubmit } from './styles';

interface IStock {
  id: string;
  amount: number;
  price: number;
  availability: boolean;
}
interface IProducts {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
  stock?: IStock;
}

interface IFormStock {
  dataCurrent?: IProducts;
  datas: IProducts[];
  setDatas: React.Dispatch<React.SetStateAction<IProducts[]>>;
  title_button: 'Criar' | 'Atualizar';
}
const FormSummary: React.FC<IFormStock> = ({
  dataCurrent,
  datas,
  setDatas,
  title_button,
}) => {
  const { closeModal } = useModal();
  const { addToast } = useToast();

  const handleAdd = useCallback(
    async data => {
      try {
        const response = await api.post('/dailysummary', {
          title: data.title,
          text: data.text,
        });

        setDatas([...datas, response.data]);
        closeModal();
        addToast({
          type: 'success',
          title: 'Resumo diario criado',
          description: ' ',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possivel criar um Resumo diario',
          description: ' ',
        });
      }
    },
    [setDatas, datas, closeModal, addToast],
  );
  const handleUpdate = useCallback(
    async data => {
      try {
        const response = await api.put(`/dailysummary/${data.id}`, {
          title: data.title,
          text: data.text,
        });

        const filteredSummary = datas.filter(c => c.id !== data.id);
        setDatas([...filteredSummary, response.data]);
        closeModal();
        addToast({
          type: 'success',
          title: 'Resumo diario Atualizado',
          description: ' ',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possivel atualizar o Resumo diario',
          description: ' ',
        });
      }
    },
    [datas, setDatas, closeModal, addToast],
  );

  // const handleDeleteCourse = useCallback(
  //   async course => {
  //     await api.delete(`course/${course}`);
  //     closeModal();
  //   },[]
  // );

  return (
    <Form
      onSubmit={dataCurrent ? handleUpdate : handleAdd}
      initialData={dataCurrent}
    >
      <h1>Resumo Diario</h1>
      <Input name="id" type="text" hidden defaultValue={dataCurrent?.id} />
      <Input
        name="title"
        type="text"
        placeholder="Titulo"
        icon={FaBook}
        defaultValue={dataCurrent?.color}
      />
      <TextArea
        name="text"
        type="text"
        placeholder="Texto"
        icon={FaBook}
        defaultValue={dataCurrent?.color}
      />

      <Buttons>
        <ButtonSubmit type="submit">{title_button}</ButtonSubmit>
      </Buttons>
    </Form>
  );
};

export default FormSummary;
