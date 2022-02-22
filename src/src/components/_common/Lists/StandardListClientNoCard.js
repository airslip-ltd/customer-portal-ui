import { useCallback } from 'react';
import PropTypes from 'prop-types';
// material
import { DataGrid } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

StandardListClientNoCard.propTypes = {
  details: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  defaultSort: PropTypes.string,
  onRowSelected: PropTypes.func
};

export default function StandardListClientNoCard({ details, columns, recordsPerPage, defaultSort, onRowSelected }) {
  const sortOrder = [{ field: defaultSort || 'id', sort: 'desc' }];
  const handleRowClick = useCallback(onRowSelected, [onRowSelected]);

  return (
    <>
      <DataGrid
        sx={{ border: 0 }}
        autoHeight
        columns={columns}
        sortModel={sortOrder}
        rows={details.response.results}
        disableSelectionOnClick
        pageSize={recordsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        hideFooter
        onRowClick={handleRowClick}
      />
    </>
  );
}
