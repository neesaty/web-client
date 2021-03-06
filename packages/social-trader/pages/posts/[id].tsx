import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { PostPage } from "pages/posts/post.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage<Props> = ({ id }) => {
  return <PostPage id={id} />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return {
    id: id as string
  };
};

interface Props {
  id: string;
}

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);
