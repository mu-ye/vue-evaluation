import request from '@/utils/request'

export function login (loginParam) {
  return request.post('/admin/login', {
      ...loginParam
  })
}

export function getMenu () {
  return request.get('/menu/getMenu')
}
