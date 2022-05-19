<template>
  <form @submit.prevent="upload" class="p-1" action="">
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
    <button class="btn mt-2 btn-warning">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { firebaseService } from '../services/FirebaseService'
import { Modal } from 'bootstrap'
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
          Modal.getOrCreateInstance('#create-post').hide()
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