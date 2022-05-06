import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    logger.log('here are the posts', res.data)
    AppState.posts = res.data
  }
  async create(body) {
    const res = await api.post('api/posts', body)
    logger.log(res.data)
    AppState.posts.push(res.data)
  }

  async delete(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log(res.data)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
  }
}

export const postsService = new PostsService()