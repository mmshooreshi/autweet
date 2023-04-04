<template>
  <div class="max-w-5xl py-8 px-4 mx-auto rtl">
    <h1 class="text-3xl pb-6 font-bold">
      خودکار توییت بساز!
    </h1>
    <div class="grid grid-cols-6 gap-4">
      <!-- Translate Card-->
      <div
        class="col-start-1 col-end-7 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <Icon name="ic:baseline-translate" size="48px" />
        <NuxtLink to="/translate">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          </h5>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            شما می‌توانید همچنین با استفاده از این ابزار قدرت پشتیبانی از زبان‌های دیگری را به وبسایت خود اضافه کنید.
          </p>
        </NuxtLink>
      </div>
      <!-- Image Card -->
     
    </div>
    <div>
      <div class="flex justify-center m-5">
        <button
          id="defaultModalButton"
          class="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          @click="modal.show()"
        >
          کلید API مخصوص به خودتان را پس از دریافت از سایت openai.com در این قسمت وارد نمایید
        </button>
        <div
          id="tooltip-default"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Tooltip content
          <div class="tooltip-arrow" data-popper-arrow />
        </div>
      </div>

      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
            >
              <h3 class=" font-semibold text-gray-900 dark:text-white w-full" >
                کلید API مخصوص به خودتان را در این قسمت وارد نمایید
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="closeDialog"
              >
                <Icon name="ic:baseline-close" size="24px" />
                <span class="sr-only">بستن</span>
              </button>
            </div>
            <form @submit.prevent="userInfo.setOpenAiKey(aiKey), closeDialog()">
              <div class="grid gap-4 sm:col-span-2">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                در صورتی که نیاز به مشاهده‌ی آن دارید، پس از مراجعه به <a href="https://platform.openai.com/account/api-keys" class="hover:scale-110 hover:text-blue-400">openai</a> یک نمونه بسازید و یا آن که اگر پیش‌تر ساخته‌اید، نیاز است تا کلید خصوصی آن را در جایی یادداشت کرده باشید. 
                </label>
                  <input
                    id="name"
                    v-model="aiKey"
                    type="text"
                    name="name"
                    class="
                      block p-2.5 w-full text-l text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ltr
                      focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    "
                    placeholder="https://platform.openai.com/account/api-keys"
                    required="true"
                  >
                </div>
              </div>
              <button
                type="submit"
                class="mt-4 text-white inline-flex items-center bg-blue-700
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
               تنظیم کلید خصوصی
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { initModals, initTooltips, Modal } from 'flowbite'
import { defineComponent, onMounted } from 'vue'
import { userInfoStore } from '@/stores/user-info'
export default defineComponent({
  setup () {
    const userInfo = userInfoStore()
    const aiKey = ref()
    const modal = ref()
    aiKey.value = userInfo.openAiKey
    onMounted(() => {
      const $targetEl = document.getElementById('defaultModal')
      modal.value = new Modal($targetEl)
      initModals()
      initTooltips()
      if (!userInfo.openAiKey) {
        modal.value.show()
      }
    })
    const closeDialog = () => {
      modal.value.hide()
    }
    return {
      userInfo,
      aiKey,
      modal,
      closeDialog
    }
  }
})
</script>
