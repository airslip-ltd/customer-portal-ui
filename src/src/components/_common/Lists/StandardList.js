import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// material
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from '@mui/x-data-grid';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Card, Button } from '@mui/material';

// ----------------------------------------------------------------------

StandardList.propTypes = {
  details: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onChangeQuery: PropTypes.func.isRequired,
  onDownload: PropTypes.func,
  showToolbar: PropTypes.bool,
  onRowSelected: PropTypes.func,
  recordsPerPage: PropTypes.number,
  defaultSort: PropTypes.string
};

export default function StandardList({
  details,
  columns,
  onChangeQuery,
  onDownload,
  onRowSelected,
  recordsPerPage,
  defaultSort,
  showToolbar
}) {
  showToolbar = showToolbar === undefined ? true : showToolbar;

  const [query, setQuery] = useState({
    page: 0,
    recordsPerPage: recordsPerPage || 25,
    sort: [{ field: defaultSort || 'id', sort: 'desc' }],
    search: {
      items: [],
      linkOperator: 'and'
    }
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <Button onClick={onDownload} startIcon={<SaveAltIcon />} size="small">
          Export
        </Button>
      </GridToolbarContainer>
    );
  }

  function EmptyToolbar() {
    return <GridToolbarContainer />;
  }

  useEffect(() => {
    onChangeQuery(query);
  }, [onChangeQuery, query]);

  useEffect(() => {}, [details]);

  const handleSortModelChange = (newModel) => {
    setQuery({ ...query, ...{ page: 0, sort: newModel } });
  };

  const handlePageChange = (newPage) => {
    setQuery({ ...query, ...{ page: newPage } });
  };

  const handlePageSizeChange = (newPageSize) => {
    setQuery({ ...query, ...{ page: 0, recordsPerPage: newPageSize } });
  };

  const handleRowClick = useCallback(onRowSelected, [onRowSelected]);

  const onFilterChange = useCallback(
    (filterModel) => {
      setQuery({ ...query, ...{ page: 0, search: filterModel } });
    },
    [query]
  );

  return (
    <>
      <Card>
        <DataGrid
          autoHeight
          columns={columns}
          rows={details.response.results}
          components={{
            Toolbar: showToolbar ? CustomToolbar : EmptyToolbar
          }}
          disableSelectionOnClick
          filterMode="server"
          onFilterModelChange={onFilterChange}
          sortingMode="server"
          sortModel={query.sort}
          onSortModelChange={handleSortModelChange}
          loading={details.loading}
          pageSize={query.recordsPerPage}
          rowCount={details.response.paging.totalRecords}
          rowsPerPageOptions={[5, 10, 25]}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          page={details.response.paging.page}
          onRowClick={handleRowClick}
        />
      </Card>
    </>
  );
}
