import "./fees-section.scss";

import FeesGeneral from "pages/landing-page/components/fees-info/fees-general";
import FeesTrading from "pages/landing-page/components/fees-info/fees-trading";
import TabControls from "pages/landing-page/components/tab-controls/tab-controls";
import { feesTabs } from "pages/landing-page/static-data/fees";
import React, { useCallback, useState } from "react";

const FeesSection: React.FC = () => {
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );
  return (
    <section className="fees-section">
      <div className="internal__container">
        <div className="fees-section__wrapper-controls">
          <h1 className="internal__title">Fees</h1>
          <p className="fees-section__text">
            The list of fees charged by Genesis Vision platform
          </p>
          <TabControls
            currentTabId={currentTabId}
            tabsItems={feesTabs}
            onChange={handleChange}
            className="fees-section__controls"
          />
        </div>
      </div>
      <div className="fees-section__tab-info">
        {currentTabId === 0 && <FeesGeneral />}
        {currentTabId === 1 && <FeesTrading />}
      </div>
    </section>
  );
};

export default FeesSection;