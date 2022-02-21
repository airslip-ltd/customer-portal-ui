import { fCurrencyFromLong } from '../utils/formatNumber';
import { fDateFromLong } from '../utils/formatDate';

export const columns = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    searchable: false,
    hide: true
  },
  {
    field: 'bankId',
    headerName: 'Bank',
    flex: 1
  },
  {
    dataType: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    dataType: 'dateTime',
    field: 'capturedDate',
    headerName: 'Captured Date',
    flex: 1,
    valueFormatter: (params) => fDateFromLong(params.value),
    searchable: false
  },
  {
    field: 'currencyCode',
    headerName: 'Currency Code',
    flex: 1
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1
  },
  {
    field: 'isoFamilyCode',
    headerName: 'Iso Family Code',
    flex: 1,
    hide: true
  },
  {
    field: 'proprietaryCode',
    headerName: 'Proprietary Code',
    flex: 1,
    hide: true
  }
];
// public string BankId { get; set; } = string.Empty;
// public string EmailAddress { get; set; } = string.Empty;
// public long? AuthorisedDate { get; set; }
// public long CapturedDate { get; set; }
// public long Amount { get; set; }
// public string? CurrencyCode { get; set; }
// public string? AddressLine { get; set; }
// public string? LastCardDigits { get; set; }
// public string? TransactionIdentifier { get; set; }
// public string? Reference { get; set; }
// public DataSources DataSource { get; set; }
// public long TimeStamp { get; set; }
