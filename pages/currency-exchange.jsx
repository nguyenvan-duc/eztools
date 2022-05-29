import { ArrowRightIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import React, { useRef, useEffect, useState } from "react";
import useSWR from "swr";
import _ from "lodash";
import CurrencyFormat from "react-currency-format";
import Layout from "../components/Layout";
import SelectBox from "../components/PageComponents/CurrencyComponents/SelectBox";
import { convert, getDate } from "../services/utils";
import { api } from "../services/api";
import HeadSeo from "../components/HeadSeo";
import currencyData from "../lib/currencies.json";
import TitlePage from "../components/PageComponents/TitlePage";
const API_KEY = "0cf6ddbb42c906d3887063fc";

export async function getServerSideProps({ query }) {
  const response = await api().get(`/v6/${API_KEY}/latest/USD`);
  let currencies = _.keys(response.data.conversion_rates).sort();
  let currencyOptions = currencies.map((currency) => {
    let defaultCurrency = currencyData.find(
      (data) => data.AlphabeticCode === currency
    );
    return {
      label: `${currency}${
        defaultCurrency?.Currency ? ` (${defaultCurrency.Currency})` : ""
      }`, // format as ex. PHP (Philippine Peso)
      value: currency.toLowerCase(),
    };
  });
  return {
    props: {
      currencies: currencyOptions || [],
      defaultCurrencyCode: query.defaultCurrencyCode,
    },
  };
}

const CurrencyConverter = ({ currencies, defaultCurrencyCode }) => {
  const initialRef = useRef(null);
  const [firstCurrency, setFirstCurrency] = useState({
    label: "USD (US Dollar)",
    value: "usd",
  });
  const defaultCurrency = currencyData?.find(
    (data) => data?.AlphabeticCode === defaultCurrencyCode
  );
  const [secondCurrency, setSecondCurrency] = useState({
    label: `${defaultCurrencyCode}${
      defaultCurrency?.Currency ? ` (${defaultCurrency?.Currency})` : ""
    }`,
    value: defaultCurrencyCode?.toLowerCase(),
  });

  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1);
  const [secondCurrencyValue, setSecondCurrencyValue] = useState("");
  const { data: firstCurrencyData } = useSWR(
    `/v6/${API_KEY}latest/${firstCurrency?.value?.toUpperCase()}`
  );
  const [conversionRates, setConversionRates] = useState(
    firstCurrencyData?.conversion_rates
  );

  useEffect(() => {
    setSecondCurrencyValue("");
    setConversionRates(firstCurrencyData?.conversion_rates);
    setSecondCurrencyValue(
      convert(
        firstCurrencyValue,
        firstCurrencyData?.conversion_rates?.[
          secondCurrency?.value?.toUpperCase()
        ]
      )
    );
  }, [firstCurrencyData]);

  useEffect(() => {
    initialRef?.current?.focus();
  }, []);

  const handleValueChange = (value, conversionRates) => {
    setFirstCurrencyValue(value);
    setSecondCurrencyValue(
      convert(value, conversionRates?.[secondCurrency?.value.toUpperCase()])
    );
  };

  const handleCurrencyChange = ({ event, action }, callback) => {
    callback(event);
    if (action === "secondCurrency") {
      setSecondCurrencyValue(
        convert(
          firstCurrencyValue,
          conversionRates[event?.value?.toUpperCase()]
        )
      );
    }
  };

  const handleSwapCurrencies = () => {
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstCurrency);
  };

  return (
    <>
      <HeadSeo title={"Chuyen Doi Tien"} />
      <Layout>
        <div className=" pt-28 max-w-3xl m-auto">
          <TitlePage>Chuyển đổi tiền tệ</TitlePage>
          <input
            type="number"
            min="0"
            value={firstCurrencyValue}
            onChange={(e) => handleValueChange(e.target.value, conversionRates)}
            ref={initialRef}
            className="w-full px-3 py-5 text-3xl border border-black focus:shadow-blog-l  focus:outline-none focus:ring-none focus:translate-y-blog-4m hover:shadow-blog-l dark:hover:shadow-blog-d dark:hover:bg-gray-800 hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
          />
          <div className="w-full mt-4 lg:flex lg:justify-between">
            <div>
              <SelectBox
                name="firstCurrency"
                value={firstCurrency}
                flagSelect={firstCurrency?.value}
                options={currencies}
                handleChange={(
                  event = firstCurrency?.value,
                  action = "firstCurrency"
                ) => handleCurrencyChange({ event, action }, setFirstCurrency)}
              />
            </div>
            <div className="flex justify-center items-center mt-3 mb-2 lg:mb-2 lg:mt-0">
              <button
                onClick={handleSwapCurrencies}
                className="p-3 bg-white hover:bg-gray-50 border border-gray-600"
              >
                <SwitchHorizontalIcon className="h-6 w-6" />
              </button>
            </div>
            <div>
              <SelectBox
                value={secondCurrency}
                name="secondCurrency"
                flagSelect={secondCurrency?.value}
                options={currencies}
                handleChange={(
                  event = secondCurrency?.value,
                  action = "secondCurrency"
                ) => handleCurrencyChange({ event, action }, setSecondCurrency)}
              />
            </div>
          </div>
          <div className="flex mt-10 justify-between">
            <div className="text-xl hidden md:block w-96">
              <CurrencyFormat
                value={firstCurrencyValue}
                displayType={"text"}
                thousandSeparator={true}
              />
              {firstCurrency?.label}{" "}
            </div>
            <div className="hidden md:block">
              <ArrowRightIcon className="h-6 w-6" />
            </div>
            <div className="text-xl w-96 text-right ">
              <div className="font-medium block md:hidden">Kết Quả: </div>
              <CurrencyFormat
                value={secondCurrencyValue}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              {secondCurrency?.label}
            </div>
          </div>
          <div className="border border-gray-300 bg-gray-300 w-full mt-4" />
          <div className="mt-3 text-gray-500 ">
            <i>
              Cập nhật lần cuối vào:{" "}
              {getDate(firstCurrencyData?.time_last_update_utc)}
            </i>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CurrencyConverter;
