
//import React,{useState} from 'react'
import * as _ from 'lodash';
import * as L from './libs/leaflet';
import WorldmapCtrl from './worldmap_ctrl';


//import DashboardPanel from '/mnt/c/Users/Sub/Documents/Programing/Dev_Grafana/grafana/public/app/features/dashboard/dashgrid/DashboardPanel'


//const imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg'
const topmapatr = 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>';

const tileServers = {
  'CartoDB Positron': {
    url: 'https://maps{s}.wien.gv.at/basemap/bmapgrau/{type}/google3857/{z}/{y}/{x}.{format}',
    attribution: topmapatr,
    subdomains: ["", "1", "2", "3", "4"],
    type: 'normal',
    format: 'png',
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
  },
  'CartoDB Dark': {
    url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
  },
};

export default class WorldMap {
  ctrl: WorldmapCtrl;
  mapContainer: any;
  circles: any[];
  polygon: any[];
  map: any;
  legend: any;
  circlesLayer: any;
  blend:any;

  constructor(ctrl, mapContainer) {
    this.ctrl = ctrl;
    this.mapContainer = mapContainer;
    this.circles = [];
  }

  createMap() {
    const mapCenter = (<any>window).L.latLng(
      parseFloat(this.ctrl.panel.mapCenterLatitude),
      parseFloat(this.ctrl.panel.mapCenterLongitude)
    );


    this.map = L.map(this.mapContainer, {
      worldCopyJump: true,
      preferCanvas: true,
      center: mapCenter,
      zoom: parseInt(this.ctrl.panel.initialZoom, 10) || 1,
    });
    this.setMouseWheelZoom();



    const selectedTileServer = tileServers[this.ctrl.tileServer];
    (<any>window).L.tileLayer(selectedTileServer.url, {
      maxZoom: 18,
      subdomains: selectedTileServer.subdomains,
      reuseTiles: true,
      detectRetina: true,
      attribution: selectedTileServer.attribution,
      type: selectedTileServer.type,
      format: selectedTileServer.format,
      bounds: selectedTileServer.bounds
    }).addTo(this.map);

    this.Blendmap();
    
  }

  Blendmap(){
    var imageUrl = 'https://jr-aquaconsol.nextcloud.hosting/index.php/apps/files/?dir=/&openfile=8184';
    var imageBounds = [[47.013604 , 15.381535], [46.941822 , 15.488855]];
    this.map.blend = (<any>window).L.imageOverlay(imageUrl, imageBounds,{opacity:0.25,className:"ImageO"}).addTo(this.map);
  }

  //removeBlend() {
    //this.map.removeLayer(this.map.blend);
   // this.blend = null;
 // }
  



