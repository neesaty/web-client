import BannerPreview from "components/banner-preview/banner-preview";
import DetailsBlock from "components/details/details-block";
import Page from "components/page/page";
import withDefaultLayout from "decorators/with-default-layout";
import { ProgramFollowDetailsFull } from "gv-api-web";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { api } from "services/api-client/swagger-custom-client";

const _Page: NextPage<{ program: ProgramFollowDetailsFull }> = ({
  program
}) => {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) return null;

  const title = `Banners for program: ${program.publicInfo.title}`;
  const banner250png = `${origin}/banners/programs/${program.publicInfo.url}/250x250.png`;
  const banner250svg = `${origin}/banners/programs/${program.publicInfo.url}/250x250.svg`;
  const banner728png = `${origin}/banners/programs/${program.publicInfo.url}/728x89.png`;
  const banner728svg = `${origin}/banners/programs/${program.publicInfo.url}/728x89.svg`;
  const banner240png = `${origin}/banners/programs/${program.publicInfo.url}/240x400.png`;
  const banner240svg = `${origin}/banners/programs/${program.publicInfo.url}/240x400.svg`;

  return (
    <Page description={title} title={title}>
      <DetailsBlock horizontalPaddings>
        <h3>PNG banners</h3>
        <BannerPreview url={banner250png} title={program.publicInfo.title} />
        <BannerPreview url={banner728png} title={program.publicInfo.title} />
        <BannerPreview url={banner240png} title={program.publicInfo.title} />
      </DetailsBlock>
      <DetailsBlock horizontalPaddings>
        <h3>SVG banners</h3>
        <BannerPreview
          url={banner250svg}
          title={program.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner728svg}
          title={program.publicInfo.title}
          type={"svg"}
        />
        <BannerPreview
          url={banner240svg}
          title={program.publicInfo.title}
          type={"svg"}
        />
      </DetailsBlock>
    </Page>
  );
};

_Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const program = await api.programs().getProgramDetails(id as string);

  return {
    program
  };
};

const ProgramsBannersPage = compose(withDefaultLayout)(_Page);
export default ProgramsBannersPage;
