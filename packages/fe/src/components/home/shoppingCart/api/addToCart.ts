import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Product } from '@/pages/product/types';

export type AddToCartDTO = {
  data: {
    productId: number;
    quantity: number;
  };
};

export const addToCart = ({ data }: AddToCartDTO): Promise<Product> => {
  return axios.post(`/cart`, data);
};

type UseCreateAddToCartOptions = {
  config?: MutationConfig<typeof addToCart>;
};

export const useAddToCart = ({ config }: UseCreateAddToCartOptions = {}) => {
  return useMutation({
    onMutate: async (newCartItem) => {
      await queryClient.cancelQueries('cart');

      const previousCartItems = queryClient.getQueryData<Product[]>('cart');

      queryClient.setQueryData('cart', [
        ...(previousCartItems || []),
        previousCartItems,
      ]);

      return { previousCartItems };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCartItems) {
        queryClient.setQueryData('cart', context.previousCartItems);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
    ...config,
    mutationFn: addToCart,
  });
};
