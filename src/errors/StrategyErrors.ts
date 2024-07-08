const HttpStatusMap: { [key: string]: number } = {
  'UnprocessableEntity': 422,
  'NotFound': 404
}

export default function StrategyErrors(error: Error): number {
  const httpStatus = HttpStatusMap[error.name]
  if (!httpStatus) return 500
  return httpStatus
}