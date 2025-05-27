<script lang="ts">
  // import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap, FeatureGroup, Layer } from "leaflet";

  let { height = 80, mapId = "home-map-id"} = $props();
  let id = mapId
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
  let minZoom = 7;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Record<string, Layer> = {};
  let baseLayers: Record<string, Layer>;
  let L: any;
  // https://stackoverflow.com/questions/64316069/how-to-create-different-layers-from-a-single-variable-in-javascript-using-leafle
  let venueGroups: Record<string, FeatureGroup>;
  

 onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    
    baseLayers = {
      Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution:
          "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, and the GIS User Community"
      })
    };

  
    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [baseLayers[activeLayer]]
    });

const cashGroup = L.featureGroup();
const cardGroup = L.featureGroup();

venueGroups = {
  "cash": cashGroup,   
  "card": cardGroup       
};

overlays = {
  "Cash Payments": venueGroups["cash"],
  "Card Payments": venueGroups["card"]
};

imap.addLayer(cashGroup);
imap.addLayer(cardGroup);



    control = L.control.layers(baseLayers, overlays).addTo(imap);
  });


  export async function addMarker(lat: number, lng: number, popupText: string, venueType: string) {
  const leaflet = await import("leaflet");
  L = leaflet.default;
  const marker = L.marker([lat, lng]);
  const popup = L.popup({ autoClose: false, closeOnClick: false });
  popup.setContent(popupText);
  marker.bindPopup(popup);
   const group = venueGroups?.[venueType.toLowerCase()];
    if (group) {
      group.addLayer(marker);
    } else {
      marker.addTo(imap);
    }
  }

  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat, lng });
  }
</script>


<div {id} class="box" style="height: {height}vh"></div>
