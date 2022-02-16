import { useState, useEffect } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getIntegrationList } from '../../redux/slices/integrations';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  IntegrationListHead,
  IntegrationListToolbar,
  IntegrationMoreMenu,
  ProviderIcon
} from '../../components/_dashboard/integration-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'dataSource', label: 'Data Source', alignRight: false },
  { id: 'id', label: 'Id', alignRight: false },
  { id: '' }
];

const DEFAULT_QUERY = { page: 0, recordsPerPage: 25, sortColumn: 'id', sortOrder: 'asc', filters: [] };

// ----------------------------------------------------------------------

export default function IntegrationList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { integrationList } = useSelector((state) => state.integration);
  const [filterName, setFilterName] = useState('');
  const [query, setQuery] = useState(DEFAULT_QUERY);

  useEffect(() => {
    dispatch(getIntegrationList(query));
  }, [dispatch, query]);

  useEffect(() => {
    console.log(integrationList);
  }, [integrationList]);

  const handleRequestSort = (event, property) => {
    console.log('handleRequestSort', property);

    const isAsc = query.sortColumn === property && query.sortOrder === 'asc';

    setQuery({ ...query, ...{ page: 0, sortColumn: property, sortOrder: isAsc ? 'desc' : 'asc' } });
  };

  const handleChangePage = (event, newPage) => {
    setQuery({ ...query, ...{ page: newPage } });
  };

  const handleChangeRowsPerPage = (event) => {
    setQuery({ ...query, ...{ page: 0, recordsPerPage: parseInt(event.target.value, 10) } });
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Integrations List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Integrations', href: PATH_DASHBOARD.integrations.root },
            { name: 'List' }
          ]}
        />

        {integrationList.results && (
          <Card>
            <IntegrationListToolbar filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <IntegrationListHead
                    order={query.sortOrder}
                    orderBy={query.sortColumn}
                    headLabel={TABLE_HEAD}
                    rowCount={integrationList.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {integrationList.results.map((row) => {
                      const { id, dataSource, provider } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <ProviderIcon icon={provider} />
                              <Typography variant="subtitle2" noWrap>
                                {dataSource}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell align="right">
                            <IntegrationMoreMenu id={id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  {integrationList.paging.totalRecords === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={integrationList.paging.totalRecords}
              rowsPerPage={query.recordsPerPage}
              page={integrationList.paging.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}
