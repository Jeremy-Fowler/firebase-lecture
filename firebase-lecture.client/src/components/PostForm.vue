<template>
  <form @submit.prevent="upload" class="p-5" action="">
    <div class="mb-3">
      <label for="" class="form-label">Title</label>
      <input
        v-model="editable.title"
        type="text"
        class="form-control"
        placeholder="Title..."
        required
      />
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Image</label>
      <input
        @change="setImage"
        class="form-control"
        type="file"
        accept="image/*"
        required
      />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { firebaseService } from '../services/FirebaseService'
export default {
  setup() {
    const editable = ref({})
    const image = ref([])
    return {
      editable,
      setImage(e) {
        image.value = e.target.files
        logger.log('New image: ', image.value)
      },
      async upload() {
        try {
          const url = await firebaseService.upload(image.value[0])
          editable.value.imgUrl = url
          await this.createPost()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createPost() {
        try {
          await postsService.create(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>