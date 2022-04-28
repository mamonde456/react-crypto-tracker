import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  margin: 30px 0px;
`;

const Tap = styled.span`
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px 10px;
  border-radius: 10px;
  span {
    font-size: 28px;
    line-height: 20px;
    &:first-child {
      color: ${(props) => props.theme.accentColor};
      font-size: 16px;
      padding: 0px 50px;
    }
  }
`;

interface IPriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const { coinId } = useOutletContext() as IPriceProps;
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      <Taps>
        <Tap>
          <span>Price: </span>
          <span>$ {data?.quotes.USD.price?.toFixed(3)}</span>
        </Tap>
        <Tap>
          <span>Market Cap: </span>
          <span>$ {data?.quotes.USD.market_cap}</span>
        </Tap>
        <Tap>
          <span>percent change 1h: </span>
          <span>{data?.quotes.USD.percent_change_1h} %</span>
        </Tap>
        <Tap>
          <span>percent change 6h: </span>
          <span>{data?.quotes.USD.percent_change_6h} %</span>
        </Tap>
        <Tap>
          <span>percent change 12h: </span>
          <span>{data?.quotes.USD.percent_change_12h} %</span>
        </Tap>
        <Tap>
          <span>percent change 24h: </span>
          <span>{data?.quotes.USD.percent_change_24h} %</span>
        </Tap>
      </Taps>
    </div>
  );
}

export default Price;
