import { readFileSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { createServer } from 'http'
import { parse } from 'url'

interface IStudent {
  name: string
  age: number
  id: number
  description: string
}

const overviewTemp = readFileSync(
  `${__dirname}/template/overview.html`,
  'utf-8'
)
const studentTemp = readFileSync(`${__dirname}/template/student.html`, 'utf-8')
const descriptionTemp = readFileSync(
  `${__dirname}/template/description.html`,
  'utf-8'
)
const students = JSON.parse(
  readFileSync(`${__dirname}/students.json`, 'utf-8')
) as IStudent[]

function replaceTemp(temp: string, data: IStudent) {
  let output = temp.replace('{%NAME%}', data.name)
  output = output.replace('{%AGE%}', data.age.toString())
  output = output.replace('{%ID%}', data.id.toString())
  return output
}

const http = createServer((req, res) => {
  const { pathname, query } = parse(req.url as string, true)
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const studentHtml = students
      .map(stu => replaceTemp(studentTemp, stu))
      .join('')
    const output = overviewTemp.replace('{%STUDENTES%}', studentHtml)
    res.end(output)
  } else if (pathname === '/student' && query.id) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    const output = descriptionTemp.replace(
      '{%DESCRIPTION%}',
      students[query.id as unknown as number].description
    )
    res.end(output)
  }
})

http.listen(8000, '127.0.0.1', () => {
  console.log('serve start')
})
