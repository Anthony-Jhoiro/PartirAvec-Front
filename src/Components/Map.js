import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_franceHigh from "@amcharts/amcharts4-geodata/franceHigh";

am4core.useTheme(am4themes_animated);

export const selectionColor = '#93e6f5';

export class Map extends React.Component {

    componentDidMount() {
        let chart = am4core.create("world-map", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;
        // chart.geodata = am4geodata_franceHigh;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"];
        polygonSeries.data = [{
            id: 'FR',
            fill: am4core.color(selectionColor)
        }];

        // Configure series
        formatTemplate(polygonSeries.mapPolygons.template);

        let polygonTemplate = polygonSeries.mapPolygons.template;

        formatTemplate(polygonTemplate);

        polygonTemplate.events.on("hit", ev => {
            // zoom to an object
            ev.target.series.chart.zoomToMapObject(ev.target);

            // Si la France est cliquée, on charge les régions
            if (ev.target.dataItem.dataContext.id === 'FR') {
                let franceSerie = chart.series.push(new am4maps.MapPolygonSeries());
                franceSerie.geodata = am4geodata_franceHigh;
                formatTemplate(franceSerie.mapPolygons.template);

            } else if (chart.series.length > 1) {
                chart.series.pop();
            }
        });


        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color(selectionColor);


        // France detail
        function formatTemplate(template) {
            template.tooltipText = "{name}";
            template.fill = am4core.color("#a5a5a5");

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
        return (
            <div className="map-container">
                <div id="world-map"/>
            </div>
        );
    }
}
