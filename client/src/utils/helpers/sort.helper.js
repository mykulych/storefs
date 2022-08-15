const sortHelper = (arr) => {
  return arr.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });
};

export default sortHelper;
