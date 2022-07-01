import jwt from 'jsonwebtoken'
import config from 'config'
import { ObjectId } from 'mongodb'
import Token from '@src/models/User/Token/Token.model'
class UserTokenService {
  generateTokens = (payload: any) => {
    const accessToken = jwt.sign(payload, config.get('secret'), { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, config.get('secret-refresh'), { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }
  saveToken = async (user_id: ObjectId, refreshToken: any) => {
    const tokenData = await Token.findOne({ user_id })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ user_id, refreshToken })
    return token
  }
}
export default new UserTokenService()
