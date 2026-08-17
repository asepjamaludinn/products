let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 150000,
    stock: 10,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 750000,
    stock: 5,
  },
];

export const findAll = () => products;

export const findById = (id) => {
  return products.find((product) => product.id === id);
};

export const create = (product) => {
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    ...product,
  };

  products.push(newProduct);

  return newProduct;
};

export const update = (id, productData) => {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = {
    id,
    ...productData,
  };

  return products[index];
};

export const remove = (id) => {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  return products.splice(index, 1)[0];
};
