import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

 const changeLanguage = (lng) => {
   i18n.changeLanguage(lng);
   localStorage.setItem('i18nextLng', lng); 
   document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
   document.documentElement.lang = lng;
 };

  const items = [
    {
      key: 'en',
      label: (
        <Space>
          <span>🇺🇸</span>
          <span>English</span>
          {i18n.language === 'en' && (
            <CheckOutlined style={{ color: '#1890ff' }} />
          )}
        </Space>
      ),
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'ar',
      label: (
        <Space>
          <span>🇸🇦</span>
          <span>العربية</span>
          {i18n.language === 'ar' && (
            <CheckOutlined style={{ color: '#1890ff' }} />
          )}
        </Space>
      ),
      onClick: () => changeLanguage('ar'),
    },
  ];

  const menuProps = { items };

  const currentFlag = i18n.language === 'ar' ? '🇸🇦' : '🇺🇸';

  return (
    <Dropdown menu={menuProps} placement='bottomRight'>
      <Button
        type='text'
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
        }}
      >
        <GlobalOutlined />
        <span>{currentFlag}</span>
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
