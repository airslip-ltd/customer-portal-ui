// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/banks').reply(() => {
  const banks = [...Array(10)].map((_, index) => ({
    bankId: mockData.bankId(index),
    name: mockData.bankName(index)
  }));

  return [200, { banks }];
});
