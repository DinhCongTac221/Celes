import { Layout, Typography, theme, Button } from 'antd';
import { useWallet } from '../../contexts/Wallet';
import { truncate } from '../../utils/address';

const { Header } = Layout;

export default function PageHeader({ currentPage }) {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  const { wallet } = useWallet();

  return (
    <Header style={{
      background: colorBgContainer,
      height: '120px',
      borderBottom: `solid 1px ${colorBorder}`,
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Typography.Title style={{ textTransform: 'capitalize' }} level={2}>{currentPage}</Typography.Title>
      <Button shape='round' style={{ marginTop: '28px' }}>{truncate(wallet.accounts[0].address)}</Button>
    </Header>
  );
}