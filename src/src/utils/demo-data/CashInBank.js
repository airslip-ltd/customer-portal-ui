import { ACTION_DEFAULTS } from '../../redux/common/actions';

export const demoData = {
  ...ACTION_DEFAULTS,
  complete: true,
  response: {
    balance: 160,
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
