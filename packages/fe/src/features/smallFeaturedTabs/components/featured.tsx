import { ProductCard } from '@/components/productCard';
import { Spinner } from '@/components/ui';
import { useGetFeaturedProducts } from '@/features/smallFeaturedTabs/api/getFeaturedProducts';

export const Featured = () => {
  const getFeaturedProductsQuery = useGetFeaturedProducts();

  if (getFeaturedProductsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!getFeaturedProductsQuery.data) return null;

  const { productsList } = getFeaturedProductsQuery.data;
  console.log(productsList);

  return (
    <div>
      <div className="grid grid-cols-4 items-start gap-4">
        {productsList?.map((item: any) => (
          <ProductCard
            key={item.uuid}
            title={item.title}
            price={item?.price}
            discountPrice={item.discountPrice}
            images={item.images}
            brand={item.brand}
            uuid={item.uuid}
            productId={item.id}
          />
        ))}
      </div>{' '}
    </div>
  );
};
