import { Spinner } from '@/components/ui';
import { PageWrap } from '@/components/wrap/pageWrap';
import { useProduct } from '@/pages/product/api/getProduct';
import {
  ProductCarousel,
  ProductOptionsWidget,
  ProductSmallDescription,
} from '@/pages/product/components';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) return null;

  const getProductQuery = useProduct({
    productUuid: uuid,
  });

  if (getProductQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!getProductQuery.data) {
    // Handle case where data is null
    return null;
  }
  console.log('data', getProductQuery.data);
  const { data } = getProductQuery;
  return (
    <PageWrap>
      <div>
        <div>
          Home {'>'} Accessories {'>'} Faxtex Product Sample
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row">
            Gornja polovina
            <ProductCarousel images={data?.images} />
            <ProductSmallDescription />
            <ProductOptionsWidget />
          </div>
          <div className="flex flex-row">Donja polovina</div>
        </div>
      </div>
    </PageWrap>
  );
};
