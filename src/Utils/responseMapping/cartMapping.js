const cartMapping = (data) => {
  return {
    id: data._id,
    products: data.products.map((productEntry) => ({
      title: productEntry.product.title,
      quantity: productEntry.quantity,
    })),
  };
};

export default cartMapping;
