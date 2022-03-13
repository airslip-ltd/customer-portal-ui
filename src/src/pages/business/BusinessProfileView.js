import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Card, Tabs, Tab, Box, Button, Stack } from '@mui/material';
// redux
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { useDispatch, useSelector } from '../../redux/store';
import { getMyDetails } from '../../redux/slices/business';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { BusinessProfile, BusinessCover } from '../../components/_dashboard/business';
import ApiError from '../../components/_common/Errors/ApiError';

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

export default function BusinessProfileView() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.business);
  const [currentTab, setCurrentTab] = useState('details');

  useEffect(() => {
    dispatch(getMyDetails());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: 'details',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <BusinessProfile business={profile.hasData ? profile.response.currentVersion : {}} />
    }
  ];

  const ViewActions = () => (
    <Stack direction="row" spacing={1} sx={{ pt: 3 }}>
      <Button size="medium" variant="contained" component={RouterLink} to={`${PATH_DASHBOARD.business.profile.edit}`}>
        Edit
      </Button>
    </Stack>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Profile"
      spaceHref={PATH_DASHBOARD.business.profile.view}
      activity="My Details"
      heading="My Details"
      actions={<ViewActions />}
    >
      {profile.hasData && (
        <>
          <ApiError error={profile.error} />
          <Card
            sx={{
              mb: 3,
              height: 180,
              position: 'relative'
            }}
          >
            <BusinessCover business={profile.response.currentVersion} />

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
