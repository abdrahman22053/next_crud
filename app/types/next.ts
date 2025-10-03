
import { NextRequest } from 'next/server'

export interface RouteParams {
  params: Promise<{ [key: string]: string }>
}

export type ApiHandler<T = any> = (
  request: NextRequest,
  context: { params: Promise<{ [key: string]: string }> }
) => Promise<Response | T>