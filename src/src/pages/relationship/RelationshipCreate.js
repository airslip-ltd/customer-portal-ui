// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CreateForm } from '../../components/_dashboard/relationship';

// ----------------------------------------------------------------------

export default function RelationshipCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Relationship | Create | Airslip">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a New Relationship"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Relationships', href: PATH_DASHBOARD.relationship.create },
            { name: 'Create' }
          ]}
        />
        <CreateForm />
      </Container>
    </Page>
  );
}
