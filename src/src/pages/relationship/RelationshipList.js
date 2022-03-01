import { useState, useEffect, useCallback } from 'react';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRelationships } from '../../redux/slices/relationship';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/relationship-list';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function RelationshipList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { relationships } = useSelector((state) => state.relationship);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(getRelationships(query));
  }, [dispatch, query]);

  const handleRowClick = useCallback((params) => {
    console.log(params);
  }, []);

  return (
    <>
      <Page title="Relationships | List | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Relationship List"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Relationships', href: PATH_DASHBOARD.relationship.root },
              { name: 'List' }
            ]}
          />
          <StandardList
            columns={columns}
            details={relationships}
            onChangeQuery={setQuery}
            onRowSelected={handleRowClick}
            recordsPerPage={10}
          />
        </Container>
      </Page>
    </>
  );
}
