import "./page.scss";

import BackButton from "components/back-button/back-button";
import { TitleContext } from "components/link/link.helper";
import {
  IPageSeoWrapperProps,
  PageSeoWrapper
} from "components/page/page-seo-wrapper";
import { useRefLink } from "hooks/ref-link";
import * as React from "react";
import { PropsWithChildren } from "react";

const Page = ({
  showTitle,
  title,
  description,
  children,
  schemas,
  previewImage,
  url
}: PropsWithChildren<Props>) => {
  useRefLink();
  return (
    <TitleContext.Provider value={title}>
      <PageSeoWrapper
        url={url}
        schemas={schemas}
        title={title}
        description={description}
        previewImage={previewImage}
      >
        <div>
          <BackButton />
        </div>
        {showTitle && (
          <div className="page__title">
            <h1>{title}</h1>
          </div>
        )}
        {children}
      </PageSeoWrapper>
    </TitleContext.Provider>
  );
};

interface Props extends IPageSeoWrapperProps {}

export default Page;
