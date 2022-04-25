import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_open: "string";
  time_close: "string";
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  state: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const priceData = data?.map((data) => ({
    x: data.time_open,
    y: [data.open, data.high, data.low, data.close],
  }));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"
          series={
            [
              {
                name: "Price",
                data: priceData,
              },
            ] as unknown as number[]
          }
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: { curve: "smooth", width: 4 },
            xaxis: {
              labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((data) => data.time_close) as string[],
            },
            yaxis: {
              labels: { show: false },
              tooltip: {
                enabled: true,
              },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(3)}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
