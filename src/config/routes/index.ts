import { Action, Subject } from '../../lib/casl/acl';

type PathArg = {
  id?: string;
  type?: string;
};

export type Route = {
  title: string;
  path?: (pathArg: PathArg | undefined) => `${string}`;
  route: string;
  action: Action;
  subject: Subject;
  fallback?: string;
  /**
   * @param {boolean} [shouldBeAuthenticated=true]- whether to require authentification
   */
  shouldBeAuthenticated?: boolean;
};

type ItemType = {
  key: string;
  Index: Route;
  Detail?: Route;
  Create?: Route;
  Update?: Route;
};

export type RouteType = Record<Subject, ItemType>;

export const Routes: RouteType = {
  // Landing
  Landing_Home: {
    key: '/',
    Index: {
      title: '管理者管理',
      route: '/',
      action: 'read',
      subject: 'Landing_Home',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Landing_Profile: {
    key: '/profile',
    Index: {
      title: '',
      route: '/profile',
      action: 'read',
      subject: 'Landing_Profile',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
  Landing_Collection: {
    key: '',
    Index: {
      title: 'お気に入り管理',
      route: '/collection',
      action: 'read',
      subject: 'Landing_Collection',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'お気に入り管理',
      path: (params) => `/collection/${params?.id}`,
      route: '/collection',
      action: 'read',
      subject: 'Landing_Collection',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
  Landing_Category: {
    key: '',
    Index: {
      title: 'カテゴリー',
      path: (params) => `/category/${params?.id}`,
      route: '/category',
      action: 'read',
      subject: 'Landing_Category',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Landing_More: {
    key: '',
    Index: {
      title: 'もっと',
      route: '/more',
      action: 'read',
      subject: 'Landing_More',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'もっと',
      path: (params) => `/more/${params?.id}`,
      route: '/more',
      action: 'read',
      subject: 'Landing_More',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Landing_Contact: {
    key: '',
    Index: {
      title: 'Contact',
      route: '/contact',
      action: 'create',
      subject: 'Landing_Contact',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Landing_Privacy: {
    key: '',
    Index: {
      title: 'Privacy',
      route: '/privacy',
      action: 'read',
      subject: 'Landing_Privacy',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Landing_Search: {
    key: '',
    Index: {
      title: 'Search',
      route: '/search',
      action: 'read',
      subject: 'Landing_Search',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'Search',
      route: '/search',
      action: 'read',
      subject: 'Landing_Search',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
  Landing_Post: {
    key: '',
    Index: {
      title: 'Post',
      route: '/post',
      action: 'read',
      subject: 'Landing_Post',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'Post',
      route: '/post',
      action: 'read',
      subject: 'Landing_Post',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '管理者管理',
      route: '/post/create',
      action: 'create',
      subject: 'Landing_Post',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '管理者管理',
      path: (params) => `/post/create/${params?.id}`,
      route: '/post/create',
      action: 'update',
      subject: 'Landing_Post',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
  // Admin
  Admin_Header: {
    key: '',
    Index: {
      title: '',
      path: undefined,
      route: '',
      action: 'read',
      subject: 'Admin_Header',
      fallback: undefined,
      shouldBeAuthenticated: undefined,
    },
  },
  Admin_Profile: {
    key: '',
    Index: {
      title: '',
      path: undefined,
      route: '',
      action: 'read',
      subject: 'Admin_Profile',
      fallback: undefined,
      shouldBeAuthenticated: undefined,
    },
  },
  Admin_Dashboard: {
    key: '/admin',
    Index: {
      title: 'Dashboard',
      route: '/admin',
      action: 'read',
      subject: 'Admin_Dashboard',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Member: {
    key: '/admin/member',
    Index: {
      title: '管理者管理',
      route: '/admin/member',
      action: 'read',
      subject: 'Admin_Member',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'プロフィール',
      path: (params) => `/admin/member/${params?.id}`,
      route: '/admin/member',
      action: 'read',
      subject: 'Admin_Member',
      fallback: '/admin/member',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '管理者管理',
      route: '/admin/member/add',
      action: 'create',
      subject: 'Admin_Member',
      fallback: '/admin/member',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '管理者管理',
      path: (params) => `/admin/member/add/${params?.id}`,
      route: '/admin/member/add',
      action: 'update',
      subject: 'Admin_Member',
      fallback: '/admin/member',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Company: {
    key: '/admin/company',
    Index: {
      title: '契約法人会員管理',
      route: '/admin/company',
      action: 'read',
      subject: 'Admin_Company',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'プロフィール',
      path: (params) => `/admin/company/${params?.id}`,
      route: '/admin/company',
      action: 'read',
      subject: 'Admin_Company',
      fallback: '/admin/company',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '契約法人会員管理',
      route: '/admin/company/add',
      action: 'create',
      subject: 'Admin_Company',
      fallback: '/admin/company',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '契約法人会員管理',
      path: (params) => `/admin/company/add/${params?.id}`,
      route: '/admin/company/add',
      action: 'update',
      subject: 'Admin_Company',
      fallback: '/admin/company',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Staff: {
    key: '/admin/staff',
    Index: {
      title: 'スタッフ管理',
      route: '/admin/staff',
      action: 'read',
      subject: 'Admin_Staff',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'プロフィール',
      path: (params) => `/admin/staff/${params?.id}`,
      route: '/admin/staff',
      action: 'read',
      subject: 'Admin_Staff',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: 'スタッフ追加',
      route: '/admin/staff/add',
      action: 'create',
      subject: 'Admin_Staff',
      fallback: '/admin/staff',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: 'スタッフ編集',
      path: (params) => `/admin/staff/add/${params?.id}`,
      route: '/admin/staff/add',
      action: 'update',
      subject: 'Admin_Staff',
      fallback: '/admin/staff',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Facility: {
    key: '/admin/facility',
    Index: {
      title: '施設｜部署管理',
      route: '/admin/facility',
      action: 'read',
      subject: 'Admin_Facility',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Article: {
    key: '/admin/article',
    Index: {
      title: '記事管理',
      route: '/admin/article',
      action: 'read',
      subject: 'Admin_Article',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: '記事管理',
      path: (params) => `/admin/article/${params?.id}`,
      route: '/admin/article',
      action: 'read',
      subject: 'Admin_Article',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '記事管理',
      route: '/admin/article/add',
      action: 'create',
      subject: 'Admin_Article',
      fallback: '/admin/article',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '記事管理',
      path: (params) => `/admin/article/add/${params?.id}`,
      route: '/admin/article/add',
      action: 'update',
      subject: 'Admin_Article',
      fallback: '/admin/article',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Video: {
    key: '/admin/video',
    Index: {
      title: '動画管理',
      route: '/admin/video',
      action: 'read',
      subject: 'Admin_Video',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: '動画管理',
      path: (params) => `/admin/video/${params?.id}`,
      route: '/admin/video',
      action: 'read',
      subject: 'Admin_Video',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '動画管理',
      route: '/admin/video/add',
      action: 'create',
      subject: 'Admin_Video',
      fallback: '/admin/video',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '動画管理',
      path: (params) => `/admin/video/add/${params?.id}`,
      route: '/admin/video/add',
      action: 'update',
      subject: 'Admin_Video',
      fallback: '/admin/video',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Notification: {
    key: '/admin/notification',
    Index: {
      title: 'お知らせ',
      route: '/admin/notification',
      action: 'read',
      subject: 'Admin_Notification',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
  },
  Admin_Collection: {
    key: '/admin/collection',
    Index: {
      title: 'お気に入り',
      route: '/admin/collection',
      action: 'read',
      subject: 'Admin_Collection',
      fallback: '/admin',
      shouldBeAuthenticated: true,
    },
    Detail: {
      title: 'お気に入り',
      path: (params) => `/admin/collection/${params?.id}`,
      route: '/admin/collection',
      action: 'read',
      subject: 'Admin_Collection',
      fallback: '/admin/collection',
      shouldBeAuthenticated: true,
    },
    Create: {
      title: '新規コレクション',
      route: '/admin/collection/add',
      action: 'create',
      subject: 'Admin_Collection',
      fallback: '/admin/collection',
      shouldBeAuthenticated: true,
    },
    Update: {
      title: '新規コレクション',
      path: (params) => `/admin/collection/add/${params?.id}`,
      route: '/admin/collection/add',
      action: 'update',
      subject: 'Admin_Collection',
      fallback: '/admin/collection',
      shouldBeAuthenticated: true,
    },
  },
  Landing_Notification: {
    key: '',
    Index: {
      title: 'お知らせ管理',
      path: undefined,
      route: '/',
      action: 'update',
      subject: 'Landing_Notification',
      fallback: '/',
      shouldBeAuthenticated: false,
    },
  },
  Admin_Header_Notification: {
    key: '',
    Index: {
      title: 'お知らせ管理',
      path: undefined,
      route: '/',
      action: 'update',
      subject: 'Admin_Header_Notification',
      fallback: '/',
      shouldBeAuthenticated: true,
    },
  },
};

export const RouteFinder = (pathname: string, isParams: boolean) => {
  let _child: Route | undefined;
  let _parent: Route | undefined;
  Object.keys(Routes).forEach((subject) => {
    const childObject = Routes[subject as Subject];
    Object.keys(childObject).forEach((action) => {
      if (action && action !== 'key') {
        const object = childObject[action as keyof ItemType] as Route;
        if (!isParams && object?.route === pathname && !object?.path) {
          if (action !== 'Index') _parent = Routes[subject as Subject].Index;
          _child = object;
          return;
        } else if (isParams && object?.route === pathname && object?.path) {
          _child = object;
          return;
        }
      }
    });
  });
  return { ..._child, parent: _parent };
};
