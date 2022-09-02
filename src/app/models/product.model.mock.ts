import { faker } from '@faker-js/faker';

import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    images: [faker.image.imageUrl(), faker.image.imageUrl()],
    description: faker.commerce.productDescription(),
    category: {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
    },
    taxes: 0.0,
  };
};

export const generateManyProduct = (size = 10): Product[] => {
  let products: Product[] = [];

  for (let index = 0; index < size; index++) {
    products.push(generateOneProduct());
  }

  return [...products];
};
