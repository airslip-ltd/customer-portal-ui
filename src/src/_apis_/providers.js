// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/providers').reply(() => {
  const providers = [...Array(1)].map((_, index) => ({
    provider: mockData.provider(index),
    name: mockData.providerName(index)
  }));

  return [200, { providers }];
});
