// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/banks').reply(() => {
  const banks = [...Array(25)].map((_, index) => ({
    bankId: mockData.banks.bankId(index),
    bankName: mockData.banks.bankName(index)
  }));

  return [200, { banks }];
});
