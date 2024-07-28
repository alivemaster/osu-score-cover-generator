<script setup lang="ts">
import CoverGenerator from './CoverGenerator.vue'
import { useI18n } from 'vue-i18n'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
<template>
  <Header></Header>
  <CoverGenerator></CoverGenerator>
  <Footer></Footer>
</template>