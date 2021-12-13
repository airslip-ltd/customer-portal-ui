// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/merchants/all').reply(() => {
  const merchants = [...Array(24)].map((_, index) => ({
    id: mockData.id(index),
    name: mockData.company(index),
    rating: mockData.scores(index)
  }));

  return [200, { merchants }];
});