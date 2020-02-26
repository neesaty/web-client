import "./events-list.scss";

import classNames from "classnames";
import { PlatformEvent } from "gv-api-web";
import EventItem from "pages/landing-page/components/events-list/event-item";
import EventLastItem from "pages/landing-page/components/events-list/event-last-item";
import React, { useCallback, useEffect, useState } from "react";

const TIME_DELAY = 5000;
const COUNT_SHOWING_ITEMS = 5;

interface Props {
  className?: string;
  events: PlatformEvent[];
}

const _EventsList: React.FC<Props> = ({ className, events }) => {
  const countItems = events.length;
  const [startIndex, setStartIndex] = useState(0);
  const [maxHeightItem, setMaxHeightItem] = useState(90);
  const [heightList, setHeightList] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(state => (state === 0 ? countItems - 1 : state - 1));
    }, TIME_DELAY);

    return () => clearInterval(interval);
  }, []);
  const updateMaxHeight = useCallback(
    (currentHeight: number) => {
      if (maxHeightItem < currentHeight) {
        setMaxHeightItem(state =>
          state < currentHeight ? currentHeight : state
        );
        setHeightList((maxHeightItem + 20) * (COUNT_SHOWING_ITEMS + 1));
      }
    },
    [maxHeightItem, heightList]
  );

  useEffect(() => {
    setHeightList((maxHeightItem + 20) * (COUNT_SHOWING_ITEMS + 1));
  }, [maxHeightItem, heightList]);

  return (
    <ul
      className={classNames("events-list", className)}
      style={{ height: `${heightList}px` }}
    >
      {events.map((event, index) => (
        <EventItem
          key={index}
          startIndex={startIndex}
          countItems={countItems}
          countShowingItems={COUNT_SHOWING_ITEMS}
          index={index}
          maxHeight={maxHeightItem}
          updateMaxHeight={updateMaxHeight}
          {...event}
        />
      ))}
      <EventLastItem />
    </ul>
  );
};

const EventsList = _EventsList;
export default EventsList;
