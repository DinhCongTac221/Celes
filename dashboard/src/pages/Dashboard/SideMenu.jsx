import { Image, Menu, Layout, Select, theme } from 'antd';
import { CodeOutlined, HomeOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { BLOCKSPACERACE_PARAMS, ARABICA_PARAMS, MOCHA_PARAMS} from '../../config/networks';
import { useWallet } from '../../contexts/Wallet';

const { Sider } = Layout;
const { Option } = Select;

const items = [
  {
    label: 'Overview',
    key: 'overview',
    icon: <HomeOutlined/>,
  },
  {
    label: 'Staking',
    key: 'staking',
    icon: <ThunderboltOutlined/>,
  },
  {
    label: 'Submit PFB',
    key: 'pay for blob',
    icon: <CodeOutlined/>,
  },
];

export default function SideMenu({
  currentPage,
  onPageChange
}) {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  const onSelect = (value) => {
    onPageChange(value.key);
  };

  const { network, changeNetwork } = useWallet();

  const handleChangeNetwork = (id) => {
    const network = [BLOCKSPACERACE_PARAMS, ARABICA_PARAMS, MOCHA_PARAMS].find(i => i.chainId === id);
    changeNetwork(network);
  };

  return (
    <Sider style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      background: colorBgContainer,
      borderRight: `solid 1px ${colorBorder}`,
    }}>
      <div style={{ padding: '48px 32px'}}>
        <Image preview={false} style={{ maxHeight: 36 }} src="https://celestia.org/static/celestia-logo-29451ae35d3bb72cc4b0f17712d44c3a.svg"/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select style={{ width: '172px' }} value={network.chainId} onChange={handleChangeNetwork}>
          <Option value={BLOCKSPACERACE_PARAMS.chainId}>{BLOCKSPACERACE_PARAMS.chainName}</Option>
          <Option value={ARABICA_PARAMS.chainId}>{ARABICA_PARAMS.chainName}</Option>
          <Option value={MOCHA_PARAMS.chainId}>{MOCHA_PARAMS.chainName}</Option>
        </Select>
      </div>

      <Menu style={{ marginTop: 24 }} selectedKeys={[currentPage]} onSelect={onSelect} items={items}/>
    </Sider>
  );
}