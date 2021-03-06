import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

import styles from "./form-text-field.module.scss";

const _FormTextField: React.FC<Props> = ({ children, accent }) => {
  return (
    <div
      className={classNames(styles["form-text-field__text"], {
        [styles["form-text-field__text--color-accent"]]: accent
      })}
    >
      <MutedText noWrap={false}>{children}</MutedText>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

const FormTextField = React.memo(_FormTextField);
export default FormTextField;
