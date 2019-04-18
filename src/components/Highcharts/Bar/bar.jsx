import React, { Component } from 'react';
import Highcharts from 'highcharts';

import {
    Tooltip, HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, ColumnSeries
} from 'react-jsx-highcharts';

const plotOptions = {
    series: {
        dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b> {point.y:,.0f}',
            softConnector: true
        }
    }
};

function Bar({ ...props }) {
    const { classes, title, subTitle, vAlign, titleX, titleY, data } = props;

    return (<div className="app">
        <HighchartsChart plotOptions={plotOptions}>
            <Chart />
            <Tooltip shape="square" split />
            <Title>{title}</Title>

            <Subtitle>{subTitle}</Subtitle>

            <Legend />

            <XAxis categories={data.labels}>
                <XAxis.Title>{titleX}</XAxis.Title>

            </XAxis>

            <YAxis >
                <YAxis.Title>{titleY}</YAxis.Title>
                {data.series.map(s => {
                   // console.log(s.data);
                    return (<ColumnSeries key={s.name} name={s.name} data={s.data} />);
                })
                }
            </YAxis>
        </HighchartsChart>
    </div>);
}

export default withHighcharts(Bar, Highcharts);