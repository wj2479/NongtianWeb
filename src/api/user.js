import request from '@/utils/request'

export function login(data) {
  console.log('---------------', data)
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
