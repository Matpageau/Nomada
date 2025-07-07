<script setup lang="ts">
import mapboxgl from "mapbox-gl"
import { onMounted, onUnmounted, ref, watch } from "vue";
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Coordinate } from "@/Types/Coordinate";

const props = defineProps<{
  canSelectPOI?: boolean
  marker?: Coordinate | null
}>()


const emit = defineEmits<{
  (e: 'poiSelected', lng: number, lat: number): void
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let marker: mapboxgl.Marker | null = null

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN!
  if(!mapContainer.value) return

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

  if(props.marker) {
    marker = new mapboxgl.Marker({ color: "#3b82f6"})
    .setLngLat([props.marker.lng, props.marker.lat])
    .addTo(map)

    map.setCenter([props.marker.lng ?? -1, props.marker.lat ?? -1])
    map.setZoom(7)
  }

  map.on("click", (e) => {
    if(!props.canSelectPOI) return

    const { lng, lat } = e.lngLat

    if (!marker) {
      marker = new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat([lng, lat])
        .addTo(map!)
    } else {
      marker.setLngLat([lng, lat])
    }

    emit('poiSelected', lng, lat)
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