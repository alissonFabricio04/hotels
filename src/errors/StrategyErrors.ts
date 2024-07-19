const HttpStatusMap: { [key: string]: number } = {
  'NotFound': 404,
  'UnprocessableEntity': 422,
  'InternalServerError': 500,
  'NotImplemented': 501,
}

export default function StrategyErrors(error: Error): number {
  const httpStatus = HttpStatusMap[error.name]
  if (!httpStatus) return 500
  return httpStatus
}