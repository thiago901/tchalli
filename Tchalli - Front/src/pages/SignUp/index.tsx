import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, Background, AnimatedContent } from './styles';

import getValidationErrors from '../../util/getValidationError';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import logo from '../../assets/icon-topgain-escuro.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface FormDataSignup {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormDataSignup) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio'),
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('Email obrigatorio'),
          password: Yup.string().min(6, 'Minimo de 6 caracteres'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Cadastro Realizado',
          description: 'Você já pode fazer logon no GoBarber!',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErrors(error);
          formRef.current?.setErrors(err);
          return;
        }
        // dispara toast
        addToast({
          title: 'Erro no Cadastro',
          type: 'error',
          description: 'Erro ao realizar o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContent>
          <img src={logo} alt="logo" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu Cadastro</h1>
            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
              autoComplete="off"
            />

            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
              autoComplete="off"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
