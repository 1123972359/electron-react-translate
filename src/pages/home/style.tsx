import { styled } from 'styled-components';

export const Sty = {
  Home: styled.div`
    padding-top: 200px;
    box-sizing: border-box;
    > .row {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      > .title {
        width: 60px;
        text-align: center;
      }
    }
    > .btn {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      background-color: #008cff;
      color: #fff;
      border-radius: 4px;
      letter-spacing: 2px;
      cursor: pointer;
      margin: 0 auto;
    }
  `
};
