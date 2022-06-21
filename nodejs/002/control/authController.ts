import { Request, Response, NextFunction, CookieOptions } from 'express'
import { userModel } from '../model/userModel'
import { ApiError, asyncErrorCatch } from '../utils/ApiError'
import * as jwt from 'jsonwebtoken'
import { sendEmail } from '../utils/email'
import { createHash } from 'crypto'

function signToken(id: string) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRESIN
  })
}

const signup = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userModel.create(req.body)
    const token = signToken(newUser._id)
    const cookieOptions = {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_COOKIE_EXPIRESIN as string)
    } as CookieOptions
    if (process.env.NODE_ENV === 'prodection') {
      cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions)
    newUser.password = undefined
    res.status(201).json({
      status: 'success',
      message: 'create successs',
      token,
      data: newUser
    })
  }
)

const login = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(
        new ApiError(400, 'request body should have email and password')
      )
    }
    const user = await userModel.findOne({ email: email }).select('+password')
    if (!user || !(await user.isPasswordRight(password, user.password))) {
      return next(new ApiError(400, 'invalid email or password'))
    }
    const token = signToken(user._id)
    res.status(200).json({
      status: 'success',
      token
    })
  }
)

const protect = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = ''
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return next(new ApiError(401, 'not authed!'))
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload

    const user = await userModel.findById(decode.id)

    if (!user) {
      return next(new ApiError(401, `can't find this user!`))
    }

    if (user.isPasswordExpired(decode.iat)) {
      return next(new ApiError(401, 'your password is changed recently'))
    }

    next()
  }
)

const redirectTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.role)) {
      return next(new ApiError(403, 'no permision'))
    }
    next()
  }
}

const forgetPassword = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    if (!email) {
      return next(new ApiError(401, 'you should provide a email'))
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return next(new ApiError(401, 'there is not a user with this email'))
    }

    const resetToken = user.createPasswordFrogetToken()
    await user.save()

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`
    const message = `Forget your password? Submit a PATCH requeset with your new password and passwordConfirm to ${resetUrl}.
    If you didn't forget your password, please ignore this email`

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    })
  }
)

const resetPassword = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params
    const { newPassword } = req.body
    const hashedToken = createHash('sha256').update(token).digest('hex')
    const user = await userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ApiError(400, 'token is invalid or has expired'))
    }

    user.password = newPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    const newToken = signToken(user._id)
    res.status(200).json({
      status: 'success',
      token: newToken
    })
  }
)

const updatePassword = asyncErrorCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, newPassword } = req.body
    const user = await userModel
      .findOne({ email, password })
      .select('+password')
    if (!user || !user.isPasswordRight(password, user.password)) {
      return next(new ApiError(400, 'invalid email or password'))
    }
    user.password = newPassword
    await user.save()
    const newToken = signToken(user._id)
    res.status(200).json({
      status: 'success',
      token: newToken
    })
  }
)

export {
  signup,
  login,
  protect,
  redirectTo,
  forgetPassword,
  resetPassword,
  updatePassword
}
