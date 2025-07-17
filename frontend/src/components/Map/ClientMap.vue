<script setup lang="ts">
import mapboxgl from "mapbox-gl"
import { createApp, onMounted, onUnmounted, ref } from "vue";
import 'mapbox-gl/dist/mapbox-gl.css'
import type { MarkerData } from "@/Types/Marker";
import MapMarker from "./MapMarker.vue";

const props = defineProps<{
  markers: MarkerData[]
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let bounds = new mapboxgl.LngLatBounds()

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!
  if(!mapContainer.value) return

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/matissep/cmd7svovc002r01s2alt3fms8',
    center: [-40, 20],
    zoom: 2
  })

  map.addControl(new mapboxgl.NavigationControl({
    showZoom: false,
    visualizePitch: true
  }))

  map.on("load", () => {
    map!.fitBounds(bounds, {
      padding: 50,
      maxZoom: 7,
      curve: 2,
      duration: 4000
    })
  })

  if(props.markers.length > 0) {
    props.markers.forEach(({coord, img}) => {
      const container = document.createElement("div")

      createApp(MapMarker, { img }).mount(container)


      new mapboxgl.Marker({ element: container })
      .setLngLat([coord.lng, coord.lat])
      .addTo(map!)

      bounds.extend([coord.lng, coord.lat])
    });
  }
})

onUnmounted(() => {
  map?.remove()
})
</script>

<template>
  <div
    ref="mapContainer"
    class="w-full h-full"
  />
</template>