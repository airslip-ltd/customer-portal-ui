import { REQUEST_DEFAULTS } from '../../redux/common/constants';

export const demoData = {
  ...REQUEST_DEFAULTS,
  complete: true,
  response: {
    balance: 5052010,
    movement: -15.0,
    metrics: [
      { balance: 50 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 },
      { balance: 421000 }
    ],
    dayRange: 30
  }
};
