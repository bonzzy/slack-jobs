
export interface ApiResponse<T> {
  _embedded: {
    users: T[],
    _links: {
      self: {
        href: string,
        templated: boolean
      },
      profile: {
        href: string,
      }
    }
  },
}
export class ApiService {


}
