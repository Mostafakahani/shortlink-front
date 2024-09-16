const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000';
const API_VERSION = 'api';

export const API_CONFIG = {
  baseUrlDirect: 'link.webdevo.dev',
  baseUrl: API_BASE_URL,
  version: API_VERSION,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/${API_VERSION}/auth/login`,
      register: `${API_BASE_URL}/${API_VERSION}/auth/register`,
      logout: `${API_BASE_URL}/${API_VERSION}/auth/logout`,
      refreshToken: `${API_BASE_URL}/${API_VERSION}/auth/refresh-token`,
    },
    route: {
      get: `${API_BASE_URL}/${API_VERSION}/url`,
    },
    user: {
      check: `${API_BASE_URL}/${API_VERSION}/user/get`,
      profile: `${API_BASE_URL}/${API_VERSION}/user/get`,
      notes: `${API_BASE_URL}/${API_VERSION}/note`,
      detailsNote: `${API_BASE_URL}/${API_VERSION}/note`,
      createNote: `${API_BASE_URL}/${API_VERSION}/note/create`,
      removeNote: `${API_BASE_URL}/${API_VERSION}/note/delete`,
      updateNote: `${API_BASE_URL}/${API_VERSION}/note/update`,
      links: `${API_BASE_URL}/${API_VERSION}/url`,
      createLink: `${API_BASE_URL}/${API_VERSION}/url/shorten`,
      createMNormal: `${API_BASE_URL}/${API_VERSION}/url/shortenNormal`,
      detailsLink: `${API_BASE_URL}/${API_VERSION}/url/stats`,
      removeLink: `${API_BASE_URL}/${API_VERSION}/url/link`,
      updateLink: `${API_BASE_URL}/${API_VERSION}/url/link`,
    },
    posts: {
      getAll: `${API_BASE_URL}/${API_VERSION}/posts`,
      getById: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/posts/${id}`,
      create: `${API_BASE_URL}/${API_VERSION}/posts/create`,
      update: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/posts/update/${id}`,
      delete: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/posts/delete/${id}`,
    },
    products: {
      getAll: `${API_BASE_URL}/${API_VERSION}/products`,
      getById: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/products/${id}`,
      create: `${API_BASE_URL}/${API_VERSION}/products/create`,
      update: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/products/update/${id}`,
      delete: (id: string) =>
        `${API_BASE_URL}/${API_VERSION}/products/delete/${id}`,
    },
  },
  headers: {
    contentType: 'application/json',
    authorization: (token: string | null) =>
      `bearer ${
        token ??
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmVOdW1iZXIiOiIwOTE1NDUwODQwMiIsImlhdCI6MTcyNDMzNTYyOSwiZXhwIjoxNzI0NDIyMDI5fQ.nwcJJIEATWQ64VTQnNvLISHOXankSKCzT26xEp3mPzY'
      }`,
  },
};

export default API_CONFIG;
