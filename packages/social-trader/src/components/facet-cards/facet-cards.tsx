import "./facet-cards.scss";

import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetFacet } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";

import FacetCard, { composeFacetUrlFunc } from "./facet-card";

const _FacetCards: React.FC<Props> = ({
  data,
  composeFacetUrl,
  title,
  fileRoute
}) => {
  const [load, setLoad] = useIsOpen();
  const { scrollData, ref, handleScroll } = useShadow();
  const handleLoad = useCallback(() => {
    if (!ref.current) return;
    if (!load) {
      setLoad();
      ref.current.scrollTo(5, 0);
    }
  }, [load]);
  return (
    <div className="facets__wrapper">
      <HorizontalListShadowContainer darkShadow scrollData={scrollData}>
        <div
          className="facets__carousel"
          ref={ref}
          onLoad={handleLoad}
          onScroll={handleScroll}
        >
          {data.map(facet => (
            <FacetCard
              title={title}
              fileRoute={fileRoute}
              key={facet.id}
              facet={facet}
              composeFacetUrl={composeFacetUrl}
            />
          ))}
        </div>
      </HorizontalListShadowContainer>
    </div>
  );
};

interface Props {
  data: Array<AssetFacet>;
  composeFacetUrl: composeFacetUrlFunc;
  title: string;
  fileRoute: string;
}

const FacetCards = withBlurLoader(_FacetCards);
export default FacetCards;
