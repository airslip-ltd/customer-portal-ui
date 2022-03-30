// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { RelationshipHeading } from '../../components/_dashboard/relationship';
import { CommerceTransactions } from '../../components/reports';

// ----------------------------------------------------------------------

export default function CommerceTransactionsReport() {
  return (
    <StandardPage
      area="Dashboard"
      space="Reports"
      spaceHref={PATH_DASHBOARD.reports.root}
      activity="Commerce Transactions"
      heading="Commerce Transactions"
      fullWidth
    >
      <RelationshipHeading />
      <CommerceTransactions />
    </StandardPage>
  );
}
