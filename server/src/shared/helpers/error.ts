export class Err extends Error {
  status: number
  errors?: any

  constructor (message: string, status: number, errors?: any) {
    super(message)
    this.status = status || 500
    this.errors = errors
  }
}
