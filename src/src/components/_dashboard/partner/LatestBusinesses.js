import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Box, Typography, Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { search } from '../../../redux/slices/relationship';
import { GET_ALL_QUERY } from '../../../redux/common/search';
// utils
import { LoadingCard } from '../../_common/progress';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

RelationshipRow.propTypes = {
  item: PropTypes.object.isRequired
};

function RelationshipRow({ item }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          {item.invitationDetails.businessName}
        </Typography>
      </Box>
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ display: 'flex' }}>
          <Button
            sx={{ px: 1 }}
            component={RouterLink}
            to={`${PATH_DASHBOARD.relationship.view}/${item.id}`}
            color="inherit"
          >
            Details
          </Button>
          <Button
            component={RouterLink}
            to={`${PATH_DASHBOARD.partner.summary}/${item.related.airslipUserType}/${item.related.entityId}`}
            color="inherit"
          >
            Analytics
          </Button>
          <Button
            disabled={item.permission.findIndex((perm) => perm.permissionType === 'Commerce') < 0}
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.commerceTransactions}/${item.related.airslipUserType}/${item.related.entityId}`}
            color="inherit"
          >
            Commerce
          </Button>
          <Button
            disabled={item.permission.findIndex((perm) => perm.permissionType === 'Banking') < 0}
            component={RouterLink}
            to={`${PATH_DASHBOARD.reports.bankTransactions}/${item.related.airslipUserType}/${item.related.entityId}`}
            color="inherit"
          >
            Banking
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default function LatestBusinesses() {
  const dispatch = useDispatch();
  const { relationship } = useSelector((state) => state.relationship);
  const [query] = useState({
    ...GET_ALL_QUERY,
    recordsPerPage: 5,
    search: {
      items: [
        {
          columnField: 'relationshipStatus',
          operatorValue: 'equals',
          value: 'Approved'
        }
      ],
      linkOperator: 'and'
    },
    sort: [{ field: 'timestamp', sort: 'desc' }]
  });

  useEffect(() => {
    dispatch(search(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (!relationship.complete) return;
    console.log(relationship);
  }, [relationship]);

  return (
    <LoadingCard apiRequest={relationship} title="Latest Connections">
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Typography variant="subtitle2">Quick Links</Typography>
        </Box>
      </Box>
      <Stack spacing={2}>
        {relationship.response.results.map((item) => (
          <RelationshipRow key={item.id} item={item} />
        ))}
      </Stack>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            size="medium"
            variant="outlined"
            fullWidth
            component={RouterLink}
            to={`${PATH_DASHBOARD.relationship.create}`}
            sx={{ mt: 1 }}
          >
            Invite another Business
          </Button>
        </Box>
      </Box>
    </LoadingCard>
  );
}
