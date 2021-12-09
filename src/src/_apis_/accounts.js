// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/accounts').reply(() => {
  const accounts = [...Array(10)].map((_, index) => ({
    id: mockData.id(index),
    bankId: mockData.bankId(index),
    name: mockData.bankName(index),
    status: mockData.accountStatus(index),
    accountNumber: mockData.accountNumber(index),
    sortCode: mockData.sortCode(index)
  }));

  return [200, { accounts }];
});
