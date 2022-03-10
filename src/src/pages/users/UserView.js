import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Card, Tabs, Tab, Box, Button } from '@mui/material';
// redux
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { useDispatch, useSelector } from '../../redux/store';
import { get } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { Profile, ProfileCover } from '../../components/_dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

export default function UserView() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('profile');

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile user={current.response.currentVersion} />
    }
  ];

  const ViewActions = () => (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`${PATH_DASHBOARD.user.edit}/${id}`}
      sx={{ mt: 1 }}
    >
      Edit
    </Button>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Users"
      spaceHref={PATH_DASHBOARD.user.list}
      activity={current.hasData ? current.response.currentVersion.displayName : id}
      heading={current.hasData ? current.response.currentVersion.displayName : id}
      actions={<ViewActions />}
    >
      {current.hasData && (
        <>
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: 'relative'
            }}
          >
            <ProfileCover user={current.response.currentVersion} />

            <TabsWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={handleChangeTab}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
                ))}
              </Tabs>
            </TabsWrapperStyle>
          </Card>

          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </>
      )}
    </StandardPage>
  );
}
