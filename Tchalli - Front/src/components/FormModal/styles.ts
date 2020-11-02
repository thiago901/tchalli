import styled from 'styled-components';
import { shade } from 'polished';
import { Form as UnForm } from '@unform/web';

export const Container = styled(UnForm)`
  display: flex;
  flex-direction: column;
    textarea{
      margin:10px 0;
      resize:none;
      padding:5px;
      width:100%;
    }

    width: 350px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
      font-size: 22px;
      color: #192a3e;
    }

    a {
      color: #666;
      text-decoration: none;
      display: block;
      margin-top: 24px;

      transition: color 0.5s;
      &:hover {
        color: ${shade(0.2, '#666')};
      }
    }
  }
  > a {
    display: block;
    color: #192a3e;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: ${shade(0.2, '#192a3e')};
    }
    svg {
      margin-right: 15px;
    }



`;
