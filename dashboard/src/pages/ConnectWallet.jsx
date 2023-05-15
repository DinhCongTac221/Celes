import React, { useState, useMemo } from 'react';
import { Result, Button, Card, notification } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { useWallet } from '../contexts/Wallet';
import { BLOCKSPACERACE_PARAMS } from '../config/networks';

const Context = React.createContext({ name: 'Default' });

export default function InstallWallet() {
  const { connectWallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleConnectWallet = async () => {
    setLoading(true);

    try {
      await connectWallet(BLOCKSPACERACE_PARAMS);
    } catch (err) {
      api.error({
        message: `Failed to connect wallet`,
        description: <Context.Consumer>{({ name }) => err.message}</Context.Consumer>,
        placement: 'topRight',
      });
    }

    setLoading(false);
  };

  const contextValue = useMemo(() => ({}), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder} 
      <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card style={{ width: '540px', marginTop: '-48px' }}>
          <Result
            title="Install Kelpr wallet to start using the app - we'll guide you through it!"
            icon={<WalletOutlined style={{ color: '#7b2bf9' }}/>}
            extra={
              <Button loading={loading} onClick={handleConnectWallet} size='large' type="primary" key="console">
                Connect Wallet
              </Button>
            }
          />
        </Card>
      </div>
    </Context.Provider>
  )
}