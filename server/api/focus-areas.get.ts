import focusAreaList from '@/public/focusAreaList.json'

export default defineEventHandler(() => {
  try {
    return focusAreaList
  } catch (error) {
    return createError({
      data: 'Could not fetch focus areas list',
      statusMessage: 'focus_area_error'
    })
  }
})
