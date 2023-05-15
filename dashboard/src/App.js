import './App.css';
import { ConfigProvider } from 'antd';
import Loading from './pages/Loading';
import { WalletProvider, useWallet } from './contexts/Wallet';
import InstallWallet from './pages/InstallWallet';
import ConnectWallet from './pages/ConnectWallet';
import Dashboard from './pages/Dashboard';

const theme = {
  token: {
    colorPrimary: '#7b2bf9',
  },
};

function AppContent() {
  const { ready, installed, connected } = useWallet();

  if (!ready) {
    return <Loading></Loading>
  }

  if (ready && !installed) {
    return <InstallWallet></InstallWallet>
  }

  if (ready && installed && !connected) {
    return <ConnectWallet/>
  }

  return <Dashboard/>
}

function App() {
  return (
    <ConfigProvider theme={theme}>
      <WalletProvider>
        <div className="App">
          <AppContent></AppContent>
        </div>
      </WalletProvider>
    </ConfigProvider>
  );
}

export default App;
