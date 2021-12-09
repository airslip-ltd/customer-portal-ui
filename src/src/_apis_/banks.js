// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

mock.onGet('/banks').reply(() => {
  const banks = [...Array(10)].map((_, index) => ({
    id: mockData.id(index),
    name: mockData.company(index),
    rating: mockData.scores(index)
  }));

  return [200, { banks }];
});
