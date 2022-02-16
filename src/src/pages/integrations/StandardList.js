import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// material
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------

StandardList.propTypes = {
  details: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  onChangeQuery: PropTypes.func.isRequired,
  onRowSelected: PropTypes.func,
  recordsPerPage: PropTypes.number
};

export default function StandardList({ details, loading, columns, onChangeQuery, onRowSelected, recordsPerPage }) {
  const [query, setQuery] = useState({
    page: 0,
    recordsPerPage: recordsPerPage || 25,
    sort: [{ field: 'id', sort: 'asc' }],
    search: {
      items: [],
      linkOperator: 'and'
    }
  });

  useEffect(() => {
    onChangeQuery(query);
  }, [onChangeQuery, query]);

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
      {details.results && (
        <Card>
          <DataGrid
            autoHeight
            columns={columns}
            rows={details.results}
            components={{
              Toolbar: GridToolbar
            }}
            disableSelectionOnClick
            filterMode="server"
            onFilterModelChange={onFilterChange}
            sortingMode="server"
            sortModel={query.sort}
            onSortModelChange={handleSortModelChange}
            loading={loading}
            pageSize={query.recordsPerPage}
            rowCount={details.paging.totalRecords}
            rowsPerPageOptions={[5, 10, 25]}
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            page={details.paging.page}
            onRowClick={handleRowClick}
          />
        </Card>
      )}
    </>
  );
}
