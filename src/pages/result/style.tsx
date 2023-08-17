import { styled } from 'styled-components';

export const Sty = {
  Result: styled.div`
    height: 100vh;
    overflow: auto;
    > .title {
      display: flex;
      align-items: center;
      > .type {
        flex: 1;
        text-align: center;
        font-size: 30px;
        padding: 10px 20px;
        font-weight: bold;
        &.from {
          background-color: lightblue;
        }
        &.to {
          background-color: lightcoral;
        }
      }
    }
    > .translate {
      margin: 20px 0 0 0;
      display: flex;

      > .item {
        flex: 1;
        background-color: #5a4dd3;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        padding: 20px 40px;

        &:nth-child(2) {
          background-color: #c42185;
        }
      }
    }
  `
};
