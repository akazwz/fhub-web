const baseUrl = 'https://gin-akazwz.koyeb.app'

interface IUsernamePwd {
  username: string,
  password: string,
}

/*  sign up */
export const SignUpByUsernamePwdAPI = (user: IUsernamePwd) => {
  return fetch(`${baseUrl}/v1/user`, {
    method: 'POST',
    body: JSON.stringify(user)
  })
}

/* sign in */
export const SignInByUsernamePwdAPI = (user: IUsernamePwd) => {
  return fetch(`${baseUrl}/v1/user/token`, {
    method: 'POST',
    body: JSON.stringify(user)
  })
}

/* get user profile by token */
export const GetUserProfileAPI = (token: string) => {
  return fetch(`${baseUrl}/v1/user/profile`, {
    method: 'POST',
    headers: {
      token: token
    }
  })
}