import { fCurrencyFromLong } from '../utils/formatNumber';
import { fFullDateTime } from '../utils/formatDate';

export const columns = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    searchable: false,
    hide: true
  },
  {
    field: 'source',
    headerName: 'Source',
    flex: 1
  },
  {
    dataType: 'number',
    field: 'total',
    headerName: 'Total',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    dataType: 'dateTime',
    field: 'datetime',
    headerName: 'Date',
    flex: 1,
    valueFormatter: (params) => fFullDateTime(params.value),
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
  }
];
/**
 public DataSources DataSource { get; set; }
    public long TimeStamp { get; set; }
    public string TrackingId { get; set; } = string.Empty;
    public string? InternalId { get; init; }
    public string? Source { get; init; }
    public string? TransactionNumber { get; init; }
    public string? RefundCode { get; init; }
    public DateTime? Datetime { get; init; }
    public string? StoreLocationId { get; init; }
    public string? StoreAddress { get; init; }
    public bool? OnlinePurchase { get; init; }
    public long? Subtotal { get; init; }
    public long? ServiceCharge { get; init; }
    public long? Total { get; init; }
    public string? CurrencyCode { get; init; }
    public string? CustomerEmail { get; init; }
    public string? OperatorName { get; init; }
    public DateTime? Date { get; init; }
    public string? Time { get; init; }
    public string? Till { get; init; }
    public string? Number { get; init; }
    public string? Store { get; init; }
    public string? Description { get; init; }
    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
 */
