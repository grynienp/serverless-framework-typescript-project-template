interface StringArray {
  readonly [index: number]: string
}

interface HttpResponseBody {
  readonly statusText: string,
  readonly data?: any,
  readonly errors?: StringArray
}

export interface HttpResponse {
  readonly statusCode: number,
  readonly body: HttpResponseBody,
}
