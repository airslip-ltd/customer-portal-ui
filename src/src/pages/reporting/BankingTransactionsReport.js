// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import BankingTransactions from '../../components/reports/BankingTransactions';
import { RelationshipHeading } from '../../components/_dashboard/relationship';

// ----------------------------------------------------------------------

export default function BankingTransactionsReport() {
  return (
    <StandardPage
      area="Dashboard"
      space="Reports"
      spaceHref={PATH_DASHBOARD.reports.root}
      activity="Bank Transactions"
      heading="Bank Transactions"
      fullWidth
    >
      <RelationshipHeading />
      <BankingTransactions />
    </StandardPage>
  );
}
