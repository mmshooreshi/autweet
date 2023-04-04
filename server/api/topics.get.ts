import topicsList from '@/public/topicsList.json'

export default defineEventHandler(() => {
  try {
    return topicsList
  } catch (error) {
    return createError({
      data: 'Could not fetch topics list',
      statusMessage: 'topic_error'
    })
  }
})
