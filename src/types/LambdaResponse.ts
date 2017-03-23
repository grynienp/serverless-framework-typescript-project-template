// This format is required by AWS ApiGateway
export interface LambdaResponse {
  readonly statusCode: number,
  readonly body: string,
  readonly headers?: {}
}
