<template>
  <div class="col-md-4">
    <div class="bg-light m-3 shadow d-flex flex-column">
      <img :src="post.imgUrl" alt="" class="img-fluid p-4" />
      <b class="text-center m-5 marker"
        >{{ post.title }}
        <i
          v-if="post.creatorId == account.id"
          @click="deletePost"
          class="ms-3 selectable mdi mdi-close text-danger"
          title="Delete Post"
        ></i>
      </b>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { firebaseService } from '../services/FirebaseService'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        if (await Pop.confirm()) {
          try {
            await postsService.delete(props.post.id)
            Pop.toast('Post deleted from MongoDB', 'success')
            await firebaseService.delete(props.post.imgUrl)
            Pop.toast('File deleted from Firebase', 'success')
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.marker {
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
}

img {
  height: 50vh;
  width: 40vw;
  object-fit: cover;
}
</style>