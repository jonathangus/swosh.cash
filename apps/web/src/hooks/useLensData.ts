import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

const queryOne = gql`
  query Following($address: EthereumAddress!) {
    following(request: { address: $address, limit: 50 }) {
      items {
        profile {
          id
          name
          address: ownedBy
          handle
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

const useLensData = (address?: string) => {
  const followingQuery = useQuery(
    [address, 'following'],
    async () => {
      const res: any = await request('https://api.lens.dev/', queryOne, {
        address: address,
      });
      return res.following.items;
    },
    {
      enabled: Boolean(address),
    }
  );

  return {
    items: followingQuery.data || [],
  };
};

export default useLensData;
