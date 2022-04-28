import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  useParams,
  useLocation,
  Link,
  Outlet,
  useMatch,
  PathMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  max-width: 600px;
  margin: 0px auto;
  padding: 0px 10px;
`;

const Header = styled.header`
  height: 100px;
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
  background-color: ${(props) => props.theme.contentsTapColor};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
  border-radius: 15px;
  margin-top: 50px;
`;
const InFoLi = styled.li`
  height: 100px;
  font-size: 16px;
  text-align: center;
  padding-top: 15px;
  color: ${(props) => props.theme.contentsTextColor};
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
  color: ${(props) => props.theme.contentsTextColor};
`;

const Discription = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 25px;
  margin-top: 10px;
  ${(props) => props.theme.contentsTextColor};
  margin-bottom: 40px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  border-radius: 10px;
  text-transform: uppercase;
  background-color: ;
  font-size: 12px;
  text-align: center;
  font-weight: 400;
  padding: 15px 0px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const BackBtn = styled.div`
  width: 80px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.contentsTapColor};
  border-radius: 10px;
  border: 1px solid whitesmoke;
  text-align: center;
  a {
    display: block;
  }
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
  const { coinId } = useParams();
  const { state } = useLocation() as RouterState;
  const priceMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/price");
  const chartMatch: PathMatch<"coinId"> | null = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state ? state : loading ? "loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state ? state : loading ? "loading..." : infoData?.name}</Title>
      </Header>
      <BackBtn>
        <Link to={`/`}>↪ Back</Link>
      </BackBtn>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InFo>
            <InFoLi>
              Rank: <span>{infoData?.rank}</span>
            </InFoLi>
            <InFoLi>
              Symbol: <span>{infoData?.symbol}</span>
            </InFoLi>
            <InFoLi>
              Price: <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </InFoLi>
          </InFo>
          <StartAt>Start At: {infoData?.started_at?.slice(0, 10)}</StartAt>
          <Discription>{infoData?.description}</Discription>
          <InFo>
            <InFoLi>
              Total Supply: <span>{tickersData?.total_supply}</span>
            </InFoLi>
            <InFoLi>
              Max Supply: <span>{tickersData?.max_supply}</span>
            </InFoLi>
          </InFo>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
