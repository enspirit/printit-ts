export class PrintitError extends Error {
  httpCode: number = 500;
  constructor(message: string) {
    super(message);
  }
}
