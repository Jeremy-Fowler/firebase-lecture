<template>
  <div class="container-fluid">
    <div class="row p-4">
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
  <Modal id="create-post">
    <template #modal-title
      >Are you even ready to have your mind blown into
      <i class="border-bottom border-warning border-3"
        >a hundred pieces?</i
      ></template
    >
    <template #modal-body><PostForm /></template>
  </Modal>
</template>

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
