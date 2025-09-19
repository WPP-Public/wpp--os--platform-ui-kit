import { FileItemType, FileValidatorHandler } from '@platform-ui-kit/components-library'

export const fileValidator: FileValidatorHandler = (file: FileItemType) =>
  file.name.includes('validator-test') ? 'File with this name already exists in the system' : null
