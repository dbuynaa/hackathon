import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AuthVerify = {
  __typename?: 'AuthVerify';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user?: Maybe<MeAuth>;
};

export type Category = {
  __typename?: 'Category';
  children?: Maybe<Array<Maybe<Category>>>;
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  order: Scalars['String']['output'];
  parentCode?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MeAuth = {
  __typename?: 'MeAuth';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRoleEnum>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ValidationDelete?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthVerify>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  productCreate?: Maybe<Product>;
  productDelete?: Maybe<Scalars['Boolean']['output']>;
  refreshAccessToken?: Maybe<AuthVerify>;
  register?: Maybe<AuthVerify>;
  userCreate?: Maybe<User>;
  userDelete?: Maybe<Scalars['Boolean']['output']>;
  userUpdate?: Maybe<User>;
  validationCreate?: Maybe<Validation>;
  validationUpdate?: Maybe<Validation>;
  vendorCreate?: Maybe<Vendor>;
  vendorDelete?: Maybe<Scalars['Boolean']['output']>;
  vendorUpdate?: Maybe<Vendor>;
};


export type MutationValidationDeleteArgs = {
  where: ValidationWhereUniqueInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};


export type MutationProductDeleteArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUserUpdateArgs = {
  id: Scalars['String']['input'];
  input: UserUpdateInput;
};


export type MutationValidationCreateArgs = {
  input: ValidationCreateInput;
};


export type MutationValidationUpdateArgs = {
  id: Scalars['String']['input'];
  input: ValidationCreateInput;
};


export type MutationVendorCreateArgs = {
  input: VendorCreateInput;
};


export type MutationVendorDeleteArgs = {
  where: VendorWhereUniqueInput;
};


export type MutationVendorUpdateArgs = {
  id: Scalars['String']['input'];
  input: VendorUpdateInput;
};

export type Product = {
  __typename?: 'Product';
  Vendor?: Maybe<Vendor>;
  auditer?: Maybe<User>;
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status?: Maybe<Status>;
};

export type ProductCreateInput = {
  children?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['String']['input']>;
};

export type ProductWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type Products = {
  __typename?: 'Products';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Product>>;
};

export type ProductsWhereInput = {
  child?: InputMaybe<Array<Scalars['String']['input']>>;
  parent?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  Validations?: Maybe<Validations>;
  categories?: Maybe<Array<Category>>;
  meAuth?: Maybe<MeAuth>;
  product?: Maybe<Product>;
  products?: Maybe<Products>;
  user?: Maybe<User>;
  users?: Maybe<Users>;
  validation?: Maybe<Validation>;
  vendor?: Maybe<Vendor>;
  vendors?: Maybe<Vendors>;
};


export type QueryValidationsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  where?: InputMaybe<ProductsWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryValidationArgs = {
  where: ValidationWhereUniqueInput;
};


export type QueryVendorArgs = {
  where: VendorWhereUniqueInput;
};


export type QueryVendorsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRoleEnum;
};

export enum Status {
  PENDING = 'PENDING',
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roleKey: Scalars['String']['output'];
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roleKey: UserRoleEnum;
};

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF'
}

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roleKey?: InputMaybe<UserRoleEnum>;
};

export type UserWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type Users = {
  __typename?: 'Users';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<User>>;
};

export type Validation = {
  __typename?: 'Validation';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Array<Maybe<Product>>>;
};

