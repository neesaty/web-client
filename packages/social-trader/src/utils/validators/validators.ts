import { TFunction } from "i18next";
import { number, string } from "yup";

export const minMaxNumberShape = ({
  t,
  min = 0,
  max
}: {
  t: TFunction;
  min?: number;
  max: number;
}) =>
  number()
    .required(t("validations.required"))
    .min(
      min,
      t("validations.min", {
        min
      })
    )
    .max(
      max,
      t("validations.max", {
        max
      })
    );

export const emailValidator = string()
  .email("Invalid email address.")
  .required("Email is required.");

export const passwordValidator = (t: TFunction) =>
  string()
    .min(
      6,
      t("auth.password-restore.validators.password-is-short", {
        count: 6
      })
    )
    .required(t("auth.password-restore.validators.password-required"));

export const ethGvtWalletValidator = string().matches(
  /^0x[a-fA-F0-9]{40}$/,
  "Invalid wallet address"
);

export const btcWalletValidator = string().matches(
  /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
  "Invalid wallet address"
);

export const assetTitleShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("create-program-page.settings.validation.title-required"))
    .min(4, t("create-program-page.settings.validation.title-is-short"))
    .max(20, t("create-program-page.settings.validation.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t("create-program-page.settings.validation.title-is-latin-and-numbers")
    );
};

export const assetDescriptionShape = (t: TFunction) => {
  return string()
    .trim()
    .required(t("create-program-page.settings.validation.description-required"))
    .min(20, t("create-program-page.settings.validation.description-is-short"))
    .max(500, t("create-program-page.settings.validation.description-is-long"));
};

export const signalSuccessFeeShape = (
  t: TFunction,
  min: number,
  max: number
) => {
  return number()
    .min(min, t("create-program-page.settings.validation.success-fee-min"))
    .required(t("create-program-page.settings.validation.success-fee-required"))
    .max(
      max,
      t("create-program-page.settings.validation.success-fee-max", {
        max
      })
    );
};

export const signalVolumeFeeShape = (
  t: TFunction,
  min: number = 0,
  max: number = 0.1
) => {
  return number()
    .required(
      t("create-program-page.settings.validation.signal-volume-fee-required")
    )
    .min(
      min,
      t("create-program-page.settings.validation.signal-volume-fee-min", {
        min
      })
    )
    .max(
      max,
      t("create-program-page.settings.validation.signal-volume-fee-max", {
        max
      })
    );
};

export const entryFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("create-program-page.settings.validation.entry-fee-required"))
    .min(0, t("create-program-page.settings.validation.entry-fee-min"))
    .max(
      max,
      t("create-program-page.settings.validation.entry-fee-max", {
        max
      })
    );

export const successFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("create-program-page.settings.validation.success-fee-required"))
    .min(0, t("create-program-page.settings.validation.success-fee-min"))
    .max(
      max,
      t("create-program-page.settings.validation.success-fee-max", {
        max
      })
    );

export const exitFeeShape = (t: TFunction, max: number) =>
  number()
    .required(t("create-fund-page.settings.validation.exit-fee-required"))
    .min(0, t("create-fund-page.settings.validation.exit-fee-min"))
    .max(
      max,
      t("create-fund-page.settings.validation.exit-fee-max", {
        max
      })
    );

export const twoFactorValidator = (t: TFunction, twoFactorEnabled: boolean) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};
