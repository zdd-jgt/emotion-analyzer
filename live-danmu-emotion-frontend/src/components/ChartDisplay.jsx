import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ChartDisplay = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: "情绪分布",
            },
            tooltip: {},
            xAxis: {
                data: ["正面", "中性", "负面"]
            },
            yAxis: {},
            series: [
                {
                    name: "数量",
                    type: "bar",
                    data: [
                        data.positive || 0,
                        data.neutral || 0,
                        data.negative || 0
                    ],
                },
            ],
        };
        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default ChartDisplay;
