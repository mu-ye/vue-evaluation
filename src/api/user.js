import request from '@/utils/request'

export function login (loginParam) {
  return request.post('/users/login', {
    loginParam
  })
}

export function getMenu () {
  return request.get('/menu/getMenu')
}
