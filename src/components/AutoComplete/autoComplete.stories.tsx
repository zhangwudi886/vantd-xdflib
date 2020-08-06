import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete, { DataSourceType } from "./autoComplete";
interface LakerPlayerProps {
  value: string;
  number?: number;
}
const SimpleComplete = () => {
  // const lakers: string[] = [];
  // const lakersWithNumber: any[] = [];
  // for (let i = 0; i < 10; i++) {
  //   // lakers.push(`a${i}`);
  //   // lakers.push(`b${i}`);
  //   lakersWithNumber.push({
  //     value: `aa${i}`,
  //     number: i + parseInt("" + Math.random()),
  //   });
  //   lakersWithNumber.push({
  //     value: `bb${i}`,
  //     number: i + parseInt("" + Math.random()),
  //   });
  // }
  const lakers = [
    "bradley",
    "pope",
    "caruso",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "McGee",
    "rando",
  ];
  const lakersWithNumber: DataSourceType<LakerPlayerProps>[] = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];

  // const handleFetch = (query: string) => {
  //   return lakers
  //     .filter((item) => item.includes(query))
  //     .map((name) => ({ value: name }));
  // };
  const handleFetch = (query: string) => {
    return fetch(`http://wthrcdn.etouch.cn/weather_mini`).then((res) => {
      return lakersWithNumber;
    });
  };
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((item) => item.value.includes(query));
  // };
  const renderOptions = (item: DataSourceType<LakerPlayerProps>) => {
    return (
      <>
        {/* <h1>name:{item.numebr}</h1> */}
        <p>num:{item.value}</p>
      </>
    );
  };
  return (
    <>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOptions={renderOptions}
      />
    </>
  );
};

storiesOf("AutoComplete Component", module).add("AutoComplete", SimpleComplete);
