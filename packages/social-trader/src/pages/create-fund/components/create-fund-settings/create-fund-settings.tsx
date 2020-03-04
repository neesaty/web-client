import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import { INewImage } from "components/form/input-image/input-image";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { FundCreateAssetPlatformInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import { FUND_CURRENCY } from "../../create-fund.constants";
import { AssetsField } from "./assets-field";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";

export enum CREATE_FUND_FIELDS {
  available = "available",
  rate = "rate",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  entryFee = "entryFee",
  logo = "logo",
  description = "description",
  title = "title",
  assets = "assets",
  exitFee = "exitFee"
}

const _CreateFundSettings: React.FC<Props> = ({
  wallets,
  data,
  onSubmit,
  errorMessage
}) => {
  const { maxExitFee, maxEntryFee, minDeposit } = data;
  const [available, setAvailable] = useState(0);
  const [rate, setRate] = useState(1);

  const [t] = useTranslation();

  const form = useForm<ICreateFundSettingsFormValues>({
    defaultValues: {
      [CREATE_FUND_FIELDS.depositWalletId]: safeGetElemFromArray(
        wallets,
        ({ currency }) => currency === "GVT"
      ).id
    },
    validationSchema: createFundSettingsValidationSchema({
      available,
      rate,
      wallets,
      t,
      data
    }),
    mode: "onChange"
  });
  const { watch, setValue, errors } = form;
  const { depositAmount, description } = watch();

  console.log("errors", errors);
  console.log("errors.logo", errors.logo);
  useEffect(() => {
    console.log("errors.logo with effect", errors["logo"]);
  }, [errors.logo, errors]);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <SettingsBlock
        label={t("create-fund-page.settings.main-settings")}
        blockNumber={"01"}
      >
        <DescriptionBlock
          asset={ASSET.FUND}
          titleName={CREATE_FUND_FIELDS.title}
          descriptionName={CREATE_FUND_FIELDS.description}
          logoName={CREATE_FUND_FIELDS.logo}
          description={description}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-fund-page.settings.asset-selection")}
        blockNumber={"02"}
      >
        <AssetsField name={CREATE_FUND_FIELDS.assets} />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-fund-page.settings.fees-settings")}
        blockNumber={"03"}
      >
        <FeesSettings
          entryFeeName={CREATE_FUND_FIELDS.entryFee}
          entryFeeDescription={t(
            "create-fund-page.settings.hints.entry-fee-description",
            { maxFee: maxEntryFee }
          )}
          secondFeeName={CREATE_FUND_FIELDS.exitFee}
          secondFeeLabel={t("create-fund-page.settings.fields.exit-fee")}
          secondFeeUnderText={t("create-fund-page.settings.hints.exit-fee")}
          secondFeeDescription={t(
            "create-fund-page.settings.hints.exit-fee-description",
            {
              maxFee: maxExitFee
            }
          )}
        />
      </SettingsBlock>
      <DepositDetailsBlock
        setAvailable={setAvailable}
        setRate={setRate}
        blockNumber={4}
        walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
        inputName={CREATE_FUND_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minDeposit}
        setFieldValue={setValue}
        assetCurrency={FUND_CURRENCY}
      />
      <CreateAssetNavigation asset={ASSET.FUND} isSuccessful={!errorMessage} />
    </HookForm>
  );
};

export interface ICreateFundSettingsFormValues {
  [CREATE_FUND_FIELDS.available]: number;
  [CREATE_FUND_FIELDS.rate]: number;
  [CREATE_FUND_FIELDS.depositWalletId]: string;
  [CREATE_FUND_FIELDS.depositAmount]?: number;
  [CREATE_FUND_FIELDS.entryFee]?: number;
  [CREATE_FUND_FIELDS.logo]: INewImage;
  [CREATE_FUND_FIELDS.description]: string;
  [CREATE_FUND_FIELDS.title]: string;
  [CREATE_FUND_FIELDS.assets]: Array<any>;
  [CREATE_FUND_FIELDS.exitFee]?: number;
}

const CreateFundSettings = withBlurLoader(React.memo(_CreateFundSettings));
export default CreateFundSettings;

interface Props {
  errorMessage?: string;
  wallets: WalletData[];
  data: FundCreateAssetPlatformInfo;
  onSubmit: (values: ICreateFundSettingsFormValues) => void;
}
