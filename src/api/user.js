import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

// 获取用户下级区域的用户
export function getSubAreaUser(userId) {
  return request({
    url: '/user/getSubAreaUser',
    method: 'get',
    params: { 
      uid: userId
     }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
