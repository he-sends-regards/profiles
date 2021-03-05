export const AppRoute = {
  ROOT: '/',
  AUTH: '/auth',
  ACCOUNT: '/account',
};

export const APIRoute = {
  AUTH: '/api/auth',
  GET_USERS: '/api/users',
  DASHBOARD: '/api/users/dashboard',
  DELETE_USER: '/api/users/delete',
  GET_PROFILES: '/api/profiles',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
};

export const HTTPStatus = {
  OK: 200,
};

export const ProfileFormType = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const MenuItem = {
  MY_PROFILES: {
    id: 'MyProfiles',
    name: 'My profiles',
  },
  PROFILES_NETWORK: {
    id: 'ProfilesNetwork',
    name: 'Profiles network',
  },
  USERS_NETWORK: {
    id: 'UsersNetwork',
    name: 'Users network',
  },
  DASHBOARD: {
    id: 'Dashboard',
    name: 'Dashboard',
  },
};
