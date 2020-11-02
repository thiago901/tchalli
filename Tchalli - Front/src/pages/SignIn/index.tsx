import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../util/getValidationError';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimatedContent } from './styles';

import logo from '../../assets/icon-topgain-escuro.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signin } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('Email obrigatorio'),
          password: Yup.string().required('Senha obrigatoria'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signin({ email: data.email, password: data.password });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErrors(error);
          formRef.current?.setErrors(err);
          return;
        }
        // dispara toast
        addToast({
          title: 'Erro no Login',
          type: 'error',
          description: 'Erro ao realizar o login',
        });
      }
    },
    [addToast, history, signin],
  );
  return (
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logo} alt="logo" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu Logon</h1>

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

            <Button type="submit">Entrar</Button>

            <a href="#/">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
