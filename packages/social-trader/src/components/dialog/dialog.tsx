import classNames from "classnames";
import GVButton from "components/gv-button";
import { CloseIcon } from "components/icon/close-icon";
import Modal, { BodyFix } from "components/modal/modal";
import React, { ReactNode, useCallback, useState } from "react";

import styles from "./dialog.module.scss";

export const Dialog: React.FC<IDialogProps> = ({
  showClose = true,
  top,
  open,
  onClose,
  className,
  children
}) => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleBackdropClick = useCallback(
    event => {
      if (target === event.currentTarget && onClose) {
        onClose(event);
      }
    },
    [onClose, target]
  );

  const handleMouseDown = useCallback(event => {
    setTarget(event.target);
  }, []);

  return (
    <Modal open={open} fixed onClose={onClose}>
      <div
        className={styles["dialog-wrapper"]}
        onClick={handleBackdropClick}
        onMouseDown={handleMouseDown}
      >
        <BodyFix />
        <div
          className={classNames(styles["dialog"], className, {
            [styles["dialog--top"]]: top
          })}
        >
          {showClose && (
            <GVButton
              variant="text"
              color="secondary"
              className={styles["dialog__close"]}
              onClick={onClose}
            >
              <CloseIcon />
            </GVButton>
          )}
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;

export interface IDialogProps extends IDialogOuterProps {
  showClose?: boolean;
  children?: ReactNode;
  className?: string;
  top?: boolean;
}

export interface IDialogOuterProps {
  open: boolean;
  onClose: (param?: any) => void;
}
