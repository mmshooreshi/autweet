import tonesList from '@/public/tonesList.json'

export default defineEventHandler(() => {
  try {
    return tonesList
  } catch (error) {
    return createError({
      data: 'Could not fetch tones list',
      statusMessage: 'tones_error'
    })
  }
})


