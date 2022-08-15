const checkCartHelper = (accountData, payload) => {
  let newData;
  if (accountData.cart && accountData.cart.includes(payload)) {
    const filteredCart = accountData.cart.filter((x) => x !== payload);
    newData = {
      ...accountData,
      cart: filteredCart,
    };
  } else if (accountData.cart) {
    newData = {
      ...accountData,
      cart: [...accountData.cart, payload],
    };
  } else {
    newData = {
      ...accountData,
      cart: [payload],
    };
  }

  return newData;
};

const checkWishlistHelper = (accountData, payload) => {
  let newData;
  if (accountData.wishlist && accountData.wishlist.includes(payload)) {
    const filteredWishlist = accountData.wishlist.filter((x) => x !== payload);
    newData = {
      ...accountData,
      wishlist: filteredWishlist,
    };
  } else if (accountData.wishlist) {
    newData = {
      ...accountData,
      wishlist: [...accountData.wishlist, payload],
    };
  } else {
    newData = {
      ...accountData,
      wishlist: [payload],
    };
  }
  return newData;
};

export { checkCartHelper, checkWishlistHelper };
