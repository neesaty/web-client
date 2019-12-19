import * as React from "react";
import { DepositAccount, FinancialProduct, WithContext } from "schema-dts";
import filesService from "services/file-service";

import { ProgramDescriptionDataType } from "./program-details.types";

const isFollow = (description: ProgramDescriptionDataType) => {
  return !!description.followDetails;
};

export const getSchema = (description: ProgramDescriptionDataType) => {
  return isFollow(description)
    ? getFollowSchema(description)
    : getProgramSchema(description);
};

export const getProgramSchema = (
  details: ProgramDescriptionDataType
): WithContext<DepositAccount> => ({
  "@context": "https://schema.org",
  "@type": "DepositAccount",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo),
  aggregateRating: {
    "@type": "AggregateRating",
    bestRating: 7, //TODO
    ratingValue: details.programDetails.level
  } //TODO
});

export const getFollowSchema = (
  details: ProgramDescriptionDataType
): WithContext<FinancialProduct> => ({
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  broker: details.brokerDetails.name,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
