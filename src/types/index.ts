import { AxiosResponse } from 'axios'

/* TODO: Update AxiosResponse ErrorType after API setup */

type ValidationError = {
  additionalParams: string[] | null
  httpCode: number
  internalCode: string
  internalErrorMessage: string
}

type ErrorWithMessage = ValidationError[]

export type ErrorType = AxiosResponse<ErrorWithMessage> | undefined | null
