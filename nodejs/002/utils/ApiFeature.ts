import { Query } from 'mongoose'

type ApiQuery = Query<any[], any, {}, any>
interface QueryObj {
  page?: string
  limit?: string
  fields?: string
  sort?: string
}

export class ApiFeature {
  private query: ApiQuery
  private queryObj: QueryObj

  constructor(query: ApiQuery, queryObj: QueryObj) {
    this.query = query
    this.queryObj = queryObj
  }

  getQuery() {
    return this.query
  }

  filter() {
    const queryObj = JSON.stringify({ ...this.queryObj })
    const queryString = queryObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    )
    this.query = this.query.find(JSON.parse(queryString))
    return this
  }

  sort() {
    if (this.queryObj.sort) {
      this.query = this.query.sort(this.queryObj.sort)
    }
    return this
  }

  fields() {
    if (this.queryObj.fields) {
      this.query = this.query.select(this.queryObj.fields.split(',').join(' '))
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paging() {
    const page = this.queryObj.page ? parseInt(this.queryObj.page) : 1
    const limit = this.queryObj.limit ? parseInt(this.queryObj.limit) : 10
    const skip = (page - 1) * limit
    this.query.skip(skip).limit(limit)
    return this
  }
}
