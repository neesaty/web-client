import { ButtonIcon } from "components/button-icon/button-icon";
import React from "react";

export const ShareIcon: React.FC = () => {
  return (
    <ButtonIcon>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 8L15.4881 8.56944C15.6543 8.42696 15.75 8.21894 15.75 8C15.75 7.78106 15.6543 7.57304 15.4881 7.43056L15 8ZM8 2L8.48809 1.43056C8.26571 1.23994 7.95271 1.19623 7.68661 1.31862C7.42051 1.441 7.25 1.7071 7.25 2L8 2ZM8 14H7.25C7.25 14.2929 7.42051 14.559 7.68661 14.6814C7.95271 14.8038 8.26571 14.7601 8.48809 14.5694L8 14ZM8 10.3363H8.75C8.75 9.93014 8.42667 9.59778 8.02065 9.58659L8 10.3363ZM1.40445 11.7978L1.73986 12.4686H1.73986L1.40445 11.7978ZM1 12H0.25C0.25 12.2599 0.384589 12.5013 0.605702 12.638C0.826814 12.7746 1.10292 12.7871 1.33541 12.6708L1 12ZM8 5V5.75C8.41421 5.75 8.75 5.41421 8.75 5H8ZM15.4881 7.43056L8.48809 1.43056L7.51191 2.56944L14.5119 8.56944L15.4881 7.43056ZM8.48809 14.5694L15.4881 8.56944L14.5119 7.43056L7.51191 13.4306L8.48809 14.5694ZM7.25 10.3363V14H8.75V10.3363H7.25ZM8.02065 9.58659C5.61745 9.52041 3.22901 10.047 1.06904 11.127L1.73986 12.4686C3.67856 11.4992 5.82234 11.0266 7.97935 11.086L8.02065 9.58659ZM1.06904 11.127L0.66459 11.3292L1.33541 12.6708L1.73986 12.4686L1.06904 11.127ZM1.75 12C1.75 8.54822 4.54822 5.75 8 5.75V4.25C3.71979 4.25 0.25 7.71979 0.25 12H1.75ZM7.25 2V5H8.75V2H7.25Z"
          fill="white"
        />
      </svg>
    </ButtonIcon>
  );
};