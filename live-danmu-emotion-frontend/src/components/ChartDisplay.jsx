import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
function convertSentimentToBarChartData(data) {
    // 分组求平均
    const scoreMap = {};
    const countMap = {};

    data.forEach(({ label, score }) => {
        scoreMap[label] = (scoreMap[label] || 0) + score;
        countMap[label] = (countMap[label] || 0) + 1;
    });

    return Object.keys(scoreMap).map(label => ({
        label,
        avgScore: (scoreMap[label] / countMap[label]).toFixed(2)
    }));
}
const ChartDisplay = ({ data }) => {
    const chartRef = useRef(null);
    console.log(JSON.stringify(data), '====')
    const list = data.map(it => {
        return it.sentiment[0]
    })
    const chartData  = convertSentimentToBarChartData(list)
    const categories = chartData.map(item => item.label);
    const values = chartData.map(item => item.avgScore);
    console.log(chartData, '===data1')
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: '情绪分布概览',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: categories,
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {
                type: 'value',
                name: '平均置信度'
            },
            series: [
                {
                    name: '平均置信度',
                    type: 'bar',
                    barWidth: '50%',
                    data: values,
                    itemStyle: {
                        color: '#5AAEFF'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            ]
        };
        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: "434px", height: "242px" }}></div>;
};

export default ChartDisplay;
