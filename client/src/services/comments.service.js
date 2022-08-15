import { httpService } from '.';

const commentsEndpoint = 'comments/';

const commentsService = {
  get: async (id) => {
    const { data } = await httpService.get(commentsEndpoint, {
      params: {
        orderBy: 'parentId',
        equalTo: `${id}`,
      },
    });
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(commentsEndpoint, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(commentsEndpoint + id);
    return data;
  },
};

export default commentsService;
