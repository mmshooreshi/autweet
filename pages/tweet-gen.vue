
<template>
    <div class="max-w-5xl py-8 px-4 mx-auto rtl">

        <Head>
            <Title>خودکار توییت بساز</Title>
            <Meta name="description" content="" />
        </Head>
        <ClientOnly>
            <FullScreenLoading v-if="loading" />
            <h1 class="text-2xl pb-6 font-bold">
                Generate creative tweets with AI based on your preferences!
            </h1>
            <form class="grid grid-cols-1 gap-6" @submit.prevent="generateTweets">
                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">تعداد توییت</span>
                    <input v-model="tweetCount" type="number" class="form-input mt-1 block w-full text-black"
                        placeholder="تعداد توییت‌هایی که مایل به دریافت هستید را وارد کنید. عدد پیشنهادی 5 می‌باشد.">
                </label>
                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7"> توصیفی از احساسات قابل مشاهده در توییت‌ها</span>
                    <select v-model="sentiments"
                        placeholder="دوست دارید تا توییت‌های ساخته شده، باعث بروز احساسات مثبت، منفی و یا خنثی‌ای شوند؟"
                        class="form-select mt-1 block w-full text-black">
                        <option value="POSITIVE">مثبت</option>
                        <option value="NEUTRAL">خنثی</option>
                        <option value="NEGATIVE">منفی</option>
                    </select>
                </label>


                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">موضوعات هدف</span>
                    <input v-model="topicsList" type="text" class="form-input mt-1 block w-full text-black"
                        placeholder="موضوعات مورد نیازتان، برای ایجاد توییت را وارد کنید. موضوعات را به وسیله علامتِ کاما از هم جدا کنید.">
                </label>


                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">لحن (Tone)</span>
                    <multiselect v-model="tones" mode="tags" :options="tonesOptions" :searchable="true" :can-clear="false"
                        placeholder="لحن توییت‌های درخواستی‌تان را از میان گزینه‌ها انتخاب کنید. برای مثال بامزه وطنز، جدی، و ... می‌تواند مثال‌های خوبی باشد.">
                    </multiselect>
                </label>

                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">موضوعات خاص مورد تمرکز</span>
                    <Multiselect v-model="focusAreas" mode="tags"
                        placeholder="از بین گزینه‌ها، جستجو کنید و موارد دقیق و جزئی‌تری را که می‌توانید اضافه کنید. محدودیتی در تعداد وجود ندارد."
                        :searchable="true" :can-clear="false" :options="focusAreasOptions" />
                </label>
                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">تنظیمات شخصیِ کاربر</span>
                    <Multiselect v-model="userPreferences" mode="tags"
                        placeholder="از میان گزینه‌ها مورد مربوط به خودتان را وارد نمایید." :searchable="true"
                        :can-clear="false" :options="userPreferencesOptions" />
                </label>
                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">توییت‌های نمونه (seed)</span>
                    <textarea v-model="inputSamples" class="form-textarea mt-1 block w-full text-black"
                        placeholder="تعدادی توییت مشابه آن‌چه به آن نیاز دارید را در این قسمت وارد کنید تا توییت‌ها شبیه‌تر به آن ساخته شوند."></textarea>
                </label>
                <label class="block">
                    <span class="font-bold p-2 text-xl leading-7">زبان</span>
                    <select v-model="language" class="form-select mt-1 block w-full text-black">
                        <option value="english">English</option>
                        <option value="persian">فارسی</option>
                    </select>
                </label>
                <button type="submit"
                    class="inline-flex justify-center items-center py-2 px-4 text-sm
                                                                        font-medium shadow-sm border border-black dark:border-white">
                    <span>بزن بریم</span>
                </button>
                <span v-if="errMsg" class="text-red-500">
                    {{ errMsg }}
                </span>
                <span v-if="tweetResult">
                    <json-viewer :value="tweetResult" />
                </span>
            </form>
        </ClientOnly>
    </div>
</template>
<script >
import { defineComponent, ref } from 'vue'
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    components: {
        Multiselect
    },
    setup() {
        const tweetCount = ref()
        const topicsList = ref()
        const tones = ref()
        const focusAreas = ref()
        const userPreferences = ref()

        const inputSamples = ref()
        const language = ref()
        const tweetResult = ref('')
        const errMsg = ref('')
        const loading = ref(false)
        const topicListOptions = ref([])
        const focusAreasOptions = ref([])
        const userPreferencesOptions = ref([])
        const tonesOptions = ref([])
        const sentiments = ref()

        const fetchData = async () => {
            const topicsResult = await useFetch('/api/topics', { method: 'get' })
            const focusAreasResult = await useFetch('/api/focus-areas', { method: 'get' })
            const userPrefsResult = await useFetch('/api/user-preferences', { method: 'get' })
            const tonesResult = await useFetch('/api/tones', { method: 'get' })
            topicListOptions.value = topicsResult.data.value
            focusAreasOptions.value = focusAreasResult.data.value
            userPreferencesOptions.value = userPrefsResult.data.value
            const mapTonesListToSelectItems = (tonesList) => {
                return tonesList.map((tone) => {
                    return { value: tone.en, label: tone.fa }
                })
            }

            tonesOptions.value = mapTonesListToSelectItems(tonesResult.data.value)
            console.log(tonesOptions.value)
        }

        fetchData()

        const generateTweets = async () => {
            loading.value = true
            errMsg.value = ''

            if (!tweetCount.value) {
                loading.value = false
                errMsg.value = 'لطفا تعداد توییت‌های درخواستی‌تان را مشخص نمایید.'
                return
            }

            if (!topicsList.value || topicsList.value.length === 0) {
                loading.value = false
                errMsg.value = 'لطفا حداقل یک موضوع را برای ایجاد توییت بنویسید.'
                return
            }

            if (!tones.value) {
                loading.value = false
                errMsg.value = 'لطفا حداقل یک لحن برای توییت‌های تان انتخاب نمایید.'
                return
            }

            if (!focusAreas.value || focusAreas.value.length === 0 && 0) {
                loading.value = false
                return
            }

            if (!userPreferences.value || userPreferences.value.length === 0 && 0) {
                loading.value = false
                errMsg.value = 'Please select at least one user preference for the tweets.'
                return
            }

            if (!inputSamples.value || inputSamples.value.length === 0 && 0) {
                loading.value = false
                errMsg.value = 'Please provide at least one input sample for the tweets.'
                return
            }

            if (!language.value) {
                loading.value = false
                errMsg.value = 'لطفا زبان مورد نظرتان برای اجاد توییت را مشخص نمایید.'
                return
            }

            const { data, error } = await useFetch('/api/tweet-gen', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    tweetCount: tweetCount.value,
                    topicsList: topicsList.value,
                    tones: tones.value,
                    sentiments: sentiments.value,
                    focusAreas: focusAreas.value,
                    userPreferences: userPreferences.value,
                    inputSamples: inputSamples.value,
                    language: language.value
                }
            })

            if (data?.value) {
                tweetResult.value = data.value.toString()
            }

            if (error?.value) {

            }

            loading.value = false
        }

        return {
            tweetCount,
            topicsList,
            tones,
            focusAreas,
            userPreferences,
            inputSamples,
            language,
            tweetResult,
            errMsg,
            loading,
            topicListOptions,
            tonesOptions,
            sentiments,
            generateTweets,
            focusAreasOptions,
            userPreferencesOptions
        }
    }
})
</script>