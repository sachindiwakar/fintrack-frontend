import { v4 as uuidv4 } from "uuid";

export const maskAccountNumber = (accountNumber) => {
  if (typeof accountNumber !== "string" || accountNumber.length < 12) {
    return accountNumber;
  }

  const firstFour = accountNumber.substring(0, 4);
  const lastFour = accountNumber.substring(accountNumber.length - 4);

  const maskedDigits = "*".repeat(accountNumber.length - 8);

  return `${firstFour}${maskedDigits}${lastFour}`;
};

export const formatCurrency = (value) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (isNaN(value)) {
    return "Invalid input";
  }

  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: user?.currency || "USD",
    minimumFractionDigits: 2,
  }).format(numberValue);
};

export const getDateSevenDaysAgo = () => {
  const today = new Date();

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return sevenDaysAgo.toISOString().split("T")[0];
};

export async function fetchCountries() {
  try {
    let allCountries = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_COUNTRIES_API_KEY}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return [];
      }

      const countries = data.data.objects.map((country) => {
        return {
          country: country.names?.common || "",
          flag: country.flag?.url_png || "",
          currency: country.currencies?.[0]?.code || "",
        };
      });

      allCountries = [...allCountries, ...countries];

      if (countries.length < limit) {
        break;
      }

      offset += limit;
    }

    return allCountries.sort((a, b) => a.country.localeCompare(b.country));
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return [];
  }
}

export function generateAccountNumber() {
  let accountNumber = "";
  while (accountNumber.length < 13) {
    const uuid = uuidv4().replace(/-/g, "");
    accountNumber += uuid.replace(/\D/g, "");
  }
  return accountNumber.substr(0, 13);
}
