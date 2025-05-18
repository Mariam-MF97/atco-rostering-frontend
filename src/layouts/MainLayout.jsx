import React, { useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CalendarOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../store/authStore.js';
import useThemeStore from '../store/themeStore.js';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import neraLogo from '../assets/nera-logo.png';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
    {
      key: '/shifts',
      icon: <CalendarOutlined />,
      label: t('navigation.shifts'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: t('navigation.profile'),
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'fixed',
          height: '100vh',
          [isRTL ? 'right' : 'left']: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            margin: 16,
          }}
        >
          <img
            src={neraLogo}
            alt='Nera Logo'
            style={{ maxWidth: '100%', maxHeight: 48, objectFit: 'contain' }}
          />
        </div>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout
        style={{
          [isRTL ? 'marginRight' : 'marginLeft']: collapsed ? 80 : 200,
          transition: `${isRTL ? 'margin-right' : 'margin-left'} 0.2s`,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 999,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              [isRTL ? 'marginRight' : 'marginLeft']: collapsed ? 80 : 200,
              transition: `${isRTL ? 'margin-right' : 'margin-left'} 0.2s`,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                position: 'fixed',
                [isRTL ? 'right' : 'left']: collapsed ? 80 : 200,
                transition: `${isRTL ? 'right' : 'left'} 0.2s`,
                zIndex: 1001,
              }}
            />
          </div>
          <div
            style={{
              [isRTL ? 'marginLeft' : 'marginRight']: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <LanguageSwitcher />
            <Button
              type='text'
              icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
              onClick={toggleTheme}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            />
            <span>{user?.name || t('common.user')}</span>
            <Button
              type='text'
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              danger
            >
              {t('common.logout')}
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflow: 'auto',
            height: 'calc(100vh - 112px)', // Account for header height (64px) and margins (24px * 2)
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
