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
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  order: Scalars['String']['output'];
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
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ProductCreateInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  vendorId: Scalars['String']['input'];
};

export type ProductWhereUniqueInput = {
  id: Scalars['String']['input'];
};

export type Products = {
  __typename?: 'Products';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Product>>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  meAuth?: Maybe<MeAuth>;
  product?: Maybe<Product>;
  products?: Maybe<Products>;
  user?: Maybe<User>;
  users?: Maybe<Users>;
  vendor?: Maybe<Vendor>;
  vendors?: Maybe<Vendors>;
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
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
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ValidationCreateInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  title: Scalars['String']['input'];
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
  status?: Maybe<Status>;
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


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, code: string, order: string }> | null };

export type ProductsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'Products', count?: number | null, data?: Array<{ __typename?: 'Product', createdAt: any, description: string, id: string, image: string, name: string, auditer?: { __typename?: 'User', id: string, roleKey: string, name?: string | null, email: string } | null, categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, order: string } | null> | null }> | null } | null };

export type VendorCreateMutationVariables = Exact<{
  input: VendorCreateInput;
}>;


export type VendorCreateMutation = { __typename?: 'Mutation', vendorCreate?: { __typename?: 'Vendor', id: string, email: string, contact: string, name: string, status?: Status | null } | null };

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


export type VendorsQuery = { __typename?: 'Query', vendors?: { __typename?: 'Vendors', count?: number | null, data?: Array<{ __typename?: 'Vendor', name: string, contact: string, email: string, status?: Status | null }> | null } | null };

export type VendorQueryVariables = Exact<{
  where: VendorWhereUniqueInput;
}>;


export type VendorQuery = { __typename?: 'Query', vendor?: { __typename?: 'Vendor', id: string, email: string, name: string, status?: Status | null, contact: string } | null };


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
export const ProductsDocument = gql`
    query Products($take: Int!, $skip: Int!) {
  products(take: $take, skip: $skip) {
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
export const VendorCreateDocument = gql`
    mutation VendorCreate($input: VendorCreateInput!) {
  vendorCreate(input: $input) {
    id
    email
    contact
    name
    status
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
      status
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
    status
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