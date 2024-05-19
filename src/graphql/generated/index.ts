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
  categoryCode?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  order: Scalars['String']['output'];
  subCategory?: Maybe<Array<Maybe<Category>>>;
};

export type Companies = {
  __typename?: 'Companies';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Company>>;
};

export type Company = {
  __typename?: 'Company';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CompanyCreateInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CompanyWhereUniqueInput = {
  id: Scalars['String']['input'];
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
  companyCreate?: Maybe<Company>;
  companyDelete?: Maybe<Scalars['Boolean']['output']>;
  companyUpdate?: Maybe<Company>;
  login?: Maybe<AuthVerify>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  productCreate?: Maybe<Product>;
  productDelete?: Maybe<Scalars['Boolean']['output']>;
  refreshAccessToken?: Maybe<AuthVerify>;
  register?: Maybe<AuthVerify>;
  userCreate?: Maybe<User>;
  userDelete?: Maybe<Scalars['Boolean']['output']>;
  userUpdate?: Maybe<User>;
};


export type MutationCompanyCreateArgs = {
  input: CompanyCreateInput;
};


export type MutationCompanyDeleteArgs = {
  where: CompanyWhereUniqueInput;
};


export type MutationCompanyUpdateArgs = {
  id: Scalars['String']['input'];
  input: CompanyUpdateInput;
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

export type Product = {
  __typename?: 'Product';
  author?: Maybe<User>;
  categories?: Maybe<Array<Maybe<Category>>>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status?: Maybe<ProductStatusEnum>;
};

export type ProductCreateInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subCategory?: InputMaybe<Scalars['String']['input']>;
};

export enum ProductStatusEnum {
  DELETED = 'DELETED',
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

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
  categories?: Maybe<Array<Category>>;
  companies?: Maybe<Companies>;
  company?: Maybe<Company>;
  meAuth?: Maybe<MeAuth>;
  product?: Maybe<Product>;
  products?: Maybe<Products>;
  user?: Maybe<User>;
  users?: Maybe<Users>;
};


export type QueryCompaniesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryCompanyArgs = {
  where: CompanyWhereUniqueInput;
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

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRoleEnum;
};

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
  COMPANY_MANAGER = 'COMPANY_MANAGER',
  COMPANY_OWNER = 'COMPANY_OWNER',
  COMPANY_STUFF = 'COMPANY_STUFF',
  CUSTOMER = 'CUSTOMER',
  EDITOR = 'EDITOR'
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthVerify', accessToken: string, refreshToken: string, user?: { __typename?: 'MeAuth', id: string, image?: string | null, name?: string | null, role?: UserRoleEnum | null } | null } | null };

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken?: { __typename?: 'AuthVerify', accessToken: string, refreshToken: string } | null };

export type MeAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type MeAuthQuery = { __typename?: 'Query', meAuth?: { __typename?: 'MeAuth', id: string, image?: string | null, name?: string | null, role?: UserRoleEnum | null } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, code: string, order: string, categoryCode?: string | null, subCategory?: Array<{ __typename?: 'Category', code: string, name: string, nameEn: string, order: string, categoryCode?: string | null } | null> | null }> | null };

export type CompanyCreateMutationVariables = Exact<{
  input: CompanyCreateInput;
}>;


export type CompanyCreateMutation = { __typename?: 'Mutation', companyCreate?: { __typename?: 'Company', id: string } | null };

export type CompanyUpdateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: CompanyUpdateInput;
}>;


export type CompanyUpdateMutation = { __typename?: 'Mutation', companyUpdate?: { __typename?: 'Company', id: string } | null };

export type CompanyDeleteMutationVariables = Exact<{
  where: CompanyWhereUniqueInput;
}>;


export type CompanyDeleteMutation = { __typename?: 'Mutation', companyDelete?: boolean | null };

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


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'Products', count?: number | null, data?: Array<{ __typename?: 'Product', image?: string | null, id: string, name: string, status?: ProductStatusEnum | null, description: string, createdAt: any, author?: { __typename?: 'User', name?: string | null, email: string, id: string } | null, categories?: Array<{ __typename?: 'Category', code: string, name: string, nameEn: string, id: string } | null> | null }> | null } | null };

