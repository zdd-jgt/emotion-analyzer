import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ChartBar = ({ data }) => {
    const chartRef = useRef(null);
    const transformData = (data) => {
        const seriesMap = {};
        data.forEach((item, index) => {
            item.sentiment.forEach(({ label, score }) => {
                if (!seriesMap[label]) {
                    seriesMap[label] = { name: label, type: 'line', data: [] };
                }
                seriesMap[label].data.push([index, score]);
            });
        });
        return Object.values(seriesMap);
    };
    console.log(data, '===data')
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: { text: '情绪变化趋势（Score随弹幕序号变化）' },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', name: '弹幕序号', data: data.map((_, i) => i) },
            yAxis: { type: 'value', name: 'Score', min: 0, max: 1 },
            legend: { top: 'bottom' },
            series: transformData(data)
        };
        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: "434px", height: "242px" }}></div>;
};

export default ChartBar;
