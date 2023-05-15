import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Space, Typography, theme } from 'antd';

const indicator = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export default function Loading() {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Space direction='vertical'>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}><Spin indicator={indicator} /></div>
      <Typography.Title level={5} style={{ color: colorPrimary }} >
        Welcome to the Celestia app, your gateway to the wonders of the universe!
      </Typography.Title>
    </Space>
  </div>
}