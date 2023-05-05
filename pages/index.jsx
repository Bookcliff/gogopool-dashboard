import React from "react";
import { Button, Col, Row, Statistic, Card } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContractReads } from "wagmi";
import {useIsMounted} from '../hooks/mounted'
const { ethers } = require("ethers");

import minipoolManagerABI from "../abis/minipoolmanager.json";
const weiValue = ethers.BigNumber.from('1000000000000000000'); // represents 1 Ether in wei (10^18)

const minipoolmanagerContract = {
  address: "0xc8de41c35fb389286546cf4107102a7656da7037",
  abi: minipoolManagerABI,
};
export default function Home() {
  const isMounted = useIsMounted()

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...minipoolmanagerContract,
        functionName: "getMinipoolCount",
      },
      {
        ...minipoolmanagerContract,
        functionName: "getTotalAVAXLiquidStakerAmt",
      },
    ],
  });

  const { data: minipoolData, isLoading: isLoadingMinipools } = useContractReads({
    contracts: [
      {
        ...minipoolmanagerContract,
        functionName: "getMinipools",
        args: [2, 0, 100]
      },
    ],
  });
  console.log({minipoolData})
  
  if (!isMounted) return null

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Card loading={isLoading} bordered={false}>
          <Statistic
            title="Active Minipools"
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            value={data?.[0].toNumber()}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card loading={false} bordered={false}>
          <Statistic
            title="AVAX Staked by Liquid Stakers"
            value={data?.[1].div(weiValue).toNumber()}
            precision={0}
          />
        </Card>
      </Col>
    </Row>
  );
}
