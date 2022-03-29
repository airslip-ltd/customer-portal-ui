import { REQUEST_DEFAULTS } from '../../redux/common/constants';

export const demoData = {
  ...REQUEST_DEFAULTS,
  complete: true,
  response: {
    balance: 1005.0,
    movement: -5.0,
    metrics: [
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 0.0 },
      { balance: 560.0 }
    ],
    dayRange: 30
  }
};
