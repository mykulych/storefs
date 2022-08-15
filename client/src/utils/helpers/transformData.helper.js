export function transformFirebaseData(data) {
  return data && !data.id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}

export function transformMongodbData(data) {
  if (!Array.isArray(data)) {
    if (data && data._id) {
      const newData = {
        ...data,
        id: data._id,
      };
      delete newData._id;
      return newData;
    }
  } else {
    return Object.keys(data).map((item) => {
      const newItem = {
        ...data[item],
        id: data[item]._id,
      };
      delete newItem._id;
      return newItem;
    });
  }
  return data;
}
