<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <template v-if="data">
          <div v-for="product in data.items" :key="product.id">
            <ProductComponent :product="product" />
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const { data } = useFetch('/api/prisma/get-all-products')

onBeforeMount(async () => {
  setTimeout(() => (userStore.isLoading = false), 1000)
})
</script>
