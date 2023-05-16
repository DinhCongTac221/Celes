import { Card, Form, Input, Button, Space, Typography } from 'antd';
import { useWallet } from '../../contexts/Wallet';
import Celestia from '../../services/celestia';
import { useState } from 'react';

const { TextArea } = Input;

const NAMESPACE_ID = 'd2ba8e7007298338';

export default function Developer() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);

    const { ip, port, namespaceId, data, gasLimit, fee} = form.getFieldsValue();  

    try {
      const res = await Celestia.submitPFB(ip, port, namespaceId, data, gasLimit, fee);
      setResult(res.data);
    } catch (err) {
      setResult(err.message);
    }

    setLoading(false);
  };

  return (
    <Card>
      <div style={{ width: '100%', display: 'flex' }}>
        <Form
          layout='vertical'
          form={form}
          initialValues={{
            namespaceId: NAMESPACE_ID,
            data: '',
            gasLimit: 80000,
            fee: 2000,
            ip: '159.69.147.84',
            port: 26659,
          }}
          style={{ width: '50%', maxWidth: '480px' }}
        >
          <Form.Item name='namespaceId' label="Namespace ID">
            <Input disabled placeholder="Namespace Id" />
          </Form.Item>
          <Form.Item name='data' label="Data">
            <TextArea placeholder="Data" />
          </Form.Item>
          <Form.Item name='gasLimit' label="Gas limit">
            <Input placeholder="Gas limit"/>
          </Form.Item>
          <Form.Item name='fee' label="Fee">
            <Input placeholder="Fee"/>
          </Form.Item>
          <Form.Item name='ip' label="IP">
            <Input placeholder="Gateway IP"/>
          </Form.Item>
          <Form.Item name='port' label="Port">
            <Input placeholder="Gateway Port"/>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" onClick={handleSubmit}>Submit</Button>
          </Form.Item>
        </Form>
        <div style={{ width: '50%', paddingLeft: '32px' }}>
          {
            result && <div>
              <Typography.Title level={3}>
                Result
              </Typography.Title>
              <Typography.Paragraph>
                { result }
              </Typography.Paragraph>
            </div>
          }
        </div>
      </div>

    </Card>
  )
}