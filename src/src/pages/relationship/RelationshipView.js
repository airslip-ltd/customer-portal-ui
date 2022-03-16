import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import { Card, Tabs, Tab, Box, Button, Stack } from '@mui/material';
// redux
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { useDispatch, useSelector } from '../../redux/store';
import { get, del } from '../../redux/slices/relationship';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { RelationshipProfile, RelationshipCover } from '../../components/_dashboard/relationship';
import Confirmation from '../../components/_common/dialog/Confirmation';
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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.error.main),
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  }
}));

// ----------------------------------------------------------------------

export default function RelationshipView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { current } = useSelector((state) => state.relationship);
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('details');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(get(id));
  }, [dispatch, id]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (id) dispatch(del(id));
  };

  useEffect(() => {
    if (current.status === 'success') {
      // Assume success
      enqueueSnackbar('Delete success', { variant: 'success' });
      navigate(PATH_DASHBOARD.relationship.list);
    }
  }, [current, dispatch, enqueueSnackbar, navigate]);

  const PROFILE_TABS = [
    {
      value: 'details',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <RelationshipProfile relationship={current.hasData ? current.response.currentVersion : {}} />
    }
  ];

  const ViewActions = () => (
    <Stack direction="row" spacing={1} sx={{ pt: 3 }}>
      <Button size="medium" variant="contained" component={RouterLink} to={`${PATH_DASHBOARD.relationship.list}`}>
        Back
      </Button>
      <ColorButton size="medium" variant="contained" onClick={handleDelete}>
        Delete
      </ColorButton>
    </Stack>
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Businesses"
      spaceHref={PATH_DASHBOARD.relationship.list}
      activity={current.hasData ? current.response.currentVersion.invitationDetails.businessName : id}
      heading={current.hasData ? current.response.currentVersion.invitationDetails.businessName : id}
      actions={<ViewActions />}
    >
      {current.hasData && (
        <>
          <ApiError error={current.error} />
          <Card
            sx={{
              mb: 3,
              height: 180,
              position: 'relative'
            }}
          >
            <RelationshipCover relationship={current.response.currentVersion} />

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
      <Confirmation onCancel={handleCancel} onConfirm={handleConfirm} open={open} title="Are you sure?">
        Your relationship with&nbsp;
        {current.hasData ? current.response.currentVersion.invitationDetails.businessName : id} will be removed from
        Airslip.
      </Confirmation>
    </StandardPage>
  );
}
