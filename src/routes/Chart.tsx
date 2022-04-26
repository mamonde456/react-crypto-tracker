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
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const chartData = data?.map((data) => ({
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
                data: chartData,
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
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
