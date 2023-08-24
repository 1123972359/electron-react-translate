import { FC, useEffect, useState } from 'react';
import { Sty } from './style';
const { ipcRenderer } = window.require('electron');

type TData = {
  from: string;
  to: string;
  trans_result: { src: string; dst: string }[];
};

const event = {
  init: 'on-translate-init',
  translate: 'on-translate',
  hide: 'on-hide'
};

/**
 * 翻译结果
 */
export const Result: FC = () => {
  const [data, setData] = useState<TData>();

  useEffect(() => {
    ipcRenderer.once(event.translate, (_: unknown, data: TData) => {
      console.log('Received event:', data);
      setData(data);
    });
    ipcRenderer.send(event.init);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ipcRenderer.send(event.hide);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners(event.translate);
    };
  }, []);

  return (
    <Sty.Result>
      <div className="title">
        <span className="type from">{data?.from}</span>
        <span className="type to">{data?.to}</span>
      </div>

      {data?.trans_result.map((item, i) => (
        <div className="translate" key={i}>
          <div className="item">{item.src}</div>
          <div className="item">{item.dst}</div>
        </div>
      ))}
    </Sty.Result>
  );
};
