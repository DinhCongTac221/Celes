import { Layout } from 'antd';
import { useState } from 'react';
import SideMenu from './SideMenu';
import PageHeader from './PageHeader';
import Overview from './Overview';
import Staking from './Staking';
import Developer from './Developer';

const { Content } = Layout

function DashboardContent({ currentPage }) {
  switch (currentPage) {
    case 'pay for blob':
      return <Developer/>;
    case 'staking':
      return <Staking/>
    default:
      return <Overview/>;
  }
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('overview');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return <Layout>
    <SideMenu currentPage={currentPage} onPageChange={handlePageChange}></SideMenu>
    <Layout style={{ marginLeft: 200 }}>
      <PageHeader currentPage={currentPage}></PageHeader>
      <Content style={{ height: 'calc(100vh - 120px)', padding: '64px 32px' }}>
        <DashboardContent currentPage={currentPage}/>
      </Content>
    </Layout>
  </Layout>
}
