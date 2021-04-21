export interface ErrorStack {
  statusCode: number;
  error: string;
  message: string;
  stack?: string;
}
