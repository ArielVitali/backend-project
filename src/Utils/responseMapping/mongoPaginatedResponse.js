const productMaping = async (response) => {
  if (Array.isArray(response)) {
    return response.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails,
    }));
  } else {
    return {
      id: response._id,
      title: response.title,
      description: response.description,
      code: response.code,
      price: response.price,
      status: response.status,
      stock: response.stock,
      category: response.category,
      thumbnails: response.thumbnails,
    };
  }
};

export default productMaping;
