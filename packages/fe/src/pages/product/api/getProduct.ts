import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Product } from '../types';

// import { User } from '../types';

export const getProduct = ({
  productUuid,
}: {
  productUuid: string;
}): Promise<Product> => {
  return axios.get(`/products/${productUuid}`);
};

type QueryFnType = typeof getProduct;

type UseProductOptions = {
  productUuid: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProduct = ({ productUuid, config }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['product', productUuid],
    queryFn: () => getProduct({ productUuid }),
  });
};
