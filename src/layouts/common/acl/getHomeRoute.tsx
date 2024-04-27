const getHomeRoute = (role: string) => {
  if (role === 'ADMINISTRATOR' || role === 'ADMIN' || role === 'USER')
    return '/admin';
  else return '/';
};

export default getHomeRoute;
