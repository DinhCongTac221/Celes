import { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/Wallet';
import Celestia from '../../services/celestia';
import { Card, Space, Table, Typography } from 'antd';

const { Title } = Typography;

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Proposer Priority',
    dataIndex: 'proposer_priority',
    key: 'proposer_priority',
  },
  {
    title: 'Voting Power',
    dataIndex: 'voting_power',
    key: 'voting_power',
  },
]

export default function Overview() {
  const { wallet, network } = useWallet();
  const [validators, setValidators] = useState([]);
  const [ count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchValidators = async () => {
    setLoading(true);

    try {
      const data = await Celestia.getValidators(network.rpc);
      setValidators(data.result.validators);
      setBlockHeight(data.result.block_height);
      setTotal(data.result.total);
      console.log(data);
    } catch(error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchValidators();
  }, []);

  return (
    <Card
      loading={loading}
      title={<Space size='large'>
        <Title level={4}>Block Height: {blockHeight}</Title>
        <Title level={4}>Total: {total}</Title>
      </Space>}
    >
      <Table columns={columns} dataSource={validators}/>
    </Card>
  )
}