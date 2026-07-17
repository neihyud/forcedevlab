import { Routes } from "@/lib/enum/routes";

export const MENU_ITEMS = [
  {
    key: Routes.HOME,
    label: "Home",
  },

  {
    key: Routes.SERVICE,
    label: "Service",
    children: [
      {
        label: "Service A",
        key: Routes.SERVICE_A,
      },
      {
        label: "Service B",
        key: Routes.SERVICE_B,
      },
      {
        label: "Service C",
        key: Routes.SERVICE_C,
      },
      {
        label: "Service D",
        key: Routes.SERVICE_D,
      },
      {
        label: "Service E",
        key: Routes.SERVICE_E,
      },
      {
        label: "Service F",
        key: Routes.SERVICE_F,
      },
    ],
  },
  {
    key: Routes.PRICING,
    label: "Pricing",
  },
  {
    key: Routes.ABOUT_US,
    label: "About us",
  },
];
