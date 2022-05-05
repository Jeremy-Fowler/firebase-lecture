<template></template>

<script>
import { computed } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
