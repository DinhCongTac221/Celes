import { useState } from 'react';
import { Result, Button, Card } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

export default function InstallWallet() {
  const [installed, setInstalled] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{ width: '540px', marginTop: '-48px' }}>
        <Result
          title="Before diving into the app's features, make sure to install Kelpr wallet - it's a quick and easy process!"
          icon={<WalletOutlined style={{ color: '#7b2bf9' }}/>}
          extra={
            installed ? 
            <Button size='large' type="primary" key="console" onClick={handleReload}>
              Reload
            </Button> : 
            <a onClick={() => { setInstalled(true); }} href='https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap' target='_blank' rel="noreferrer">
              <Button size='large' type="primary" key="console">
                Install Kelpr wallet
              </Button>
            </a>
          }
        />
      </Card>
    </div>

  )
}