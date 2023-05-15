import { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/Wallet';
import Celestia from '../../services/celestia';
import { Card, Space, QRCode, Typography, Avatar, Divider, theme } from 'antd';

const { Title, Paragraph } = Typography;

export default function Overview() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState({ amount: 0 });

  const {
    token: { colorBorder },
  } = theme.useToken();

  const getBalance = async () => {
    setLoading(true);

    const data = await Celestia.getBalance(wallet);
    console.log(data);
    setBalance(data);

    setLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <Card loading={loading} title="Wallet">
        <Space size='large' align='start'>
          <div>
            <QRCode value={wallet.accounts[0].address}></QRCode>
            <Title level={5}>Address</Title>
            <Paragraph copyable code>{wallet.accounts[0].address}</Paragraph>
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Title style={{ marginTop: 0 }} level={3}>Assets</Title>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '280px',
              alignItems: 'center',
            }}>
              <Paragraph strong>Name</Paragraph>
              <Paragraph strong>Amount</Paragraph>
            </div>
            <Divider style={{ margin: 0 }}/>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '280px',
              alignItems: 'center',
              marginTop: 8,
              padding: '8px 0px'
            }}>
              <Space>
                <Avatar size='small' src='https://s2.coinmarketcap.com/static/img/coins/128x128/22861.png'></Avatar>
                <Typography>TIA</Typography>
              </Space>
              <Typography>{balance.amount}</Typography>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  )
}