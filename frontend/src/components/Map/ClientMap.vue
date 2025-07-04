<script setup lang="ts">
import mapboxgl from "mapbox-gl"
import { onMounted, onUnmounted, ref } from "vue";
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null

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