  createLegend() {
    this.legend = (<any>window).L.control({ position: 'bottomleft' });
    this.legend.onAdd = () => {
      this.legend._div = (<any>window).L.DomUtil.create('div', 'info legend');
      this.legend.update();
      return this.legend._div;
    };

    this.legend.update = () => {
      let legendHtml1 = '';
      let legendHtml2 = '';
      let legendHtml3 = '';
      let legendHtml4 = '';
      let legendHtml5 = '';
      let legendHtml6 = '';
      let legendHtml7 = '';
      let legendHtml8 = '';
      let legendHtml9 = '';
      let legendHtml10 = ';'
      legendHtml9 = '<div class="legend-itemo">' +'<span style="font-weight:bold">'+'Einzugsgebiet - Mittlere Verweilzeit [d]'+'</span>' +'</div>';
      legendHtml10 = '<div class="legend-itemo">' +'<span style="font-weight:bold">'+'Messstellen'+'</span>' +'</div>';
      legendHtml4 = '<div class="legend-item"><i style="background:#E53170;strokestyle:red"></i> ' +"             "+ '< 60 ' +'</div>';
      legendHtml5 = '<div class="legend-item"><i style="background:orange;strokestyle:red"></i> ' +'  60 -   < 120 ' +'</div>';
      legendHtml6 = '<div class="legend-item"><i style="background:yellow;strokestyle:red"></i> ' +'120 -   < 365 ' +'</div>';
      legendHtml7 = '<div class="legend-item"><i style="background:#50FF33;strokestyle:red"></i> ' +'365 -   < 730 ' +'</div>';
      legendHtml8 = '<div class="legend-item"><i style="background:#1C860A;strokestyle:red"></i> ' +'730 - < 1095 ' +'</div>';
      let urlsel = window.location.href;
      //const num =4
      var dash = urlsel.split("/");
      if (dash[4] == "E5V3EtjGk") {
        legendHtml1 =
          '<div class="legend-item"><i style="background:' +
          'blue;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Aktiv" +
          '</div>';
        legendHtml2 = '<div class="legend-item"><i style="background:' +
          'Aqua;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Inaktiv" +
          '</div>';
        legendHtml3 = '<div class="legend-item"><i style="background:' +
          'DarkViolet;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Online" +
          '</div>';
          
        this.legend._div.innerHTML = legendHtml10 + legendHtml1 + legendHtml2 + legendHtml3 + legendHtml9 + legendHtml4 + legendHtml5 + legendHtml6 + legendHtml7 + legendHtml8;
      }
      if (dash[4] == "paAiQwXMk") {
        legendHtml1 =
          '<div class="legend-item"><i style="background:' +
          'red;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Aktiv" +
          '</div>';
        legendHtml2 =
          '<div class="legend-item"><i style="background:' +
          'Orange;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Inaktiv" +
          '</div>';
        this.legend._div.innerHTML = legendHtml10 + legendHtml1 + legendHtml2 + legendHtml9 + legendHtml4 + legendHtml5 + legendHtml6 + legendHtml7 + legendHtml8;;
      }
      if (dash[4] == "eambti3Mz") {
        legendHtml1 =
          '<div class="legend-item"><i style="background:' +
          'red;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Aktiv" +
          '</div>';
        legendHtml2 =
          '<div class="legend-item"><i style="background:' +
          'Orange;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Inaktiv" +
          '</div>';
        this.legend._div.innerHTML = legendHtml10 + legendHtml1 + legendHtml2 + legendHtml9 + legendHtml4 + legendHtml5 + legendHtml6 + legendHtml7 + legendHtml8;;
      }
      if (dash[4] == "wai8M8XGk") {
        legendHtml1 =
          '<div class="legend-item"><i style="background:' +
          'blue;border-radius:50%' +
          '"></i> ' +
          '--> ' +
          "Aktive Messstellen" +
          '</div>';
          this.legend._div.innerHTML = legendHtml10 + legendHtml1 + legendHtml9 + legendHtml4 + legendHtml5 + legendHtml6 + legendHtml7 + legendHtml8;
      }

    };
    this.legend.addTo(this.map);
  }

  needToRedrawCircles(data) {
    if (this.circles.length === 0 && data.length > 0) {
      return true;
    }

    if (this.circles.length !== data.length) {
      return true;
    }

    const locations = _.map(_.map(this.circles, 'options'), 'location').sort();
    const dataPoints = _.map(data, 'key').sort();
    return !_.isEqual(locations, dataPoints);
  }

  filterEmptyAndZeroValues(data) {
    return _.filter(data, o => {
      return !(this.ctrl.panel.hideEmpty && _.isNil(o.value)) && !(this.ctrl.panel.hideZero && o.value === 0);
    });
  }

  clearCircles() {
    if (this.circlesLayer) {
      this.circlesLayer.clearLayers();
      this.removeCircles();
      this.circles = [];
    }
  }

  drawCircles() {
    const data = this.filterEmptyAndZeroValues(this.ctrl.data);
    if (this.needToRedrawCircles(data)) {
      this.clearCircles();
      this.createCircles(data);
    } else {
      this.updateCircles(data);
    }
  }

  createCircles(data) {
    const circles: any[] = [];
    data.forEach(dataPoint => {
      if (!dataPoint.locationName) {
        return;
      }
      circles.push(this.createCircle(dataPoint));
    });
    this.circlesLayer = this.addCircles(circles);
    this.circles = circles;
  }







  updateCircles(data) {
    data.forEach(dataPoint => {
      if (!dataPoint.locationName) {
        return;
      };
      const circle = _.find(this.circles, cir => {
        return cir.options.location === dataPoint.key;
      });
      if (circle) {
        circle.setRadius(this.calcCircleSize(dataPoint.value || 0));

        circle.setStyle({
          color: this.getColorbykey(dataPoint.locationName),
          fillColor: this.getColorbykey(dataPoint.locationName),
          fillOpacity: 0.5,
          location: dataPoint.key,
        });

        circle.unbindPopup();
        this.createPopup(circle, dataPoint.locationName, dataPoint.valueRounded);
      }
    })
  }

