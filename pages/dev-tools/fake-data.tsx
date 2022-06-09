import React, { ChangeEvent, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { axios } from "../../lib/axios";
import { GeneratedType, OutputFormat } from "../../types";
import { truncate, downloadObjectAsJson, downloadObjectAsSQL, copyData } from "../../utils";
import { Select } from "../../components/PageComponents/FakeComponnets/Select";
import { OPTIONS } from "../../config";
import Navbar from "../../components/DevPageComponents/Navbar";
import { SocialButtons } from "../../components/PageComponents/FakeComponnets/SocialButtons";
import { SAMPLE_CODE } from "../../components/PageComponents/FakeComponnets/CodeEditor";
import { Spinner } from "@components/PageComponents/FakeComponnets/Spinner";
import { ActionButton } from "@components/PageComponents/FakeComponnets/ActionButton";
const TextEditor = dynamic(import("@components/PageComponents/FakeComponnets/CodeEditor"), {
  ssr: false,
});

export default function FakeData() {
  const [loading, setLoading] = useState<boolean>();
  const [options, setOptions] = useState(OPTIONS);
  const [value, setValue] = useState<string>(SAMPLE_CODE);
  const [result, setResult] = useState<GeneratedType[]>([]);

  const process = useCallback(async () => {
    setLoading(true);
    const jsonData = await axios.post("/api/generateFakeData", {
      value,
      scale: options.scale,
      numberMax: options.numberMax,
    });
    setResult(jsonData.data as unknown as GeneratedType[]);
    setLoading(false);
  }, [value, options]);

  const downloadFile = useCallback(
    (result: GeneratedType) => downloadObjectAsJson(result.data, result.name),
    []
  );

  const downloadSQLFile = useCallback(
    (result: GeneratedType) => downloadObjectAsSQL(result),
    []
  );

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setResult([]);
    setOptions({ ...options, [event.target.name]: event.target.value });
  };

  const renderHeaders = useCallback(
    (data: unknown[]) =>
      Object.keys(data[0]).map((key, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {key.toUpperCase()}
        </th>
      )),
    []
  );

  return (
    <>
    <Navbar/>
      <div className="overflow-hidden flex flex-row bg-gray-700">
        <div className="w-2/5">
          {/* @ts-ignore */}
          <TextEditor
            theme="vs-dark"
            value={value}
            height={"100vh"}
            onChange={setValue}
          />
        </div>
        <div className="w-1/2 h-screen flex-1 overflow-y-auto">
          <SocialButtons/>
          <div className="flex justify-between mb-5 bg-gray-700 border-b border-gray-500 p-4">
            <Select
              name="scale"
              label="Scale (Number Of Rows)"
              options={[10, 100, 200]}
              value={options.scale}
              onChange={onSelectChange}
            />
            <Select
              name="numberMax"
              label="Integer Max Value"
              options={[50, 100, 150]}
              value={options.numberMax}
              onChange={onSelectChange}
            />
            <button
              disabled={loading}
              onClick={process}
              className={`w-40 h-10 rounded-full bg-indigo-500 text-white transition self-end ${!loading && "hover:bg-indigo-800"
                } focus:outline-none disabled:opacity-50`}
            >
              Generate Data
            </button>
          </div>
          <div className="p-5 ">
            {loading && <Spinner className=" text-center" />}
            {result.map((res) => (
              <React.Fragment key={res.name}>
                <div className="mb-5 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-50">
                    {res.name}
                    <span className="text-sm text-gray-100">
                      (Number Of Rows: {options.scale})
                    </span>
                  </h3>
                  <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <ActionButton
                      title="JSON"
                      items={[
                        { name: "Copy", onClick: () => copyData(res.data, OutputFormat.JSON) },
                        { name: "Download", onClick: () => downloadFile(res) },
                      ]} />
                    <ActionButton
                      title="SQL"
                      items={[
                        { name: "Copy", onClick: () => copyData(res, OutputFormat.SQL) },
                        { name: "Download", onClick: () => downloadSQLFile(res) },
                      ]} />
                  </div>
                </div>
                <div className="shadow border-b border-gray-200 overflow-auto mb-5">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>{renderHeaders(res.data)}</tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {res.data.slice(0, 5).map((dt, i) => (
                        <tr key={i}>
                          {Object.values(dt).map((k, kIndex) => (
                            <td
                              key={kIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              <span className="">
                                {truncate(k as string, 20)}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

     
    </>

  );
}
