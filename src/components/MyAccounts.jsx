import { FaBtc, FaPaypal, FaUniversity } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { RiVisaLine } from "react-icons/ri";
import { Link } from "react-router";

import { formatCurrency, maskAccountNumber } from "../libs/currency";
import Title from "./Title";

const ICONS = {
  crypto: (
    <div className="w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded-full">
      <FaBtc size={26} />
    </div>
  ),

  "visa debit card": (
    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full">
      <RiVisaLine size={26} />
    </div>
  ),

  cash: (
    <div className="w-12 h-12 bg-rose-600 text-white flex items-center justify-center rounded-full">
      <GiCash size={26} />
    </div>
  ),

  paypal: (
    <div className="w-12 h-12 bg-blue-700 text-white flex items-center justify-center rounded-full">
      <FaPaypal size={26} />
    </div>
  ),

  bank: (
    <div className="w-12 h-12 bg-violet-600 text-white flex items-center justify-center rounded-full">
      <FaUniversity size={26} />
    </div>
  ),
};

const MyAccounts = ({ data }) => {
  return (
    <div className="mt-20 md:mt-0 py-5 md:py-20 w-full md:w-1/3">
      <Title title="My Accounts" />

      <Link
        to="/accounts"
        className="text-sm text-gray-600 dark:text-gray-500 hover:text-violet-600 hover:underline"
      >
        View all your accounts
      </Link>

      <div className="mt-5 space-y-4">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              {ICONS[item?.account_name?.toLowerCase()] || ICONS.bank}

              <div>
                <p className="font-medium text-black dark:text-gray-300">
                  {item?.account_name}
                </p>

                <p className="text-sm text-gray-500">
                  {maskAccountNumber(item?.account_number)}
                </p>
              </div>
            </div>

            <p className="font-medium text-black dark:text-gray-300">
              {formatCurrency(item?.account_balance)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccounts;
