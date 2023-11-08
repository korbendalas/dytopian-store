import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { ProductsPaginated } from '@/components/home/smallFeaturedTabs/types';
export const getFeaturedProducts = (): Promise<ProductsPaginated> => {
  return axios.get('products/featured?limit=20&offset=1');
};

type QueryFnType = typeof getFeaturedProducts;

type UseGetFeaturedProducts = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetFeaturedProducts = ({
  config,
}: UseGetFeaturedProducts = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['featuredProducts'],
    queryFn: () => getFeaturedProducts(),
  });
};
