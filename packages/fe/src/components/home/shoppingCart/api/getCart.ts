import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Product } from '@/pages/product/types';

export const getCart = (): Promise<Product[]> => {
  return axios.get('cart');
};

type QueryFnType = typeof getCart;

type UseGetCart = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCart = ({ config }: UseGetCart = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });
};
