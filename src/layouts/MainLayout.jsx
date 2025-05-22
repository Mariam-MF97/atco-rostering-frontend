import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  WorkOutline as WorkOutlineIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../store/authStore.js';
import useThemeStore from '../store/themeStore.js';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import TeamSmartCollapsedIcon from '../assets/logos/TeamSmartCollapsed.jsx';
import TeamSmartExpandedIcon from '../assets/logos/TeamSmartExpanded.jsx';
import NeraLogo from '../assets/logos/neraLogo.png';
import SansLogo from '../assets/logos/sansLogo.png';
const drawerWidth = 280;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const [planningOpen, setPlanningOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  const sidebarItems = [
    {
      key: '/',
      label: t('navigation.dashboard'),
      icon: <DashboardIcon />,
    },
    {
      key: 'planning',
      label: t('sidebar.planning'),
      icon: <CalendarIcon />,
      expandable: true,
      children: [
        {
          key: '/shifts',
          label: t('sidebar.shifts'),
          icon: <CalendarIcon />,
        },
        {
          key: '/shifts-patterns',
          label: t('sidebar.shiftsPatterns'),
          icon: <AssignmentIcon />,
        },
        {
          key: '/working-rules',
          label: t('sidebar.workingRules'),
          icon: <WorkOutlineIcon />,
        },
        {
          key: '/mpr-coverage',
          label: t('sidebar.mprCoverage'),
          icon: <AssignmentIcon />,
        },
      ],
    },
    {
      key: '/rostering',
      label: t('sidebar.rostering'),
      icon: <AssignmentIcon />,
    },
    {
      key: '/resources',
      label: t('sidebar.resources'),
      icon: <PeopleIcon />,
    },
    {
      key: '/configurations',
      label: t('sidebar.configurations'),
      icon: <SettingsIcon />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant='permanent'
        open={open}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          transition: 'width 0.2s',
          backgroundColor: isDarkMode ? '#000' : '#0B154B',
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 64,
            transition: 'width 0.2s',
            boxSizing: 'border-box',
            backgroundColor: isDarkMode ? '#000' : '#0B154B',

            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            minWidth: 0,
            marginBottom: 4,
          }}
        >
          {open ? <TeamSmartExpandedIcon /> : <TeamSmartCollapsedIcon />}
        </Box>
        <List>
          {sidebarItems.map((item) => {
            if (item.expandable) {
              // Planning section
              const isAnyChildSelected = item.children.some(
                (child) => location.pathname === child.key
              );
              return (
                <React.Fragment key={item.key}>
                  <ListItemButton
                    selected={isAnyChildSelected}
                    onClick={() => setPlanningOpen((prev) => !prev)}
                    sx={{
                      minWidth: 0,
                      justifyContent: open ? 'initial' : 'center',
                      px: open ? 2 : 2.5,
                      color: isAnyChildSelected ? '#FFF' : '#C7C5D0',
                      fontWeight: isAnyChildSelected ? 900 : 400,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        color: 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.label}
                        sx={{
                          color: isAnyChildSelected ? '#FFF' : '#C7C5D0',
                          fontWeight: isAnyChildSelected ? 900 : 400,
                        }}
                      />
                    )}
                    {open && (planningOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                  <Collapse in={planningOpen} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.key}
                          selected={location.pathname === child.key}
                          onClick={() => navigate(child.key)}
                          sx={{
                            pl: open ? 4 : 2.5,
                            justifyContent: open ? 'initial' : 'center',
                            color:
                              location.pathname === child.key
                                ? '#FFF'
                                : '#C7C5D0',
                            fontWeight:
                              location.pathname === child.key ? 900 : 400,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 2 : 'auto',
                              color: 'inherit',
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={child.label}
                              sx={{
                                color:
                                  location.pathname === child.key
                                    ? '#FFF'
                                    : '#C7C5D0',
                                fontWeight:
                                  location.pathname === child.key ? 900 : 400,
                              }}
                            />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }
            // Regular item
            return (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.key}
                  onClick={() => navigate(item.key)}
                  sx={{
                    minWidth: 0,
                    justifyContent: open ? 'initial' : 'center',
                    px: open ? 2 : 2.5,
                    color: location.pathname === item.key ? '#FFF' : '#C7C5D0',
                    fontWeight: location.pathname === item.key ? 900 : 400,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      color: 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      sx={{
                        color:
                          location.pathname === item.key ? '#FFF' : '#C7C5D0',
                        fontWeight: location.pathname === item.key ? 900 : 400,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Sans Logo at bottom of sidebar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={SansLogo}
            alt='Sans Logo'
            style={{
              width: open ? '60px' : '40px',
              transition: 'width 0.2s',
              opacity: 0.7,
            }}
          />
        </Box>
      </Drawer>

      {/* Right side: Header + Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar header */}
        <AppBar
          position='static'
          elevation={0}
          color='default'
          sx={{
            backgroundColor: isDarkMode ? '#000' : 'background.paper',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => setOpen(!open)}
                sx={{ mr: 2 }}
                color='inherit'
              >
                {open ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant='h6' noWrap>
                  by
                </Typography>
                <img src={NeraLogo} alt='Nera Logo' />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* <LanguageSwitcher /> */}
              <IconButton onClick={toggleTheme} color='inherit'>
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Typography variant='body2'>
                {user?.name || t('common.user')}
              </Typography>
              <IconButton onClick={handleLogout} color='inherit'>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 5,
            overflow: 'auto',
            backgroundColor: isDarkMode ? 'inherit' : 'background.default',
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component='footer'
          sx={{
            py: 2,
            px: 3,
            mt: 'auto',
            backgroundColor: isDarkMode ? '#000' : 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              © Team Smart 2025 - All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
