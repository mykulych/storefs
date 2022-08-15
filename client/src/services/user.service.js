import httpService from './http.service';

const userEndpoint = 'users/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload.id, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(userEndpoint + payload.id, payload);
    return data;
  },
  /* getCurrentUser: async () => {
    const { data } = await httpService.get(userEndpoint + getUserId());
    return data;
  }, */
  getUserById: async (id) => {
    const { data } = await httpService.get(userEndpoint + id);
    return data;
  },
};

export default userService;
