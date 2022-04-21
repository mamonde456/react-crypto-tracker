import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 10px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
`;

const InFo = styled.ul`
  background: #222027;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 35px;
  border-radius: 15px;
  margin-top: 50px;
`;
const InFoLi = styled.li`
  width: 25vh;
  height: 10vh;
  font-size: 16px;
  text-align: center;
  padding-top: 15px;
  color: white;
  span {
    display: block;
    padding-top: 15px;
    font-size: 25px;
    font-weight: 700;
  }
`;

const StartAt = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 16px;
  opacity: 0.5;
  text-align: center;
  margin-top: 40px;
  color: white;
`;

const Discription = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 25px;
  margin-top: 10px;
  color: white;
  margin-bottom: 40px;
`;

interface RouterState {
  state: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>{state ? state : loading ? "loading..." : info?.name}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      <InFo>
        <InFoLi>
          Rank: <span>{info?.rank}</span>
        </InFoLi>
        <InFoLi>
          Symbol: <span>{info?.symbol}</span>
        </InFoLi>
        <InFoLi>
          Open Source: <span>{info?.open_source ? "Yes" : "No"}</span>
        </InFoLi>
      </InFo>
      <StartAt>{info?.started_at}</StartAt>
      <Discription>{info?.description}</Discription>
      <InFo>
        <InFoLi>
          Total Supply: <span>{priceInfo?.total_supply}</span>
        </InFoLi>
        <InFoLi>
          Max Supply: <span>{priceInfo?.max_supply}</span>
        </InFoLi>
      </InFo>
    </Container>
  );
}

export default Coin;
