import { useRouter } from "next/router";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

export const useLanguage = () => {
  const { locale } = useRouter();

  const t = locale === "ae-en" || locale === "sa-en" ? en : ar;

  const parts = locale?.split("-");

  const countries = [
    {
      country: "United Arab Emirates",
      flag: "https://www.lifepharmacy.com/images/svg/flag-ae.svg",
      path: "ae",
      currency:"AED"
    },
    {
      country: "Saudi Arabia",
      flag: "https://www.lifepharmacy.com/images/svg/flag-sa.svg",
      path: "sa",
      currency:"SAR"

    },
  ];

  const languages = [
    { name: "العربية", path: "ar" },
    { name: "English", path: "en" },
  ];

  const selectedLanguageDetails =
    parts && parts[1] === "en" ? languages[1] : languages[0];

  const currentCountryDetails =
    parts && parts[0] === "sa" ? countries[1] : countries[0];

  return {
    t,
    locale,
    countries,
    languages,
    selectedLanguageDetails,
    currentCountryDetails,
  };
};
