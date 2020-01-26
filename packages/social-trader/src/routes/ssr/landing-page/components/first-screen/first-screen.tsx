import "routes/ssr/landing-page/styles/home.scss";

import { PlatformNews } from "gv-api-web";
import React from "react";
import FirstSlider from "routes/ssr/landing-page/components/first-slider/first-slifer";
import NewsList from "routes/ssr/landing-page/components/news/news-list";
import { slides } from "routes/ssr/landing-page/static-data/slides";

interface Props {
  news: Array<PlatformNews>;
}

const _FirstScreen: React.FC<Props> = ({ news }) => (
  <section className="home__section home__section--first-screen">
    <div className="home__container">
      <FirstSlider className="home__grid-row" slidesItems={slides} />
      <div className="home__grid-row home__grid-row--mob-wider">
        <NewsList className="home__grid-item" newsItems={news} />
      </div>
    </div>
  </section>
);

const FirstScreen = React.memo(_FirstScreen);
export default FirstScreen;