  createCircle(dataPoint) {
    const circle = (<any>window).L.circleMarker([dataPoint.locationLatitude, dataPoint.locationLongitude], {
      radius: this.calcCircleSize(dataPoint.value || 0),
      color: this.getColorbykey(dataPoint.locationName),
      fillColor: this.getColorbykey(dataPoint.locationName),
      fillOpacity: 0.5,
      location: dataPoint.key,
    });

    this.createPopup(circle, dataPoint.locationName, dataPoint.valueRounded);
    return circle;
  }

  calcCircleSize(dataPointValue) {
    const circleMinSize = parseInt(this.ctrl.panel.circleMinSize, 10) || 2;
    const circleMaxSize = parseInt(this.ctrl.panel.circleMaxSize, 10) || 30;

    if (this.ctrl.data.valueRange === 0) {
      return circleMaxSize;
    }
    
    
    const dataFactor = (dataPointValue - this.ctrl.data.lowestValue) / this.ctrl.data.valueRange;
    const circleSizeRange = circleMaxSize - circleMinSize;
    const urlsel = window.location.href;
      //const num =4
      var dash = urlsel.split("/");
      if(dash[4]==="E5V3EtjGk"){
        if(dataPointValue === 15){
          return (circleSizeRange * dataFactor + circleMinSize)+2}
          if(dataPointValue === 26){
            return (circleSizeRange * dataFactor + circleMinSize)+2}
            if(dataPointValue === 31){
              return (circleSizeRange * dataFactor + circleMinSize)+2}
      }
   
    return circleSizeRange * dataFactor + circleMinSize;

  }

  createPopup(circle, locationName, value) {
    //const unit = value && value === 1 ? this.ctrl.panel.unitSingular : this.ctrl.panel.unitPlural;
    const label = (locationName).trim();
    // + ': ' + value + ' ' + (unit || '')
    circle.bindPopup(label, {
      offset: (<any>window).L.point(0, -2),
      className: 'worldmap-popup',
      closeButton: this.ctrl.panel.stickyLabels,
    });

    circle.on('mouseover', function onMouseOver(evt) {
      const layer = evt.target;
      layer.bringToFront();
      this.openPopup();
    });

    circle.on('click', function () {

      //var Station = label;
      // const urlsel = 'http://aquas04.joanneum.at:3000/d/paAiQwXMk/probeliste?viewPanel=2&orgId=2&var-Gruppe=Oe_TWV-RW&var-Station=' + Station[0]

      const urlsel = window.location.href;
      //const num =4
      var dash = urlsel.split("/");
      switch (dash[4]) {
        case "wai8M8XGk":
          let map = urlsel.split('?');
          window.open(map[0] + "?viewPanel=" + value + "&orgId=2");
          this.unbind();
          break;
        case "E5V3EtjGk":
          let gwmap = urlsel.split('?');
          window.open(gwmap[0] + "?viewPanel=" + value + "&orgId=2");
          this.unbind();
          break;
        case "paAiQwXMk":
          let Qmap = urlsel.split('?');
          window.open(Qmap[0] + "?viewPanel=2&orgId=2&var-Gruppe=Oe_TWV-RW&var-Station=" + label);
          this.unbind();
          break;
        case "eambti3Mz":
          let Qlmap = urlsel.split('?');
          window.open(Qlmap[0] + "?viewPanel=2&orgId=2&var-Gruppe=Oe_TWV-RW&var-Station=" + label);
          this.unbind();
          break;
        default:
          alert("Wrong Dashboard ID")
          break;

      }



      //window.open(urlsel);
      //let panel = new DashboardPanel    //panel.this.state.isVieving = true;

    });

    






    if (!this.ctrl.panel.stickyLabels) {
      circle.on('mouseout', function onMouseOut() {
        circle.closePopup();
      });
    }
  }


