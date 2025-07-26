<script setup lang="ts">
import mapboxgl from "mapbox-gl"
import { createApp, onMounted, onUnmounted, ref, watch } from "vue";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapMarker from "./MapMarker.vue";
import type { Coordinate } from "@/Types/Coordinate";
import type { MarkerData } from "@/Types/Marker";

const emit = defineEmits<{
  (e: "update", newMarker: Coordinate): void
}>()

const props = defineProps<{
  marker: MarkerData | null
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let currentMarker: mapboxgl.Marker | null = null

const updateMarker = () => {  
  if (!map || !props.marker) return;

  currentMarker?.remove();

  const container = document.createElement("div")
  createApp(MapMarker, {
    img: props.marker?.img
  }).mount(container)

  currentMarker = new mapboxgl.Marker({ element: container })
    .setLngLat([props.marker.coord.lng, props.marker.coord.lat])
    .addTo(map)
}

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!;
  if (!mapContainer.value) return;

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/matissep/cmd7svovc002r01s2alt3fms8',
    center: [0, 0],
    zoom: 2
  })

  map.addControl(new mapboxgl.NavigationControl({
    showZoom: false,
    visualizePitch: true
  }))

  map.on("click", (e) => {
    emit('update', { lng: e.lngLat.lng, lat: e.lngLat.lat });
  })

  map.on("load", () => {
    if (props.marker) {
      map?.flyTo({
        center: [props.marker.coord.lng, props.marker.coord.lat],
        padding: 50,
        maxZoom: 7,
        curve: 2,
        duration: 4000
      });
    }
  })

  watch(() => props.marker, updateMarker, {
    deep: true,
    immediate: true
  })
})

onUnmounted(() => {
  map?.remove();
  currentMarker?.remove();
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>