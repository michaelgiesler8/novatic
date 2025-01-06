export class Demo {
  constructor(data) {
    this.id = data.id || ''
    this.title = data.title
    this.description = data.description
    this.captureUrl = data.captureUrl
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}