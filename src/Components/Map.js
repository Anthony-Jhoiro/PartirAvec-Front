import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldUltra from "@amcharts/amcharts4-geodata/worldUltra";
import am4geodata_lang_FR from "@amcharts/amcharts4-geodata/lang/FR"

import httpService from "../Services/httpService";

am4core.useTheme(am4themes_animated);

/*
Couleurs :
- #93e6f5 && #acacac
- #cccccc && #0077ff
 */

export const selectionColor = '#93e6f5';
export const backgroundColor = '#acacac'

export class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationData : []
        }
    }

    componentDidMount() {
        this.setUpChart();
    }

    setUpChart() {
        // Set up chart
        let chart = am4core.create("world-map", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldUltra;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"];

        chart.geodataNames = am4geodata_lang_FR;

        httpService.getAxiosClient().get(process.env.REACT_APP_API_LOCATION + '/destinationservice/countries')
            .then(data => {
                if (data.data) {
                    polygonSeries.data = data.data.map(country => {
                        return {
                            id: country.code,
                            fill: am4core.color(selectionColor)
                        }
                    })
                }
            });

        // Configure series
        formatTemplate(polygonSeries.mapPolygons.template);

        let polygonTemplate = polygonSeries.mapPolygons.template;

        formatTemplate(polygonTemplate);

        let destinationSerie = chart.series.push(new am4maps.MapImageSeries());
        let destinationSerieTemplate = destinationSerie.mapImages.template;

        let circle = destinationSerieTemplate.createChild(am4core.Circle);
        circle.radius = 8;
        circle.fill = am4core.color("#B27799");
        circle.stroke = am4core.color("#FFFFFF");
        circle.strokeWidth = 4;
        circle.nonScaling = true;
        circle.tooltipText = "{title}";
        destinationSerieTemplate.propertyFields.latitude = "lat";
        destinationSerieTemplate.propertyFields.longitude = "lng";

        polygonTemplate.events.on("hit", ev => {
            // zoom to an object
            ev.target.series.chart.zoomToMapObject(ev.target);
            const countryCode = ev.target.dataItem.dataContext.id;
            httpService.getAxiosClient().get(process.env.REACT_APP_API_LOCATION+'/destinationservice/destinations/country/'+countryCode)
                .then(response => {
                    destinationSerie.data = response.data;
                })

        });


        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color(selectionColor);


        function formatTemplate(template) {
            template.tooltipText = "{name}";
            template.fill = am4core.color(backgroundColor);

            template.propertyFields.fill = 'fill';

            // Create hover state and set alternative fill color
            let hoverState = template.states.create("hover");
            hoverState.properties.fill = am4core.color(selectionColor);
        }

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        if (this.chart) {

        }

        return (
            <div className={"map-container"}>
                <div id="world-map"/>
            </div>
        );
    }
}
