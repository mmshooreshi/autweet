import userPreferencesList from '@/public/userPreferencesList.json'

export default defineEventHandler(() => {
  try {
    return userPreferencesList
  } catch (error) {
    return createError({
      data: 'Could not fetch user preferences list',
      statusMessage: 'user_pref_error'
    })
  }
})
