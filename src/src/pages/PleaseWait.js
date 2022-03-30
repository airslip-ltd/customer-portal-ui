// components
import Page from '../components/Page';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function PleaseWait() {
  return (
    <Page title="General | App | Airslip">
      <LoadingScreen
        sx={{
          top: 0,
          left: 0,
          width: 1,
          zIndex: 9999,
          position: 'fixed'
        }}
      />
    </Page>
  );
}
