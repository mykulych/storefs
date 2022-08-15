import httpService from './http.service';

const constantsEndpoint = 'constants/';

const constantsService = {
  getCategories: async () => {
    const { data } = await httpService.get(constantsEndpoint + 'categories');
    return data;
  },
  getSubcategoriesByParentId: async (id) => {
    const { data } = await httpService.get(constantsEndpoint + 'subcategories', {
      params: {
        orderBy: 'parent_id',
        equalTo: `${id}`,
      },
    });
    return data;
  },
  getSubcategories: async () => {
    const { data } = await httpService.get(constantsEndpoint + 'subcategories');
    return data;
  },
  updateSubcategory: async (payload) => {
    console.log('servis payload: ', payload);
    const { data } = await httpService.patch(constantsEndpoint + 'subcategories/' + payload.id, payload);
    return data;
  },
};

export default constantsService;
