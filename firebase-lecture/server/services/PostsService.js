import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { firebaseService } from "./FirebaseService";

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query).populate('creator', 'name picture')
    return posts
  }
  async getById(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('No Post Found')
    }
    return post
  }
  async create(body) {
    const post = await dbContext.Posts.create(body)
    return post
  }
  async edit(body) {
    const post = await this.getById(body.id)
    if (post.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Access Denied')
    }
    post.title = body.title || post.imgUrl
    post.imgUrl = body.imgUrl || post.imgUrl
    await post.save()
    return post
  }
  async remove(id, userId) {
    const post = await this.getById(id)
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('Access Denied')
    }
    await post.delete()
    return `${post.title} was deleted`
  }

}

export const postsService = new PostsService()