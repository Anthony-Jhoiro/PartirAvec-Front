import React from "react";
import {Link} from "react-router-dom";
import './MainPage.scss';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

class MainPage extends React.Component{

    componentDidMount() {
        this.setUpMap();
    }


    render() {
        return (
            <main id={'main-page'}>
                <h1 className={'main-title'}>Où voudrais tu partir avec moi ?</h1>

                <div id="map" />
                <button className={'start-link'}>
                    <Link to={"/map"}>On y va !</Link>
                </button>
            </main>
        )
    }



    setUpMap() {
        var chart = am4core.create("map", am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Orthographic();
        chart.deltaLatitude = -30;

// Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.north = 90;
        polygonSeries.south = -90;

// Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        // polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#d7e7ce");
        polygonTemplate.stroke = am4core.color("#aaa");
        polygonTemplate.strokeWidth = 1;

        setTimeout(function(){
            chart.animate({property:"deltaLongitude", to:100000}, 20000000);
        }, 3000)



        chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
        chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    }

}

export default MainPage;
