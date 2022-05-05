import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { firebaseService } from '../services/FirebaseService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/firebase', this.getFirebaseToken)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFirebaseToken(req, res, next) {
    try {
      const token = await firebaseService.getToken(req.userInfo.id)
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
}
