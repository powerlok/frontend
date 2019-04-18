import React, { Component } from 'react';
import Highcharts from 'highcharts';


import {
    Tooltip, HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';

const plotOptions = {
    series: {
        /*dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b> {point.y:,.0f}',
            softConnector: true
        },*/
    },
};

class Line extends Component {
   


    render() {
        const { classes, title, subTitle, vAlign, titleX, titleY, data } = this.props;


        return (
            <HighchartsChart plotOptions={plotOptions} >
                <Chart />
                <Title>{title}</Title>

                <Tooltip shape="square" split />
                <Subtitle>{subTitle}</Subtitle>

                <Legend />

                <XAxis categories={data.labels}>
                    <XAxis.Title>{titleX}</XAxis.Title>
                </XAxis>

                <YAxis>
                    <YAxis.Title>{titleY}</YAxis.Title>
                    {data.series.map(s => {
                        return (<LineSeries key={s.name} name={s.name} data={s.data} />);
                    })
                    }
                </YAxis>

            </HighchartsChart>
        );
    }
}

export default withHighcharts(Line, Highcharts);