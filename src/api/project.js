import request from '@/utils/request'

export function getprojectinfo(userid){
    return request({
        url: '/project/getProjectByUserId',
        method: 'get',
        params: {
            uid: userid
        }
      })
}