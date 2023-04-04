import languageList from '@/public/languageList.json'

export default defineEventHandler(() => {
  try {
    return languageList
  } catch (error) {
    return createError({
      data: 'باید یک زبان را انتخاب نمایید',
      statusMessage: 'empty_language'
    })
  }
})
