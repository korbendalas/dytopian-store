import { LargeFeaturedProduct } from '@/components/home/largeFeaturedProduct';
import { PageWrap } from '@/components/wrap/pageWrap';
import { SmallFeaturedTabs } from './smallFeaturedTabs';

export const HomePage = () => {
  return (
    <PageWrap>
      <LargeFeaturedProduct /> <SmallFeaturedTabs />
    </PageWrap>
  );
};
