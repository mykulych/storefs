import httpService from './http.service';

const adsEndpoint = 'ads/';

const adsService = {
  get: async (orderBy, value) => {
    const { data } = await httpService.get(adsEndpoint, {
      params: {
        orderBy: orderBy,
        equalTo: `${value}`,
      },
    });
    return data;
  },
  getById: async (id) => {
    const { data } = await httpService.get(adsEndpoint, {
      params: {
        orderBy: '_id',
        equalTo: `${id}`,
      },
    });
    return data;
  },
  getRecently: async () => {
    const { data } = await httpService.get(adsEndpoint + 'recently');
    return data;
  },
  getCollection: async (payload) => {
    const { data } = await httpService.post(adsEndpoint + 'collection', payload);
    return data;
  },
  getOrders: async () => {
    const { data } = await httpService.get(adsEndpoint + 'orders');
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(adsEndpoint, content);
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(adsEndpoint + payload.id, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(adsEndpoint + id);
    return data;
  },
  sell: async (payload) => {
    const { data } = await httpService.patch(adsEndpoint + 'sell', payload);
    return data;
  },
  cancelSell: async (payload) => {
    const { data } = await httpService.patch(adsEndpoint + 'cancelSell', payload);
    return data;
  },
};

export default adsService;
