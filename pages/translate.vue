<template>
  <div class="max-w-5xl py-8 px-4 mx-auto">

    <Head>
      <Title>مترجم هوشمند</Title>
      <Meta name="description" content="مترجم هوشمند قدرت گرفته از openAI" />
    </Head>
    <ClientOnly>
      <FullScreenLoading v-if="loading" />
      <h1 class="text-2xl pb-6 font-bold">

      </h1>
      <form class="grid grid-cols-1 gap-6 rtl" @submit.prevent="translateText">
        <!-- <label class="block">
          <span class="font-bold p-2 text-xl leading-7">API Key</span>
          <input
            v-model="apiKey"
            type="text"
            class="form-input mt-1 block w-full text-black rounded-md"
            placeholder="OpenAI Key"
          >
        </label> -->
        <label class="block">
          <span class="font-bold p-2 text-xl leading-7">دستور</span>
          <input v-model="promptString" type="text" class="form-input mt-1 block w-full text-black rounded-md rtl"
            placeholder="` تو یک مترجم هستی و متنی که وارد می‌شود را ترجمه می‌کنی `">
        </label>

        <label class="block">
          <span class="font-bold p-2 text-xl leading-7">متن ورودی</span>
          <textarea v-model="text2translate"
            class="form-input input-textarea mt-1 block w-full text-black rounded-md rtl h-28 overflow-y-scroll"
            placeholder="متن ورودی جهت ترجمه" @input="updateDirection"></textarea>
        </label>

        <label class="block">
          <span class="font-bold p-2 text-xl leading-7">زبان مقصد</span>
          <span class="font-mono p-2 text-2xs leading-10"> زبانی که می‌خواهید متن شما به آن ترجمه شود را انتخاب
            کنید</span>
          <Multiselect v-model="languageList" mode="tags" class="ltr text-center align-middle p-0" :searchable="true"
            :can-clear="false" :options="languageListOptions" :multiple="false" :close-on-select="true" />
        </label>
        <button type="submit" class="inline-flex justify-center items-center py-2 px-4 text-sm
                    font-medium shadow-sm border border-black dark:border-white">
          <span>Translate</span>
        </button>
        <span v-if="errMsg" class="text-red-500">
          {{ errMsg }}
        </span>
      </form>
      <span v-if="translateResult">
        <json-viewer :value="translateResult" />
      </span>
    </ClientOnly>
  </div>
</template>
<script lang="ts">
import Multiselect from '@vueform/multiselect'
import { defineComponent, ref } from 'vue'
import { SelectItem } from '@/model/SelectItem'
import { userInfoStore } from '@/stores/user-info'

export default defineComponent({
  components: {
    Multiselect
  },
  setup() {
    const apiKey = ref()
    const promptString = ref('تو یک مترجم هستی و متنی که وارد می‌شود را ترجمه می‌کنی')
    const text2translate = ref()
    const translateResult = ref('') as any
    const errMsg = ref('')
    const loading = ref(false)
    const languageList = ref()
    const languageListOptions = ref([] as SelectItem[])
    const userInfo = userInfoStore()
    apiKey.value = userInfo.openAiKey

    const fetchData = async () => {
      const result = await useFetch('/api/language', {
        method: 'get'
      })
      languageListOptions.value = result.data.value as SelectItem[]
    }

    fetchData()

    const translateText = async () => {
      loading.value = true
      errMsg.value = ''
      if (!languageList.value) {
        loading.value = false
        errMsg.value = 'زبان مقصد را بررسی نمایید'
        return
      }

      let languageListCombo = ''
      const iterator = languageList.value.keys()
      for (const key of iterator) {
        languageListCombo += (key + 1) + '. ' + languageList.value[key] + ', '
      }
      let temp = promptString.value ? promptString.value : "";
      const translateCombo = "'" + temp + 'Translate this into ' + languageListCombo + ' Just reponse with json:' + ' ' + text2translate.value + "'"

      const { data, error } = await useFetch('/api/openai-translate', {
        method: 'post',
        body: {
          prompt: translateCombo
        }
      })
      translateResult.value = data.value ?? ''
      if (error.value) {
        // errMsg.value = error.value.data.data.error.message
      }
      loading.value = false
    }



    return { languageListOptions, apiKey, promptString, text2translate, translateResult, errMsg, loading, languageList, translateText }
  },
  methods: {
    updateDirection() {
      const input = document.querySelector('.input-textarea');
      if (this.text2translate.length > 0 && this.text2translate.match(/[a-zA-Zآ-ی]/)) {
        if (this.text2translate.match(/[آ-ی]/)) {
          input.classList.remove('ltr');
          input.classList.add('rtl');
        } else {
          input.classList.remove('rtl');
          input.classList.add('ltr');
        }
      } else {
        input.classList.remove('ltr', 'rtl');
      }
    }
  }


})
</script>


<style scoped >
.multiselect-option[aria-selected="false"] {
  --tw-text-opacity: 1;

}
</style>