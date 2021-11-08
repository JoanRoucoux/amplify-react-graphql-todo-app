import {
  API,
  graphqlOperation,
} from 'aws-amplify';
import {
  GraphQLResult,
  GRAPHQL_AUTH_MODE,
} from '@aws-amplify/api';

interface IGraphQLOptions {
  input?: object;
  variables?: object;
  authMode?: GRAPHQL_AUTH_MODE;
}

interface ISubscriptionValue<T> {
  value: {
    data: T
  }
}

const callGraphQL = async <T>(
  query: any,
  options?: IGraphQLOptions,
): Promise<GraphQLResult<T>> => (
  await API.graphql(graphqlOperation(query, options))
) as GraphQLResult<T>;

const subscribeGraphQL = <T>(
  subscription: any,
  callback: (value: T) => void,
) =>
    // @ts-ignore
    // eslint-disable-next-line implicit-arrow-linebreak
    API.graphql(graphqlOperation(subscription)).subscribe({
      next: (response: ISubscriptionValue<T>) => callback(response.value.data),
    });

export {
  callGraphQL,
  subscribeGraphQL,
};
