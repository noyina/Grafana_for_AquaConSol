import Map from 'ol/Map';
import {Image as ImageLayer} from 'ol/layer.js';
//import TileLayer from 'ol/layer/Tile';
import {transformExtent} from 'ol/proj.js';
//import ImageWMS from 'ol/source/ImageWMS.js';
import Static from 'ol/source/ImageStatic.js';
//import XYZ from 'ol/source/XYZ';

import { MapLayerRegistryItem, MapLayerOptions, GrafanaTheme2, EventBus } from '@grafana/data';





export interface Staticlay {
  url: string;
  attribution: string;
  minZoom?: number;
  maxZoom?: number;
}

const sampleURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer';
export const defaultStaticConfig: Staticlay = {
  url: sampleURL + '/tile/{z}/{y}/{x}',
  attribution: `Tiles © <a href="${sampleURL}">ArcGIS</a>`,
};

export const Statictile: MapLayerRegistryItem<Staticlay> = {
  id: 'xyz',
  name: 'XYZ Tile layer',
  description: 'Add map from a generic tile layer',
  isBaseMap: true,

  create: async (map: Map, options: MapLayerOptions<Staticlay>, eventBus: EventBus, theme: GrafanaTheme2) => ({
    init: () => {
      const cfg = { ...options.config };
      if (!cfg.url) {
        cfg.url = defaultStaticConfig.url;
        cfg.attribution = cfg.attribution ?? defaultStaticConfig.attribution;
      }

      return new ImageLayer({
        source: new Static({
          url: cfg.url,
          attributions: cfg.attribution,
          
          
          
                     // singular?
        }),
        //minResolution:3500,
        //maxResolution:5500,
        minZoom: cfg.minZoom,
        maxZoom: cfg.maxZoom,
        extent: transformExtent([ 15.381535,47.013604,15.488855,46.941822],'EPSG:4326', 'EPSG:3857')
        
        
      });
    },
    registerOptionsUI: (builder) => {
      builder
        .addTextInput({
          path: 'config.url',
          name: 'URL template',
          description: 'Add Static image from URL',
          settings: {
            placeholder: defaultStaticConfig.url,
          },
        })
        .addTextInput({
          path: 'config.attribution',
          name: 'Attribution',
          settings: {
            placeholder: defaultStaticConfig.attribution,
          },
        });
    },
  }),
};

export const Staticlayers = [Statictile];