  getColorbykey(locationName) {
    const urlsel = window.location.href;
    //const num =4
    var dash = urlsel.split("/");

    if (dash[4] == "E5V3EtjGk") {
      if (locationName == 'uw3524') {
        return 'Aqua';
      }
      else if (locationName == 'uw3538') {
        return 'Aqua';
      }
      else if (locationName == 'uw3536') {
        return 'Aqua';
      }
      else if (locationName == 'uw3544') {
        return 'Aqua';
      }
      else if (locationName == 'uw35446') {
        return 'Aqua';
      }
      else if (locationName == 'uw3542') {
        return 'Aqua';
      }
      else if (locationName == 'uw3560') {
        return 'Aqua';
      }
      else if (locationName == 'uw35668') {
        return 'Aqua';
      }
      else if (locationName == 'uw35265') {
        return 'Aqua';
      }
      else if (locationName == 'uw3522') {
        return 'Aqua';
      }
      else if (locationName == 'uw3546') {
        return 'Aqua';
      }
      else if (locationName == 'uw3566') {
        return 'DarkViolet';
      }
      else if (locationName == 'uw3552') {
        return 'DarkViolet';
      }
      else if (locationName == 'uw3556') {
        return 'DarkViolet';
      }
      else return "blue";
    }

    if (dash[4] == "paAiQwXMk") {
      if (locationName == 'WVUG077') {
        return 'Orange';
      }
      else if (locationName == 'WVUG159') {
        return 'Orange';
      }
      else if (locationName == 'WVUG173') {
        return 'Orange';
      }
      else if (locationName == 'WVUG140') {
        return 'Orange';
      }
      else if (locationName == 'WVUG205') {
        return 'Orange';
      }
      else if (locationName == 'WVUG204') {
        return 'Orange';
      }
      else if (locationName == 'WVUG143') {
        return 'Orange';
      }
      else if (locationName == 'WVUG543') {
        return 'Orange';
      }
      else if (locationName == 'WVUG140a') {
        return 'Orange';
      }
      else return "red";
    }
    if (dash[4] == "eambti3Mz") {
      if (locationName == 'PG60608232') {
        return 'Orange';
      }
      else if (locationName == 'PG60608222') {
        return 'Orange';
      }
      else if (locationName == 'PG60657102') {
        return 'Orange';
      }
      else if (locationName == 'PG60624422') {
        return 'Orange';
      }
      else if (locationName == 'PG60624212') {
        return 'Orange';
      }
      else if (locationName == 'PG60624212') {
        return 'Orange';
      }
      else if (locationName == 'PG60624202') {
        return 'Orange';
      }
      else return "red";
    }
    if (dash[4] == "wai8M8XGk") return 'Blue';
    return
  }


  getColor(value) {
    for (let index = this.ctrl.data.thresholds.length; index > 0; index -= 1) {
      if (value >= this.ctrl.data.thresholds[index - 1]) {
        return this.ctrl.panel.colors[index];
      }
    }
    return _.first(this.ctrl.panel.colors);
  }

  resize() {
    this.map.invalidateSize();
  }

  panToMapCenter() {
    this.map.panTo([parseFloat(this.ctrl.panel.mapCenterLatitude), parseFloat(this.ctrl.panel.mapCenterLongitude)]);
    this.ctrl.mapCenterMoved = false;
  }

  removeLegend() {
    this.legend.remove(this.map);
    this.legend = null;
  }

  setMouseWheelZoom() {
    this.map.scrollWheelZoom.disable();

        window.addEventListener("keydown",(event)=>{
          if(event.keyCode == 16) this.map.scrollWheelZoom.enable();

        });
        window.addEventListener("keyup",(e)=>{
          if(e.keyCode == 16) this.map.scrollWheelZoom.disable();
        });
        
      
   
      
           
      
        
       
      

    
    
      //this.map.scrollWheelZoom.enable();
   // } else {
    //  this.map.scrollWheelZoom.disable();
    //}
  }

  addCircles(circles) {
    return (<any>window).L.layerGroup(circles).addTo(this.map);
  }


  removeCircles() {
    this.map.removeLayer(this.circlesLayer);
  }

  setZoom(zoomFactor) {
    this.map.setZoom(parseInt(zoomFactor, 10));
  }

  remove() {
    this.circles = [];
    if (this.circlesLayer) {
      this.removeCircles();
    }
    if (this.legend) {
      this.removeLegend();
    }
    this.map.remove();
  }
}
