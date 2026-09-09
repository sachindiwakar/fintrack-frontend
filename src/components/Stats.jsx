import { BsCashCoin, BsCurrencyDollar } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";

import { formatCurrency } from "../libs";
import { Card } from "./Card";

const ICON_STYLES = [
  "bg-blue-300 text-blue-800",
  "bg-emerald-700 text-emerald-800",
  "bg-rose-300 text-rose-800",
];

const Stats = ({ dt }) => {
  const data = [
    {
      label: "Total Balance",
      amount: dt?.balance,
      increase: 10.9,
      icon: <BsCurrencyDollar size={26} />,
    },
    {
      label: "Total Income",
      amount: dt?.income,
      increase: 8.9,
      icon: <BsCashCoin size={26} />,
    },
    {
      label: "Total Expense",
      amount: dt?.expense,
      increase: -10.9,
      icon: <SiCashapp size={26} />,
    },
  ];

  const ItemCard = ({ item, index }) => {
    return (
      <Card className="flex items-center justify-between w-full h-32 gap-5 px-5 py-6 shadow-md bg-white dark:bg-slate-800 border-0 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
        <div className="flex items-center w-full h-full gap-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              ICON_STYLES[index]
            }`}
          >
            {item.icon}
          </div>

          <div className="space-y-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
              {item.label}
            </span>

            <p className="text-xl font-medium text-black dark:text-gray-400">
              {formatCurrency(item?.amount || 0)}
            </p>

            <span className="text-xs text-gray-600 dark:text-gray-500">
              Overall {item.label}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 mb-20 md:flex-row 2xl:gap-x-40">
      <div className="flex flex-col items-center justify-between w-full gap-10 md:flex-row 2xl:gap-20">
        {data?.map((item, index) => (
          <ItemCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Stats;
