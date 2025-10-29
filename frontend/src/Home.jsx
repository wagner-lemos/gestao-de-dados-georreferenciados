import React, { useEffect } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import axiosClient from './axios-client.js';

export default function Home() {
  useEffect(() => {
    const map = new Map({ basemap: 'streets' });

    const view = new MapView({
      container: 'viewDiv',
      map,
      center: [-46.63, -23.55],
      zoom: 15
    });

    // Paleta de cores para diferenciar camadas
    const colors = ['#FF0000', '#00FF00', '#0000FF'];

    axiosClient.get('/geojson')
      .then(({ data }) => {
        data.forEach((layerData, index) => {

          // Detecta o tipo de geometria da primeira feature
          const firstGeometry = layerData.features?.[0]?.geometry?.type;

          // Define o estilo conforme o tipo de geometria
          let renderer;
          switch (firstGeometry) {
            case 'Point':
            case 'MultiPoint':
              renderer = {
                type: 'simple',
                symbol: {
                  type: 'simple-marker',
                  color: colors[0],
                  size: 10,
                  outline: { color: '#fff', width: 1 }
                }
              };
              break;

            case 'LineString':
            case 'MultiLineString':
              renderer = {
                type: 'simple',
                symbol: {
                  type: 'simple-line',
                  color: colors[2],
                  width: 1
                }
              };
              break;

            case 'Polygon':
            case 'MultiPolygon':
              renderer = {
                type: 'simple',
                symbol: {
                  type: 'simple-fill',
                  outline: { color: colors[1], width: 1 }
                }
              };
              break;

            default:
              renderer = {
                type: 'simple',
                symbol: {
                  type: 'simple-marker',
                  color: '#000000',
                  size: 6
                }
              };
          }

          // Cria Blob temporário com os dados GeoJSON
          const blob = new Blob(
            [JSON.stringify({ type: 'FeatureCollection', features: layerData.features })],
            { type: 'application/json' }
          );
          const url = URL.createObjectURL(blob);

          // Cria a camada GeoJSON
          const geoLayer = new GeoJSONLayer({
            url,
            title: layerData.name || `Camada ${index + 1}`,
            renderer,
            popupTemplate: {
              title: "{name}",
              content: "Camada: " + (layerData.name || "Sem nome")
            }
          });

          map.add(geoLayer);

          // Ajusta a visão do mapa para o conteúdo
          geoLayer.when(() => {
            if (geoLayer.fullExtent) {
              view.goTo(geoLayer.fullExtent).catch(() => {});
            }
          });
        });
      })
      .catch(err => console.error("Erro carregando camadas:", err));

  }, []);

  return (
    <>
      <div id="viewDiv" style={{ height: '100vh', width: '100%' }} />
    </>
  );
}
