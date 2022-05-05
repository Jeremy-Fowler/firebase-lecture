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
}

export const postsService = new PostsService()