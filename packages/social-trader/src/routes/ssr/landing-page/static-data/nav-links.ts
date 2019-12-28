import {
  GV_FOLLOW_ROUTE,
  GV_FUNDS_ROUTE,
  GV_PROGRAMS_ROUTE,
  INVEST_ROUTE
} from "routes/invest.routes";
import { TRADE } from "routes/trade.routes";

export type TNavFooter = {
  state?: string;
  name: string;
  href?: string;
};

export type TSubNav = TNavFooter & {
  hideMobile?: boolean;
};

export type TNavHeader = TNavFooter & {
  icon?: JSX.Element;
  subNav?: TSubNav[];
  hideMobile?: boolean;
};

export const navHeader: TNavHeader[] = [
  {
    name: "Invest",
    href: INVEST_ROUTE,
    subNav: [
      {
        name: "Follow",
        href: GV_FOLLOW_ROUTE
      },
      {
        name: "Programs",
        href: GV_FUNDS_ROUTE
      },
      {
        name: "Funds",
        href: GV_PROGRAMS_ROUTE
      }
    ]
  },
  {
    name: "Trade",
    href: TRADE
  },
  {
    name: "Info",
    href: "#info",
    subNav: [
      {
        name: "Blog",
        hideMobile: true,
        href: "https://blog.genesis.vision"
      },
      {
        name: "Fees",
        hideMobile: true,
        href: "/fees/"
      },
      {
        name: "Referral program",
        hideMobile: true,
        href: "/referral-program/"
      },
      {
        name: "Feedback",
        hideMobile: true,
        href: "https://feedback.genesis.vision/"
      }
    ]
  }
];

export const navFooter: TNavHeader[] = [
  {
    name: "Referral program",
    href: "/referral-program/"
  },
  {
    name: "Fees",
    href: "/fees/"
  },
  {
    name: "Blog",
    href: "https://blog.genesis.vision/"
  },
  {
    name: "Feedback",
    href: "https://feedback.genesis.vision/"
  },
  {
    name: "Knowledge base",
    href: "https://feedback.genesis.vision/knowledge-bases/2-knowledge-base"
  },
  {
    name: "Glossary",
    href: "/glossary.html"
  },
  {
    name: "AML Manual",
    href: "/aml-manual.html"
  },
  {
    name: "White paper",
    href: "https://genesis.vision/white-paper-eng.pdf"
  },
  {
    name: "Privacy policy",
    href: "/privacy-policy.html"
  },
  {
    name: "Terms and conditions",
    href: "/terms.html"
  },
  {
    name: "Download terminal",
    href: "/downloads.html"
  }
];

export const EMAIL_ROUTE = "mailto:support@genesis.vision";