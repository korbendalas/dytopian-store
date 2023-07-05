import { LargeFeaturedProduct } from '@/components/home/largeFeaturedProduct';
import { PageWrap } from '@/components/wrap/pageWrap';
import { SmallFeaturedTabs } from '../../features/smallFeaturedTabs';

export const HomePage = () => {
  return (
    <PageWrap>
      <LargeFeaturedProduct /> <SmallFeaturedTabs />
    </PageWrap>
  );
};
