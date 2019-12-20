import BackButton from "components/back-button/back-button";
import useRole from "hooks/use-role.hook";
import * as React from "react";
import DocumentTitle from "react-document-title";
import { useTranslation } from "react-i18next";

const _Page: React.FC<Props> = ({ title, children }) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <DocumentTitle title={t(`${role ? `${role}.` : ""}app.title`) + title}>
      <>
        <div>
          <BackButton />
        </div>
        {children}
      </>
    </DocumentTitle>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Page = React.memo(_Page);
export default Page;
