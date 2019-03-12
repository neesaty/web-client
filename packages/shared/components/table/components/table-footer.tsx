import * as React from "react";
import ItemsCounter from "./table-items-counter";
import Paging from "./paging/paging";
import { IPaging } from "../helpers/paging.helpers";

const TableFooter: React.FC<{
  isPending: boolean;
  paging: IPaging;
  updatePaging(page: number): void;
}> = ({ isPending, paging, updatePaging }) => {
  if (paging.totalPages < 2) return null;

  return (
    <div className="table__footer">
      <ItemsCounter {...paging} />
      <Paging
        paging={paging}
        hidden={isPending}
        updatePaging={next => updatePaging(next.currentPage)}
      />
    </div>
  );
};

export default TableFooter;
