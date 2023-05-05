import React from "react";
import { Tag, Table, Button } from "antd";
const { ethers } = require("ethers");

const { Column, ColumnGroup } = Table;
import { formatDistance } from "date-fns";
const weiValue = ethers.BigNumber.from("1000000000000000000"); // represents 1 Ether in wei (10^18)

const App: React.FC = ({ data, isLoading }: any) => {
  const reversedData = data.toReversed();
  console.log(data);
  return (
    <Table
      scroll={{ x: true }}
      bordered={false}
      loading={isLoading}
      dataSource={reversedData}
      pagination={{ pageSize: 5 }}
    >
      <Column
        title="Owner"
        dataIndex="5"
        key="2"
        render={(n) => {
          return (
            <Button type="ghost" href={`https://snowtrace.io/address/${n}`}>
              {n}
            </Button>
          );
        }}
      />
      <Column
        title="Node OP Avax"
        dataIndex="8"
        key="2"
        render={(n) => {
          return n.div(weiValue).toNumber();
        }}
      />
      <Column
        title="Liquid Staker Avax"
        dataIndex="9"
        key="2"
        render={(n) => {
          return n.div(weiValue).toNumber();
        }}
      />
      {/* <Column title="Node ID" dataIndex="1" key="1" /> */}
      <Column
        title="Created"
        dataIndex="11"
        key="3"
        render={(n) => {
          const date = new Date(n.toNumber() * 1000);
          const timeAgo = formatDistance(date, new Date(), { addSuffix: true });

          return timeAgo;
        }}
      />
    </Table>
  );
};

export default App;
