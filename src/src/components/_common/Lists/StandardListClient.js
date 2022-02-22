import PropTypes from 'prop-types';
// material
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton
} from '@mui/x-data-grid';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------

StandardListClient.propTypes = {
  details: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  recordsPerPage: PropTypes.number.isRequired
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

export default function StandardListClient({ details, columns, recordsPerPage }) {
  return (
    <>
      <Card sx={{ p: 2 }}>
        <DataGrid
          sx={{ border: 0 }}
          autoHeight
          columns={columns}
          rows={details.response.results}
          components={{
            Toolbar: CustomToolbar
          }}
          disableSelectionOnClick
          pageSize={recordsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          hideFooter
        />
      </Card>
    </>
  );
}
