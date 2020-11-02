import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const SideBarContent = styled.div`
  width: 200px;
  height: 100%;
  background: #192a3e;
  flex-direction: column;

  section {
    a,
    button {
      display: inline-block;
      color: #fff;
      width: 100%;
      text-align: left;
      margin-left: 10px;
      margin-bottom: 10px;
      padding: 10px;
      span {
        color: #fff;
        margin-right: 10px;
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
