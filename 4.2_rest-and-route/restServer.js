const http = require('http')
const fs = require('fs').promises

const users = {}

http
  .createServer(async (req, res) => {
    try {
      console.log(req.method, req.url)

      if (req.method === 'GET') {
        if (req.url === '/') {
          const data = await fs.readFile('./restFront.html')
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          return res.end(data)
        } else if (req.url === '/about') {
          const data = await fs.readFile('./about.html')
          200, { 'Content-Type': 'text/html; charset=utf-8' }
          return res.end(data)
        } else if (req.url === '/users') {
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
          return res.end(JSON.stringify(users))
        }

        try {
          const data = await fs.readFile(`.${req.url}`)
          return res.end(data)
        } catch (err) {
          res.writeHead(404, 'NOT FOUND')
          return res.end('NOT FOUND')
        }
      } else if (req.method === 'POST') {
        if (req.url === '/user') {
          let body = ''
          req.on('data', data => {
            body += data
          })

          return req.on('end', () => {
            console.log('POST 본문(body): ', body)
            const { name } = JSON.parse(body)
            const id = Date.now()
            users[id] = name
            console.log('🚀 ~ users', users)
            res.writeHead(201)
            res.end('등록 성공')
          })
        }
      } else if (req.method === 'PUT') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2]
          let body = ''

          // request의 body를 stream형식으로 받음
          // 파일을 읽기 시작하면
          req.on('data', data => {
            body += data
            console.log('🚀 ~ data', data)
          })

          return req.on('end', () => {
            console.log('PUT 본문(body): ', body)
            users[key] = JSON.parse(body).name
            console.log('🚀 ~ users', users)
            return res.end(JSON.stringify(users))
          })
        }
      } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/user/')) {
          const key = req.url.split('/')[2]
          delete users[key]
          console.log('🚀 ~ users', users)
          return res.end(JSON.stringify(users))
        }
      }
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(err.message)
    }
  })
  .listen(8082, () => {
    console.log('8082yo')
  })
