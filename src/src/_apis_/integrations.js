// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/integrations').reply(() => {
  const integrations = [...Array(2)].map((_, index) => ({
    id: mockData.id(index),
    provider: mockData.provider(index),
    name: mockData.providerName(index),
    status: mockData.accountStatus(index)
  }));

  return [200, { integrations }];
});