export type ProductQueryVariables = Exact<{
  where: ProductWhereUniqueInput;
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, image?: string | null, description: string, status?: ProductStatusEnum | null, createdAt: any, author?: { __typename?: 'User', id: string, email: string, name?: string | null } | null, categories?: Array<{ __typename?: 'Category', name: string, nameEn: string, id: string, code: string } | null> | null } | null };


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
    categoryCode
    subCategory {
      code
      name
      nameEn
      order
      categoryCode
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
export const CompanyCreateDocument = gql`
    mutation companyCreate($input: CompanyCreateInput!) {
  companyCreate(input: $input) {
    id
  }
}
    `;
export type CompanyCreateMutationFn = Apollo.MutationFunction<CompanyCreateMutation, CompanyCreateMutationVariables>;

/**
 * __useCompanyCreateMutation__
 *
 * To run a mutation, you first call `useCompanyCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyCreateMutation, { data, loading, error }] = useCompanyCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompanyCreateMutation(baseOptions?: Apollo.MutationHookOptions<CompanyCreateMutation, CompanyCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompanyCreateMutation, CompanyCreateMutationVariables>(CompanyCreateDocument, options);
      }
export type CompanyCreateMutationHookResult = ReturnType<typeof useCompanyCreateMutation>;
export type CompanyCreateMutationResult = Apollo.MutationResult<CompanyCreateMutation>;
export type CompanyCreateMutationOptions = Apollo.BaseMutationOptions<CompanyCreateMutation, CompanyCreateMutationVariables>;
export const CompanyUpdateDocument = gql`
    mutation companyUpdate($id: String!, $input: CompanyUpdateInput!) {
  companyUpdate(id: $id, input: $input) {
    id
  }
}
    `;
export type CompanyUpdateMutationFn = Apollo.MutationFunction<CompanyUpdateMutation, CompanyUpdateMutationVariables>;

/**
 * __useCompanyUpdateMutation__
 *
 * To run a mutation, you first call `useCompanyUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyUpdateMutation, { data, loading, error }] = useCompanyUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompanyUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CompanyUpdateMutation, CompanyUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompanyUpdateMutation, CompanyUpdateMutationVariables>(CompanyUpdateDocument, options);
      }
export type CompanyUpdateMutationHookResult = ReturnType<typeof useCompanyUpdateMutation>;
export type CompanyUpdateMutationResult = Apollo.MutationResult<CompanyUpdateMutation>;
export type CompanyUpdateMutationOptions = Apollo.BaseMutationOptions<CompanyUpdateMutation, CompanyUpdateMutationVariables>;
export const CompanyDeleteDocument = gql`
    mutation companyDelete($where: CompanyWhereUniqueInput!) {
  companyDelete(where: $where)
}
    `;
export type CompanyDeleteMutationFn = Apollo.MutationFunction<CompanyDeleteMutation, CompanyDeleteMutationVariables>;

/**
 * __useCompanyDeleteMutation__
 *
 * To run a mutation, you first call `useCompanyDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyDeleteMutation, { data, loading, error }] = useCompanyDeleteMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCompanyDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CompanyDeleteMutation, CompanyDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompanyDeleteMutation, CompanyDeleteMutationVariables>(CompanyDeleteDocument, options);
      }
export type CompanyDeleteMutationHookResult = ReturnType<typeof useCompanyDeleteMutation>;
export type CompanyDeleteMutationResult = Apollo.MutationResult<CompanyDeleteMutation>;
export type CompanyDeleteMutationOptions = Apollo.BaseMutationOptions<CompanyDeleteMutation, CompanyDeleteMutationVariables>;
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
    count
    data {
      author {
        name
        email
        id
      }
      image
      id
      name
      status
      description
      createdAt
      categories {
        code
        name
        nameEn
        id
      }
    }
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
    id
    name
    image
    description
    status
    author {
      id
      email
      name
    }
    categories {
      name
      nameEn
      id
      code
    }
    createdAt
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