export type ValidationCreateInput = {
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  productsId?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ValidationWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type Validations = {
  __typename?: 'Validations';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Validation>>;
};

export type Vendor = {
  __typename?: 'Vendor';
  contact: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type VendorCreateInput = {
  contact: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type VendorUpdateInput = {
  contact?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type VendorWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type Vendors = {
  __typename?: 'Vendors';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Vendor>>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthVerify', accessToken: string, refreshToken: string, user?: { __typename?: 'MeAuth', id: string, image?: string | null, name?: string | null, role?: UserRoleEnum | null } | null } | null };

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken?: { __typename?: 'AuthVerify', accessToken: string, refreshToken: string } | null };

export type MeAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type MeAuthQuery = { __typename?: 'Query', meAuth?: { __typename?: 'MeAuth', id: string, image?: string | null, name?: string | null, role?: UserRoleEnum | null } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, code: string, order: string, parentCode?: string | null, children?: Array<{ __typename?: 'Category', code: string, name: string, nameEn: string, order: string, parentCode?: string | null } | null> | null }> | null };

export type ProductCreateMutationVariables = Exact<{
  input: ProductCreateInput;
}>;


export type ProductCreateMutation = { __typename?: 'Mutation', productCreate?: { __typename?: 'Product', id: string } | null };

export type ProductDeleteMutationVariables = Exact<{
  where: ProductWhereUniqueInput;
}>;


export type ProductDeleteMutation = { __typename?: 'Mutation', productDelete?: boolean | null };

export type ProductsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<ProductsWhereInput>;
}>;


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'Products', count?: number | null, data?: Array<{ __typename?: 'Product', status?: Status | null, createdAt: any, description: string, id: string, image?: string | null, name: string, auditer?: { __typename?: 'User', id: string, roleKey: string, name?: string | null, email: string } | null, categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, order: string } | null> | null }> | null } | null };

export type ProductQueryVariables = Exact<{
  where: ProductWhereUniqueInput;
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', status?: Status | null, name: string, image?: string | null, id: string, description: string, createdAt: any, auditer?: { __typename?: 'User', name?: string | null, roleKey: string, email: string } | null, categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, code: string } | null> | null, Vendor?: { __typename?: 'Vendor', id: string } | null } | null };

export type ValidationCreateMutationVariables = Exact<{
  input: ValidationCreateInput;
}>;


export type ValidationCreateMutation = { __typename?: 'Mutation', validationCreate?: { __typename?: 'Validation', id: string } | null };

export type ValidationUpdateMutationVariables = Exact<{
  validationUpdateId: Scalars['String']['input'];
  input: ValidationCreateInput;
}>;


export type ValidationUpdateMutation = { __typename?: 'Mutation', validationUpdate?: { __typename?: 'Validation', id: string } | null };

export type ValidationsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type ValidationsQuery = { __typename?: 'Query', Validations?: { __typename?: 'Validations', count?: number | null, data?: Array<{ __typename?: 'Validation', id: string, image?: string | null, content: string, author?: { __typename?: 'User', id: string, name?: string | null, email: string } | null, product?: Array<{ __typename?: 'Product', id: string, image?: string | null, name: string, status?: Status | null } | null> | null }> | null } | null };

export type ValidationQueryVariables = Exact<{
  where: ValidationWhereUniqueInput;
}>;


export type ValidationQuery = { __typename?: 'Query', validation?: { __typename?: 'Validation', id: string, image?: string | null, content: string, author?: { __typename?: 'User', id: string, name?: string | null, email: string } | null, product?: Array<{ __typename?: 'Product', id: string, image?: string | null, name: string, status?: Status | null } | null> | null } | null };

export type VendorCreateMutationVariables = Exact<{
  input: VendorCreateInput;
}>;


export type VendorCreateMutation = { __typename?: 'Mutation', vendorCreate?: { __typename?: 'Vendor', id: string, email: string, contact: string, name: string } | null };

export type VendorUpdateMutationVariables = Exact<{
  vendorUpdateId: Scalars['String']['input'];
  input: VendorUpdateInput;
}>;


export type VendorUpdateMutation = { __typename?: 'Mutation', vendorUpdate?: { __typename?: 'Vendor', id: string } | null };

export type VendorDeleteMutationVariables = Exact<{
  where: VendorWhereUniqueInput;
}>;


export type VendorDeleteMutation = { __typename?: 'Mutation', vendorDelete?: boolean | null };

export type VendorsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type VendorsQuery = { __typename?: 'Query', vendors?: { __typename?: 'Vendors', count?: number | null, data?: Array<{ __typename?: 'Vendor', name: string, contact: string, email: string }> | null } | null };

export type VendorQueryVariables = Exact<{
  where: VendorWhereUniqueInput;
}>;


export type VendorQuery = { __typename?: 'Query', vendor?: { __typename?: 'Vendor', id: string, email: string, name: string, contact: string } | null };


export const LoginDocument = gql`
    mutation LOGIN($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      image
      name
      role
    }
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation refreshAccessToken {
  refreshAccessToken {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, options);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const MeAuthDocument = gql`
    query meAuth {
  meAuth {
    id
    image
    name
    role
  }
}
    `;

/**
 * __useMeAuthQuery__
 *
 * To run a query within a React component, call `useMeAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeAuthQuery(baseOptions?: Apollo.QueryHookOptions<MeAuthQuery, MeAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeAuthQuery, MeAuthQueryVariables>(MeAuthDocument, options);
      }
export function useMeAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeAuthQuery, MeAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeAuthQuery, MeAuthQueryVariables>(MeAuthDocument, options);
        }
