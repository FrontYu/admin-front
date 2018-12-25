import Mock from 'mockjs'

export default {
  mockData() {
    // Mock.mock('/api/user/login', {
    //   'success': true,
    //   'result': {
    //     'token': 'asdfghjkl'
    //   }
    // })

    Mock.mock('/api/user/login', {
      'success': false,
      'error': {
        'code': 100022,
        'message': '账号密码错误'
      }
    })

    Mock.mock('/api/user/register', {
      'success': true,
      'result': {}
    })

    Mock.mock('/api/user/info', {
      'success': true,
      'result': {
        'id': '12138',
        'name': 'spring',
        'roles': ['admin'],
        'permissions': [{
            path: '/index',
            permission: ['delete']
          },
          {
            path: '/user/show',
            permission: ['modify', 'delete']
          }
        ]
      },
      'error': {
        'code': 100000,
        'message': '无效的token'
      }
    })
  }
}
