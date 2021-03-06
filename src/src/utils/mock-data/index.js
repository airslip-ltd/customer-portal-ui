import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company, companyStatus } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description } from './text';
import { price, rating, age, percent } from './number';
import { scores } from './ratings';
import { banks, accountStatus, accountNumber, sortCode } from './banks';
import { provider, providerName } from './providers';
import { merchants } from './merchants';

// ----------------------------------------------------------------------

const mockData = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  product: (index) => merchants[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  companyStatus: (index) => companyStatus[index],
  scores: (index) => scores[index],
  provider: (index) => provider[index],
  providerName: (index) => providerName[index],
  banks: (index) => banks[index],
  allBanks: banks,
  accountStatus: (index) => accountStatus[index],
  accountNumber: (index) => accountNumber[index],
  sortCode: (index) => sortCode[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index]
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index]
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index]
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index]
  },
  image: {
    cover: (index) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    feed: (index) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index) => `/static/mock-images/products/product_${index + 1}.jpg`,
    avatar: (index) => `/static/mock-images/avatars/avatar_${index + 1}.jpg`
  }
};

export default mockData;
