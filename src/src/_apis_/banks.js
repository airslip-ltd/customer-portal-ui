// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/banks').reply(() => {
  const { allBanks } = mockData;

  return [200, { banks: allBanks }];
});
