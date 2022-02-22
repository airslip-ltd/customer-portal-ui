import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, Box } from '@mui/material';
import { columns } from '../../../lists/partner-risk-focus';
import { listData } from '../../../utils/demo-data/PartnerRiskFocus';
import { StandardListClientNoCard } from '../../_common/Lists';
// material

// ----------------------------------------------------------------------

export default function PartnerRiskFocus() {
  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (params) => {
      navigate(`/dashboard/relationship/${params.id}/view`);
    },
    [navigate]
  );

  return (
    <Card>
      <CardHeader title="Risk Focus" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <StandardListClientNoCard
          columns={columns}
          details={listData}
          recordsPerPage={12}
          onRowSelected={handleRowClick}
        />
      </Box>
    </Card>
  );
}