export type MeAuthQueryHookResult = ReturnType<typeof useMeAuthQuery>;
export type MeAuthLazyQueryHookResult = ReturnType<typeof useMeAuthLazyQuery>;
export type MeAuthQueryResult = Apollo.QueryResult<MeAuthQuery, MeAuthQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    name
    nameEn
    code
    order
    parentCode
    children {
      code
      name
      nameEn
      order
      parentCode
    }
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const ProductCreateDocument = gql`
    mutation ProductCreate($input: ProductCreateInput!) {
  productCreate(input: $input) {
    id
  }
}
    `;
export type ProductCreateMutationFn = Apollo.MutationFunction<ProductCreateMutation, ProductCreateMutationVariables>;

/**
 * __useProductCreateMutation__
 *
 * To run a mutation, you first call `useProductCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productCreateMutation, { data, loading, error }] = useProductCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProductCreateMutation, ProductCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductCreateMutation, ProductCreateMutationVariables>(ProductCreateDocument, options);
      }
export type ProductCreateMutationHookResult = ReturnType<typeof useProductCreateMutation>;
export type ProductCreateMutationResult = Apollo.MutationResult<ProductCreateMutation>;
export type ProductCreateMutationOptions = Apollo.BaseMutationOptions<ProductCreateMutation, ProductCreateMutationVariables>;
export const ProductDeleteDocument = gql`
    mutation ProductDelete($where: ProductWhereUniqueInput!) {
  productDelete(where: $where)
}
    `;
export type ProductDeleteMutationFn = Apollo.MutationFunction<ProductDeleteMutation, ProductDeleteMutationVariables>;

/**
 * __useProductDeleteMutation__
 *
 * To run a mutation, you first call `useProductDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productDeleteMutation, { data, loading, error }] = useProductDeleteMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProductDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ProductDeleteMutation, ProductDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProductDeleteMutation, ProductDeleteMutationVariables>(ProductDeleteDocument, options);
      }
export type ProductDeleteMutationHookResult = ReturnType<typeof useProductDeleteMutation>;
export type ProductDeleteMutationResult = Apollo.MutationResult<ProductDeleteMutation>;
export type ProductDeleteMutationOptions = Apollo.BaseMutationOptions<ProductDeleteMutation, ProductDeleteMutationVariables>;
export const ProductsDocument = gql`
    query Products($take: Int!, $skip: Int!, $where: ProductsWhereInput) {
  products(take: $take, skip: $skip, where: $where) {
    data {
      auditer {
        id
        roleKey
        name
        email
      }
      categories {
        name
        nameEn
        order
      }
      status
      createdAt
      description
      id
      image
      name
    }
    count
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProductsQuery(baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($where: ProductWhereUniqueInput!) {
  product(where: $where) {
    auditer {
      name
      roleKey
      email
    }
    categories {
      name
      nameEn
      code
    }
    status
    name
    image
    id
    description
    createdAt
    Vendor {
      id
    }
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ValidationCreateDocument = gql`
    mutation ValidationCreate($input: ValidationCreateInput!) {
  validationCreate(input: $input) {
    id
  }
}
    `;
export type ValidationCreateMutationFn = Apollo.MutationFunction<ValidationCreateMutation, ValidationCreateMutationVariables>;

/**
 * __useValidationCreateMutation__
 *
 * To run a mutation, you first call `useValidationCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidationCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validationCreateMutation, { data, loading, error }] = useValidationCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidationCreateMutation(baseOptions?: Apollo.MutationHookOptions<ValidationCreateMutation, ValidationCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidationCreateMutation, ValidationCreateMutationVariables>(ValidationCreateDocument, options);
      }
export type ValidationCreateMutationHookResult = ReturnType<typeof useValidationCreateMutation>;
export type ValidationCreateMutationResult = Apollo.MutationResult<ValidationCreateMutation>;
export type ValidationCreateMutationOptions = Apollo.BaseMutationOptions<ValidationCreateMutation, ValidationCreateMutationVariables>;
export const ValidationUpdateDocument = gql`
    mutation ValidationUpdate($validationUpdateId: String!, $input: ValidationCreateInput!) {
  validationUpdate(id: $validationUpdateId, input: $input) {
    id
  }
}
    `;
export type ValidationUpdateMutationFn = Apollo.MutationFunction<ValidationUpdateMutation, ValidationUpdateMutationVariables>;

/**
 * __useValidationUpdateMutation__
 *
 * To run a mutation, you first call `useValidationUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidationUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validationUpdateMutation, { data, loading, error }] = useValidationUpdateMutation({
 *   variables: {
 *      validationUpdateId: // value for 'validationUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidationUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ValidationUpdateMutation, ValidationUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidationUpdateMutation, ValidationUpdateMutationVariables>(ValidationUpdateDocument, options);
      }
export type ValidationUpdateMutationHookResult = ReturnType<typeof useValidationUpdateMutation>;
export type ValidationUpdateMutationResult = Apollo.MutationResult<ValidationUpdateMutation>;
export type ValidationUpdateMutationOptions = Apollo.BaseMutationOptions<ValidationUpdateMutation, ValidationUpdateMutationVariables>;
export const ValidationsDocument = gql`
    query Validations($take: Int!, $skip: Int!) {
  Validations(take: $take, skip: $skip) {
    count
    data {
      id
      image
      author {
        id
        name
        email
      }
      content
      product {
        id
        image
        name
        status
      }
    }
  }
}
    `;

/**
 * __useValidationsQuery__
 *
 * To run a query within a React component, call `useValidationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidationsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useValidationsQuery(baseOptions: Apollo.QueryHookOptions<ValidationsQuery, ValidationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidationsQuery, ValidationsQueryVariables>(ValidationsDocument, options);
      }
export function useValidationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidationsQuery, ValidationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidationsQuery, ValidationsQueryVariables>(ValidationsDocument, options);
        }
export type ValidationsQueryHookResult = ReturnType<typeof useValidationsQuery>;
export type ValidationsLazyQueryHookResult = ReturnType<typeof useValidationsLazyQuery>;
export type ValidationsQueryResult = Apollo.QueryResult<ValidationsQuery, ValidationsQueryVariables>;
export const ValidationDocument = gql`
    query Validation($where: ValidationWhereUniqueInput!) {
  validation(where: $where) {
    id
    image
    author {
      id
      name
      email
    }
    content
    product {
      id
      image
      name
      status
    }
  }
}
    `;

/**
 * __useValidationQuery__
 *
 * To run a query within a React component, call `useValidationQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useValidationQuery(baseOptions: Apollo.QueryHookOptions<ValidationQuery, ValidationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidationQuery, ValidationQueryVariables>(ValidationDocument, options);
      }
export function useValidationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidationQuery, ValidationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidationQuery, ValidationQueryVariables>(ValidationDocument, options);
        }
export type ValidationQueryHookResult = ReturnType<typeof useValidationQuery>;
export type ValidationLazyQueryHookResult = ReturnType<typeof useValidationLazyQuery>;
export type ValidationQueryResult = Apollo.QueryResult<ValidationQuery, ValidationQueryVariables>;
export const VendorCreateDocument = gql`
    mutation VendorCreate($input: VendorCreateInput!) {
  vendorCreate(input: $input) {
    id
    email
    contact
    name
  }
}
    `;
export type VendorCreateMutationFn = Apollo.MutationFunction<VendorCreateMutation, VendorCreateMutationVariables>;

/**
 * __useVendorCreateMutation__
 *
 * To run a mutation, you first call `useVendorCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVendorCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vendorCreateMutation, { data, loading, error }] = useVendorCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVendorCreateMutation(baseOptions?: Apollo.MutationHookOptions<VendorCreateMutation, VendorCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VendorCreateMutation, VendorCreateMutationVariables>(VendorCreateDocument, options);
      }
export type VendorCreateMutationHookResult = ReturnType<typeof useVendorCreateMutation>;
export type VendorCreateMutationResult = Apollo.MutationResult<VendorCreateMutation>;
export type VendorCreateMutationOptions = Apollo.BaseMutationOptions<VendorCreateMutation, VendorCreateMutationVariables>;
export const VendorUpdateDocument = gql`
    mutation VendorUpdate($vendorUpdateId: String!, $input: VendorUpdateInput!) {
  vendorUpdate(id: $vendorUpdateId, input: $input) {
    id
  }
}
    `;
export type VendorUpdateMutationFn = Apollo.MutationFunction<VendorUpdateMutation, VendorUpdateMutationVariables>;

/**
 * __useVendorUpdateMutation__
 *
 * To run a mutation, you first call `useVendorUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVendorUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vendorUpdateMutation, { data, loading, error }] = useVendorUpdateMutation({
 *   variables: {
 *      vendorUpdateId: // value for 'vendorUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVendorUpdateMutation(baseOptions?: Apollo.MutationHookOptions<VendorUpdateMutation, VendorUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VendorUpdateMutation, VendorUpdateMutationVariables>(VendorUpdateDocument, options);
      }
export type VendorUpdateMutationHookResult = ReturnType<typeof useVendorUpdateMutation>;
export type VendorUpdateMutationResult = Apollo.MutationResult<VendorUpdateMutation>;
export type VendorUpdateMutationOptions = Apollo.BaseMutationOptions<VendorUpdateMutation, VendorUpdateMutationVariables>;
export const VendorDeleteDocument = gql`
    mutation VendorDelete($where: VendorWhereUniqueInput!) {
  vendorDelete(where: $where)
}
    `;
export type VendorDeleteMutationFn = Apollo.MutationFunction<VendorDeleteMutation, VendorDeleteMutationVariables>;

/**
 * __useVendorDeleteMutation__
 *
 * To run a mutation, you first call `useVendorDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVendorDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vendorDeleteMutation, { data, loading, error }] = useVendorDeleteMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVendorDeleteMutation(baseOptions?: Apollo.MutationHookOptions<VendorDeleteMutation, VendorDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VendorDeleteMutation, VendorDeleteMutationVariables>(VendorDeleteDocument, options);
      }
export type VendorDeleteMutationHookResult = ReturnType<typeof useVendorDeleteMutation>;
export type VendorDeleteMutationResult = Apollo.MutationResult<VendorDeleteMutation>;
export type VendorDeleteMutationOptions = Apollo.BaseMutationOptions<VendorDeleteMutation, VendorDeleteMutationVariables>;
export const VendorsDocument = gql`
    query Vendors($take: Int!, $skip: Int!) {
  vendors(take: $take, skip: $skip) {
    count
    data {
      name
      contact
      email
    }
  }
}
    `;

/**
 * __useVendorsQuery__
 *
 * To run a query within a React component, call `useVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useVendorsQuery(baseOptions: Apollo.QueryHookOptions<VendorsQuery, VendorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VendorsQuery, VendorsQueryVariables>(VendorsDocument, options);
      }
export function useVendorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VendorsQuery, VendorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VendorsQuery, VendorsQueryVariables>(VendorsDocument, options);
        }
export type VendorsQueryHookResult = ReturnType<typeof useVendorsQuery>;
export type VendorsLazyQueryHookResult = ReturnType<typeof useVendorsLazyQuery>;
export type VendorsQueryResult = Apollo.QueryResult<VendorsQuery, VendorsQueryVariables>;
export const VendorDocument = gql`
    query Vendor($where: VendorWhereUniqueInput!) {
  vendor(where: $where) {
    id
    email
    name
    contact
  }
}
    `;

/**
 * __useVendorQuery__
 *
 * To run a query within a React component, call `useVendorQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVendorQuery(baseOptions: Apollo.QueryHookOptions<VendorQuery, VendorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VendorQuery, VendorQueryVariables>(VendorDocument, options);
      }
export function useVendorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VendorQuery, VendorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VendorQuery, VendorQueryVariables>(VendorDocument, options);
        }
export type VendorQueryHookResult = ReturnType<typeof useVendorQuery>;
export type VendorLazyQueryHookResult = ReturnType<typeof useVendorLazyQuery>;
export type VendorQueryResult = Apollo.QueryResult<VendorQuery, VendorQueryVariables>;