import { FC, useEffect, useRef } from 'react';
import { Sty } from './style';
const { ipcRenderer } = window.require('electron');

const event = {
  init: 'on-entry',
  storage: 'on-storage',
  submit: 'on-submit'
};

export const Home: FC = () => {
  const appidRef = useRef<HTMLInputElement>(null);
  const secretRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ipcRenderer.once(event.storage, (_: unknown, data?: { appid: string; secret: string }) => {
      if (!data) return;
      const { appid, secret } = data;
      appidRef.current && (appidRef.current.value = appid);
      secretRef.current && (secretRef.current.value = secret);
    });
    ipcRenderer.send(event.init);

    return () => {
      ipcRenderer.removeAllListeners(event.submit);
      ipcRenderer.removeAllListeners(event.init);
      ipcRenderer.removeAllListeners(event.storage);
    };
  }, []);

  const handleSubmit = () => {
    if (!appidRef.current?.value || !secretRef.current?.value) {
      alert('请输入');
      return;
    }
    ipcRenderer.send(event.submit, {
      appid: appidRef.current?.value,
      secret: secretRef.current?.value
    });
  };

  return (
    <Sty.Home>
      <div className="row">
        <div className="title">appid</div>
        <input type="text" ref={appidRef} />
      </div>
      <div className="row">
        <div className="title">密钥</div>
        <input type="password" ref={secretRef} />
      </div>
      <div className="btn" onClick={handleSubmit}>
        确定
      </div>
    </Sty.Home>
  );
};
