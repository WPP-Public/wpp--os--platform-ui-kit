import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './inputsVC.html',
  styleUrls: ['./inputsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputsExampleVC {
  public value: string | null = null
  public labelConfig = {
    icon: 'wpp-icon-info',
    text: 'Normal Input',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  // Text Input with Default Mask Pattern
  public maskOptionsDecimal = {
    decimalPatternOptions: {
      decimalSeparator: ',',
      thousandSeparator: '.',
      precision: 2,
    },
  }

  // Decimal Input with Currency Mask Pattern
  public maskOptionsCurrency = {
    decimalPatternOptions: {
      precision: 2,
      decimalSeparator: '.',
      min: 0,
      prefix: '$',
    },
  }

  // Decimal Input with Percentage Mask Pattern
  public maskOptionsPercentage = {
    decimalPatternOptions: {
      postfix: '%',
      min: 0,
      max: 100,
      precision: 2,
    },
  }

  // Text Input with Credit Card Mask Pattern
  public maskOptionsCreditCard = {
    customPatternOptions: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  }

  // Text Input with Time Mask Pattern
  public maskOptionsTime = {
    customPatternOptions: {
      mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    },
  }

  // Text Input with Fixed Length Currency Mask Pattern ($xxx.xx)
  public maskOptionsFixedLengthCurrency = {
    customPatternOptions: {
      mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
    },
  }

  // Text Input with Credit Card Mask Pattern (with Placeholder)
  public maskOptionsCreditCardWithPlaceholder = {
    maskPlaceholder: 'xxxx xxxx xxxx xxxx',
    customPatternOptions: {
      mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  }

  // Text Input with Time Mask Pattern (with Placeholder)
  public maskOptionsTimeWithPlaceholder = {
    maskPlaceholder: 'HH:MM:SS',
    customPatternOptions: {
      mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    },
  }

  // Text Input with Fixed Length Currency Mask Pattern (with Placeholder)
  public maskOptionsFixedLengthCurrencyWithPlaceholder = {
    maskPlaceholder: '$xxx.xx',
    customPatternOptions: {
      mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
    },
  }

  // Phone Input with Default Country Code (RO)
  public maskOptionsPhoneDefault = {
    telPatternOptions: {
      countryCode: 'RO',
    },
  }

  // Phone Input with Custom Mask Pattern
  public maskOptionsPhoneCustom = {
    telPatternOptions: {
      countryPhoneCode: '+40',
      mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  }

  // Phone Input with Custom Mask Pattern (with Placeholder)
  public maskOptionsPhoneWithPlaceholder = {
    maskPlaceholder: '+40 (xxx) xxx-xxx',
    telPatternOptions: {
      countryPhoneCode: '+40',
      mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public isLoadingM: boolean = false
  public isLoadingS: boolean = false

  public handleInputChangeM(event: any): void {
    const value = event.target.value

    this.isLoadingM = !!value
    if (value) {
      setTimeout(() => {
        this.isLoadingM = false
      }, 2000)
    }
  }

  public handleInputChangeS(event: any): void {
    const value = event.target.value

    this.isLoadingS = !!value
    if (value) {
      setTimeout(() => {
        this.isLoadingS = false
      }, 2000)
    }
  }
}
