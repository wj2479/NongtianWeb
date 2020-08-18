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

// 获取地区信息  省 市 区 乡镇  四级
export function getAreaList() {
  return request({
    url: '/sys/getAreaList',
    method: 'get'
  })
}

// 更新用户信息
export function updateUserInfo(user) {
  return request({
    url: '/user/updateInfo',
    method: 'get',
    params: user
  })
}


export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
