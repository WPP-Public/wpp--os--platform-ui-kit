import { getCurrentFormatDate } from '../utils'

describe('wpp-datepicker', () => {
  describe('utils', () => {
    describe('getCurrentFormatDate', () => {
      it('should return proper date based on the provided format', () => {
        expect(getCurrentFormatDate('yyyy/dd/mm')('2023/26/01')).toEqual(new Date('2023-01-26T00:00:00.000Z'))
        expect(getCurrentFormatDate('dd/mm/yyyy')('26/01/2023')).toEqual(new Date('2023-01-26T00:00:00.000Z'))
        expect(getCurrentFormatDate('mm/dd/yyyy')('01/26/2023')).toEqual(new Date('2023-01-26T00:00:00.000Z'))
        expect(getCurrentFormatDate('mm/yyyy/dd')('01/2023/26')).toEqual(new Date('2023-01-26T00:00:00.000Z'))
      })
    })
  })
})
