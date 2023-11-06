import { fakerES as faker } from "@faker-js/faker";

const productMock = async (number) => {
  const products = [];

  for (let i = 0; i < number; i++) {
    console.log(i);
    const product = {
      id: i + 1,
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbail: faker.image.abstract(),
      code: faker.datatype.number().int(),
      stock: faker.datatype.number(),
      status: true,
      category: faker.commerce.product(),
    };

    products.push(product);
  }

  return products;
};

export default productMock;
