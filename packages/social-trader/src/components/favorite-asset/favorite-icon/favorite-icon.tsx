import "./favorite-icon.scss";

import { Icon } from "components/icon/icon";
import * as React from "react";

const FavoriteIcon: React.FC<Props> = ({ selected, className, id }) => {
  return (
    <Icon
      type={"favorite"} // TODO change to enum
      selected={selected}
      className={className}
    >
      <svg
        width="28px"
        height="27px"
        viewBox="0 0 28 27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.170809 1.5839627l2.9513497 6.8672691 7.5629069.6387322c1.2154872.1031996 1.7153606 1.6124232.7827438 2.4057482l-5.7272503 4.8780822 1.7154251 7.2532888c.2797696 1.185426-1.0132438 2.1083794-2.0531869 1.489008l-6.5020107-3.8549639-6.5027145 3.8553807c-1.0419653.6162338-2.3324986-.30571-2.0524022-1.4897674l1.7153461-7.2529541-5.7281548-4.8790092c-.9330633-.793705-.4342461-2.3029924.782716-2.4060829l7.562606-.6387067 2.9511789-6.8657c.4769621-1.1122752 2.0642685-1.1123836 2.5414469-.000325z"
          fillRule="nonzero"
          stroke="#FFF"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </Icon>
  );
};

interface Props {
  id: string;
  onClick?: (id: string, selected: boolean) => void;
  selected: boolean;
  className?: string;
}

export default FavoriteIcon;
