<script setup lang="ts">
import mapboxgl from "mapbox-gl"
import { createApp, onMounted, onUnmounted, ref, watch } from "vue";
import 'mapbox-gl/dist/mapbox-gl.css'
import type { MarkerData } from "@/Types/Marker";
import MapMarker from "./MapMarker.vue";
import type { Coordinate } from "@/Types/Coordinate";

const emit = defineEmits<{
  (e: "update", newMarker: Coordinate): void
}>()

const props = defineProps<{
  marker: MarkerData | null
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let bounds = new mapboxgl.LngLatBounds()
let currentMarker: mapboxgl.Marker | null = null

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!
  if(!mapContainer.value) return

  if(props.marker) {
    currentMarker = new mapboxgl.Marker()
    .setLngLat([props.marker.coord.lng, props.marker.coord.lat])

    bounds.extend(currentMarker._lngLat)
  }

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/matissep/cmco3c11w00ic01s1e20vckdn',
    center: [0, 0],
    zoom: 2
  })

  map.addControl(new mapboxgl.NavigationControl({
    showZoom: false,
    visualizePitch: true
  }))


  watch(() => props.marker, (newMarker) => {
    if (!map || !newMarker) return

    if(currentMarker) {
      currentMarker.remove()
      currentMarker = null
    }
    
    const container = document.createElement("div")
    createApp(MapMarker, { img: newMarker.img }).mount(container)

    currentMarker = new mapboxgl.Marker({ element: container })
      .setLngLat([newMarker.coord.lng, newMarker.coord.lat])
      .addTo(map!)

  }, { immediate: true })

  map.on("load", () => {
    map!.fitBounds(bounds, {
      padding: 50,
      maxZoom: 7,
      curve: 2,
      duration: 4000
    })
  })

  map.on("click", (e) => {
    emit('update', {lng: e.lngLat.lng, lat: e.lngLat.lat})
  })
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