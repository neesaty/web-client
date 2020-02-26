import { useToLink } from "components/link/link.helper";
import {
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import {
  AssetType,
  BrokerTradeServerType,
  DashboardTradingAssetActions
} from "gv-api-web";
import { TAnchor } from "hooks/anchor.hook";
import { useTranslation } from "i18n";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import MakeSignalButton from "modules/program-signal-popup/make-signal.button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import { getTerminalLink } from "pages/dashboard/dashboard.helpers";
import ChangeAccountPasswordButton from "pages/invest/programs/programs-settings/change-password/change-password-trading-account.button";
import React, { useCallback } from "react";
import {
  createFundSettingsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

const _DashboardPublicCardActions: React.FC<IDashboardPublicCardActionsProps> = ({
  brokerType,
  onApply,
  name,
  assetType,
  actions: {
    canMakeSignalProviderFromProgram,
    canMakeProgramFromPrivateTradingAccount,
    canMakeProgramFromSignalProvider,
    canChangePassword
  },
  anchor,
  clearAnchor,
  url,
  id,
  showTerminal,
  showClosePeriod
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const [t] = useTranslation();
  const terminalLink = brokerType
    ? linkCreator(getTerminalLink(brokerType))
    : "";
  const createSettingsToUrlMethod =
    assetType === "Fund" ? createFundSettingsToUrl : createProgramSettingsToUrl;
  const settingsLink = url ? createSettingsToUrlMethod(url, contextTitle) : "";
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.SIGNAL,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = linkCreator(makeProgramLinkMethod(id));
  const handleOnApply = useCallback(() => {
    clearAnchor();
    onApply();
  }, []);
  return (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      {canMakeSignalProviderFromProgram && (
        <MakeSignalButton onApply={handleOnApply} id={id} programName={name} />
      )}
      {(canMakeProgramFromPrivateTradingAccount ||
        canMakeProgramFromSignalProvider) && (
        <TableCardActionsItem to={makeProgramLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.make-program")}
        </TableCardActionsItem>
      )}
      <TableCardActionsItem to={settingsLink} onClick={clearAnchor}>
        {t("dashboard-page.trading.actions.settings")}
      </TableCardActionsItem>
      {showTerminal && (
        <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.terminal")}
        </TableCardActionsItem>
      )}
      {showClosePeriod && <ClosePeriodButton id={id} />}
      {canChangePassword && (
        <ChangeAccountPasswordButton id={id} title={contextTitle} />
      )}
    </TableCardActions>
  );
};

interface IDashboardPublicCardActionsProps {
  brokerType?: BrokerTradeServerType;
  onApply: VoidFunction;
  name: string;
  actions: DashboardTradingAssetActions;
  assetType: AssetType;
  clearAnchor: VoidFunction;
  anchor?: TAnchor;
  url?: string;
  id: string;
  showTerminal: boolean;
  showClosePeriod: boolean;
}
export const DashboardPublicCardActions = _DashboardPublicCardActions;
