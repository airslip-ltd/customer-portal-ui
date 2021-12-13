import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  Typography,
  Container
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getMerchantList } from '../../../redux/slices/merchant';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { MerchantMoreMenu, MerchantRating } from '../merchant-view';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function PartnerRiskFocus() {
  const dispatch = useDispatch();
  const { merchantList } = useSelector((state) => state.merchant);

  useEffect(() => {
    dispatch(getMerchantList());
  }, [dispatch]);

  const filteredList = applySortFilter(merchantList, (a, b) => descendingComparator(a, b, 'rating')).slice(0, 10);

  return (
    <Card>
      <CardHeader title="Risk Focus" sx={{ mb: 3 }} />
      <Container>
        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 680 }}>
          These are your top ten risk areas today, risk scores are real time and based on activity within your
          customers.
        </Typography>
      </Container>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Merchant Name</TableCell>
                <TableCell>Risk Score</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredList.map((row) => {
                const { id, name, rating } = row;
                return (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      <MerchantRating score={rating} />
                    </TableCell>
                    <TableCell align="right">
                      <MerchantMoreMenu id={id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to={PATH_DASHBOARD.partner.merchants.list}
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}