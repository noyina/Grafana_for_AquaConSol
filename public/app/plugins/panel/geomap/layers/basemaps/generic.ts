import Map from 'ol/Map';
//import Overlay from 'ol/Overlay.js';
import {Image as ImageLayer} from 'ol/layer.js';
//import TileLayer from 'ol/layer/Tile';
import {Projection, transformExtent} from 'ol/proj.js';
//import ImageWMS from 'ol/source/ImageWMS.js';
import ImageStatic from 'ol/source/ImageStatic.js';
//import XYZ from 'ol/source/XYZ';

import { MapLayerRegistryItem, MapLayerOptions, GrafanaTheme2, EventBus } from '@grafana/data';






export interface XYZConfig {
  url: string;
  attribution: string;
  minZoom?: number;
  maxZoom?: number;
}

const sampleURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer';
export const defaultXYZConfig: XYZConfig = {
  url: sampleURL + '/tile/{z}/{y}/{x}',
  attribution: `Tiles © <a href="${sampleURL}">ArcGIS</a>`,
};

export const xyzTiles: MapLayerRegistryItem<XYZConfig> = {
  id: 'xyz',
  name: 'XYZ Tile layer',
  description: 'Add map from a generic tile layer',
  isBaseMap: true,

  create: async (map: Map, options: MapLayerOptions<XYZConfig>, eventBus: EventBus, theme: GrafanaTheme2) => ({
    init: () => {
      const cfg = { ...options.config };
      if (!cfg.url) {
        cfg.url = defaultXYZConfig.url;
        cfg.attribution = cfg.attribution ?? defaultXYZConfig.attribution;
      }
      const Extent = transformExtent([ 15.381535,47.013604,15.488855,46.941822],'EPSG:4326', 'EPSG:3857')
      return new ImageLayer({
        source: new ImageStatic({
          url: cfg.url,
          attributions: cfg.attribution,
          crossOrigin: "",
          imageSize:[8267,8267],
          imageExtent:Extent,
          interpolate:false,
          projection: new Projection({
           
           code:'EPSG:3857',
          
           
           
           
          })
          
          
          
                     // singular?
        }),
        //minResolution:3500,
        //maxResolution:5500,
        minZoom: 1,
        maxZoom: 20,
        
        
        
        
        
      });
    },
    registerOptionsUI: (builder) => {
      builder
        .addTextInput({
          path: 'config.url',
          name: 'URL template',
          description: 'Must include {x}, {y} or {-y}, and {z} placeholders',
          settings: {
            placeholder: defaultXYZConfig.url,
          },
        })
        .addTextInput({
          path: 'config.attribution',
          name: 'Attribution',
          settings: {
            placeholder: defaultXYZConfig.attribution,
          },
        });
    },
  }),
};

export const genericLayers = [xyzTiles];
