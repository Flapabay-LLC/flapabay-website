import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const languages = [
  "English (United States)",
  "English (United Kingdom)",
  "English (Canada)",
  "English (Australia)",
  "Español (España)",
  "Español (México)",
  "Français (France)",
  "Français (Canada)",
  "Deutsch (Deutschland)",
  "Deutsch (Österreich)",
  "Italiano (Italia)",
  "Português (Brasil)",
  "Português (Portugal)",
  "Nederlands (Nederland)",
  "Nederlands (België)",
  "Русский (Россия)",
  "Türkçe (Türkiye)",
  "العربية (السعودية)",
  "العربية (الإمارات)",
  "العربية (مصر)",
  "हिन्दी (भारत)",
  "বাংলা (বাংলাদেশ)",
  "தமிழ் (இந்தியா)",
  "తెలుగు (భారతదేశం)",
  "한국어 (대한민국)",
  "日本語 (日本)",
  "中文 (简体)",
  "中文 (繁體)",
  "ไทย (ไทย)",
  "Tiếng Việt (Việt Nam)",
  "Polski (Polska)",
  "Українська (Україна)",
  "Magyar (Magyarország)",
  "Česky (Česká republika)",
  "Slovenský (Slovensko)",
  "Română (România)",
  "Ελληνικά (Ελλάδα)",
  "עברית (ישראל)",
  "فارسی (ایران)",
  "Bahasa Indonesia (Indonesia)",
  "Bahasa Melayu (Malaysia)",
  "Suomi (Suomi)",
  "Svenska (Sverige)",
  "Norsk (Norge)",
  "Dansk (Danmark)",
  "Filipino (Pilipinas)",
  "Català (Espanya)",
  "Eesti (Eesti)",
  "Lietuvių (Lietuva)",
  "Latviešu (Latvija)",
];

const currencies = [
  { name: "United States Dollar", code: "USD", symbol: "$" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "British Pound", code: "GBP", symbol: "£" },
  { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { name: "Australian Dollar", code: "AUD", symbol: "$" },
  { name: "Canadian Dollar", code: "CAD", symbol: "$" },
  { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
  { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
  { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  { name: "South Korean Won", code: "KRW", symbol: "₩" },
  { name: "Mexican Peso", code: "MXN", symbol: "$" },
  { name: "Russian Ruble", code: "RUB", symbol: "₽" },
  { name: "South African Rand", code: "ZAR", symbol: "R" },
  { name: "Turkish Lira", code: "TRY", symbol: "₺" },
  { name: "Swedish Krona", code: "SEK", symbol: "kr" },
  { name: "Norwegian Krone", code: "NOK", symbol: "kr" },
  { name: "Danish Krone", code: "DKK", symbol: "kr" },
  { name: "New Zealand Dollar", code: "NZD", symbol: "$" },
  { name: "Singapore Dollar", code: "SGD", symbol: "$" },
  { name: "Hong Kong Dollar", code: "HKD", symbol: "$" },
  { name: "Malaysian Ringgit", code: "MYR", symbol: "RM" },
  { name: "Philippine Peso", code: "PHP", symbol: "₱" },
  { name: "Thai Baht", code: "THB", symbol: "฿" },
  { name: "Indonesian Rupiah", code: "IDR", symbol: "Rp" },
  { name: "Polish Zloty", code: "PLN", symbol: "zł" },
  { name: "Czech Koruna", code: "CZK", symbol: "Kč" },
  { name: "Hungarian Forint", code: "HUF", symbol: "Ft" },
  { name: "Israeli Shekel", code: "ILS", symbol: "₪" },
  { name: "Emirati Dirham", code: "AED", symbol: "د.إ" },
  { name: "Qatari Riyal", code: "QAR", symbol: "ر.ق" },
  { name: "Saudi Riyal", code: "SAR", symbol: "﷼" },
  { name: "Egyptian Pound", code: "EGP", symbol: "£" },
  { name: "Ghanaian Cedi", code: "GHS", symbol: "GH₵" },
  { name: "Ukrainian Hryvnia", code: "UAH", symbol: "₴" },
  { name: "Kazakhstani Tenge", code: "KZT", symbol: "₸" },
  { name: "Kenyan Shilling", code: "KES", symbol: "KSh" },
  { name: "Chilean Peso", code: "CLP", symbol: "$" },
  { name: "Colombian Peso", code: "COP", symbol: "$" },
  { name: "Costa Rican Colon", code: "CRC", symbol: "₡" },
];

const CurrencyModal = ({ isOpen, onClose, onSelect }) => {
  const [activeTab, setActiveTab] = useState("Language and Region");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div className="flex border-b mb-4 w-96">
          <button
            className={`flex-1 p-2 font-medium ${
              activeTab === "Language and Region" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("Language and Region")}
          >
            Language and Region
          </button>
          <button
            className={`flex-1 p-2 font-medium ${
              activeTab === "currency" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(activeTab === "Language and Region" ? languages : currencies).map((item) => (
            <li
              key={item.code || item}
              className="p-3 border rounded-lg cursor-pointer  hover:text-white hover:bg-[#ffc500] text-sm"
              onClick={() => {
                onSelect(item.code || item);
                onClose();
              }}
            >
              {item.name || item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyModal;
