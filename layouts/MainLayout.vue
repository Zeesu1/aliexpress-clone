<template>
  <div id="MainLayout" class="w-full fixed z-50">
    <div id="TopMenu" class="w-full bg-#fafafa border-b h-10 md:block hidden">
      <ul
        class="h-full flex items-center justify-end text-xs text-#333 font-light px-2 bg-#fafafa max-w-1200px mx-auto"
      >
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Sell on AliExpress
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Cookie Preferences
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Help
        </li>
        <li
          class="border-(r r-gray-400) px-3 hover:text-#ff4646 cursor-pointer"
        >
          Buyer Protection
        </li>
        <li class="px-3 hover:text-#ff4646 cursor-pointer">
          <Icon name="mdi:cellphone-iphone" size="17" />
          App
        </li>
        <li
          class="relative h-full hover:text-#ff4646 cursor-pointer transition"
          :class="
            isAccountMenuOpen ? 'bg-white border-x ' : 'border border-#fafafa'
          "
          @mouseenter="isAccountMenuOpen = true"
          @mouseleave="isAccountMenuOpen = false"
        >
          <div
            class="relative h-full w-full px-2.5 relative flex items-center z-40 border-b-0"
            :class="isAccountMenuOpen ? 'bg-white' : ''"
          >
            <Icon name="ph:user-thin" size="17" />
            Account
            <Icon
              name="mdi:chevron-down"
              size="15"
              :class="[
                'ml-5',
                'transition',
                isAccountMenuOpen ? 'transform rotate-180' : '',
              ]"
            />
          </div>

          <Transition name="fade">
            <div
              id="AccountMenu"
              v-if="isAccountMenuOpen"
              class="absolute bg-white w-220px text-#333 z-9 top-39px -right-1px border shadow-[0_2px_8px_0_rgba(0,0,0,.1)]"
            >
              <div v-if="!user">
                <div class="text-semibold text-15px my-4 px-3">
                  Welcome to AliExpress!
                </div>
                <div class="flex items-center gap-1 px-3 mb-3">
                  <NuxtLink
                    to="/auth"
                    class="bg-#FF4646 text-center w-full text-16px rounded-sm text-white font-semibold p-2"
                  >
                    Login / Register
                  </NuxtLink>
                </div>
              </div>
              <div v-else>
                <div class="text-semibold text-15px my-4 px-3">
                  Welcome {{ user.user_metadata?.full_name || user.email }}!
                </div>
              </div>
              <div class="border-b" />
              <ul class="bg-white">
                <li
                  @click="navigateTo('/orders')"
                  class="text-13px py-2 px-4 w-full hover:bg-gray-200"
                >
                  My Orders
                </li>
                <li
                  v-if="user"
                  @click="client.auth.signOut()"
                  class="text-13px py-2 px-4 w-full hover:bg-gray-200"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </Transition>
        </li>
      </ul>
    </div>

    <div id="MainHeader" class="flex items-center w-full bg-white">
      <div
        class="flex lg:justify-start justify-between gap-10 max-w-1150px w-full px-3 py-5 mx-auto"
      >
        <NuxtLink to="/" class="min-w-170px">
          <img width="170" src="~/assets/images/logo.png" />
        </NuxtLink>

        <div class="max-w-700px w-full md:block hidden">
          <div class="relative">
            <div
              class="flex items-center border-2 border-#FF4646 rounded-md w-full"
            >
              <input
                class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                placeholder="kitchen accessories"
                type="text"
                v-model="searchItem"
              />
              <Icon
                v-if="isSearching"
                name="eos-icons:loading"
                size="25"
                class="mr-2"
              />
              <button class="flex items-center h-full p-1.5 px-2 bg-#FF4646">
                <Icon name="mdi:magnify" size="20" color="#ffffff" />
              </button>
            </div>

            <Transition name="fade">
              <div
                v-if="items && items.length > 0"
                class="absolute bg-white max-w-700px h-auto w-full rounded-md shadow-lg"
              >
                <div v-for="item in items" class="p-1" :key="item.id">
                  <NuxtLink
                    :to="`/item/${item.id}`"
                    class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <img class="rounded-md" width="40" :src="item.url" />
                      <div class="truncate ml-2">{{ item.title }}</div>
                    </div>
                    <div class="truncate">${{ item.price.toFixed(2) }}</div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <NuxtLink to="/shoppingcart" class="flex items-center">
          <button
            class="relative md:block hidden bg-transparent"
            @mouseenter="isCartHover = true"
            @mouseleave="isCartHover = false"
          >
            <span
              class="absolute flex items-center justify-center -right-3px top-0 bg-#FF4646 h-17px min-w-17px text-xs text-white px-0.5 rounded-full"
            >
              {{ userStore.cart?.length }}
            </span>
            <div class="min-w-40px">
              <Icon
                name="ph:shopping-cart-simple-light"
                size="33"
                :color="isCartHover ? '#FF4646' : ''"
              />
            </div>
          </button>
        </NuxtLink>

        <button
        class="md:hidden block rounded-full p-1.5 -mt-4px bg-transparent hover:bg-gray-200"
        @click="userStore.isMenuOverlay = true"
        >
          <Icon name="radix-icons:hamburger-menu" size="33" />
        </button>
      </div>
    </div>
  </div>

  <Loading v-if="userStore.isLoading" />

  <div class="lg:pt-150px md:pt-130px pt-80px" />
  <slot />

  <Footer v-if="!userStore.isLoading" />
</template>

<script setup lang="ts">
import { Products } from '@prisma/client'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const isAccountMenuOpen = ref(false)
const isCartHover = ref(false)

const isSearching = ref(false)
const searchItem = ref('')
const items = ref<Products[]>([])

const searchByName = useDebounce(async () => {
  isSearching.value = true
  const { data } = await useFetch(
    `/api/prisma/search-by-name/${searchItem.value}`
  )
  items.value = data.value?.items || []
  isSearching.value = false
}, 200)

watch(
  () => searchItem.value,
  async () => {
    if (!searchItem.value) {
      setTimeout(() => {
        items.value = []
        isSearching.value = false
      }, 500)
    }
    searchByName()
  }
)
</script>

<style>
.fade-enter,
.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}
</style>
