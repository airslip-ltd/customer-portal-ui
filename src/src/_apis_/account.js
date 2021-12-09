import { v4 as uuidv4 } from 'uuid';
// utils
import fakeRequest from '../utils/fakeRequest';
import { verify, sign } from '../utils/jwt';
//
import mock from './mock';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users = [
  {
    id: '14ab7f6f34e04b7085a87a6bd73fd0ea',
    email: 'dev-testing-1@airslip.com',
    password: 'Test1234!',
    firstName: 'Graham',
    lastName: 'Whitehouse',
    displayName: 'Graham Whitehouse',
    userRole: 'Administrator',
    airslipUserType: 'Merchant',
    entityId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
    createdDate: 1635238628393,
    biometricOn: false,
    dataConsent: {
      essential: true,
      performance: true,
      personalisation: true,
      createdOn: 1636627203702
    }
  },
  {
    id: '14ab7f6f34e04b7085a87a6bd73fd0fg',
    email: 'dev-testing-2@airslip.com',
    password: 'Test1234!',
    firstName: 'Tom',
    lastName: 'McDonough',
    displayName: 'Tom McDonough',
    userRole: 'Administrator',
    airslipUserType: 'Partner',
    entityId: 'some-entity',
    createdDate: 1635238628393,
    biometricOn: false,
    dataConsent: {
      essential: true,
      performance: true,
      personalisation: true,
      createdOn: 1636627203702
    }
  }
];

// ----------------------------------------------------------------------

mock.onPost('/identity/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'There is no user corresponding to the email address.' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Wrong password' }];
    }

    const bearerToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { bearerToken, refreshToken: 'sometoken', user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'There already exists an account with the given email address.' }];
    }

    user = {
      id: uuidv4(),
      displayName: `${firstName} ${lastName}`,
      email,
      password,
      photoURL: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      about: null,
      role: 'user',
      isPublic: true
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/account/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
