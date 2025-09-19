<script setup lang="ts">
import { ref } from 'vue'
import { WppIconCross, WppIconSearch, WppLabel, WppInput } from '@platform-ui-kit/components-library-vue'
import DecimalInput from './components/DecimalInput.vue'

const isLoadingM = ref(false)
const isLoadingS = ref(false)

const handleInputChangeM = (e) => {
  if (e.target.value) {
    isLoadingM.value = true
    setTimeout(() => {
      isLoadingM.value = false
    }, 2000)
  } else {
    isLoadingM.value = false
  }
}

const handleInputChangeS = (e) => {
  if (e.target.value) {
    isLoadingS.value = true
    setTimeout(() => {
      isLoadingS.value = false
    }, 2000)
  } else {
    isLoadingS.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="title">Inputs</h1>
    <h2 class="title">Size M</h2>
    <div class="size" data-testid="m-size-inputs">
      <div class="inputs">
        <h3>Regular Inputs</h3>

        <WppInput name="wpp-input" placeholder="Enter text" data-testid="regular-m-input" required autoFocus
          autocomplete="on" defaultValue="Default Value" :labelConfig="{
            icon: 'wpp-icon-info',
            text: 'Normal Input with autocomplete on and `defaultValue`',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }" />

        <WppInput :labelConfig="{ text: 'Normal Password Input with autocomplete on' }" autocomplete="on"
          placeholder="Enter text" data-testid="regular-password-m-input" type="password" name="passwordInput"
          required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input' }" placeholder="Enter text" disabled
          data-testid="disabled-m-input" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Message' }" placeholder="Enter text"
          data-testid="message-m-input" message="Info message" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="warning-m-input" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input' }" placeholder="Enter text" messageType="error"
          message="Error message" data-testid="error-m-input" required />
      </div>

      <div class="inputs">
        <h3>Inputs with Icons</h3>
        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Search Icon' }" placeholder="Enter text"
          data-testid="search-icon-m-input" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input with Search Icon' }" placeholder="Enter text"
          disabled data-testid="disabled-search-icon-m-input" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Message and Icon' }"
          placeholder="Enter text" message="Info message" data-testid="search-icon-with-message-m-input" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input with Search Icon' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="search-icon-warning-m-input" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input with Search Icon' }" placeholder="Enter text"
          messageType="error" message="Error message" data-testid="search-icon-error-m-input" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Cross Icon' }" placeholder="Enter text"
          data-testid="cross-icon-m-input" required>
          <WppIconCross slot="icon-end" />
        </WppInput>
      </div>
      <div>
        <h3>Inputs with Icons</h3>
        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input with Cross Icon' }" placeholder="Enter text"
          disabled data-testid="disabled-cross-icon-m-input" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input with Cross Icon' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="cross-icon-warning-m-input" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input with Cross Icon' }" placeholder="Enter text"
          messageType="error" message="Error message" data-testid="cross-icon-error-m-input" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput :labelConfig="{ text: 'All In Input with Both Icons' }" name="allInMediumInput" value="All In"
          placeholder="Enter text" message="General message" type="password" messageType="warning"
          data-testid="all-in-m-input">
          <WppIconSearch slot="icon-start" />
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput :labelConfig="{ text: 'All In Input with Both Icons Disabled' }" name="all-in-medium-input"
          value="All In" placeholder="Enter text" message="General message" required type="password" messageType="error"
          disabled data-testid="disabled-all-in-m-input">
          <WppIconSearch slot="icon-start" />
          <WppIconCross slot="icon-end" />
        </WppInput>
      </div>
    </div>

    <h2 class="title">Size S</h2>
    <div class="size" data-testid="s-size-inputs">
      <div class="inputs">
        <h3>Regular Inputs</h3>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input' }" placeholder="Enter text"
          data-testid="regular-s-input" size="s" required />

        <WppInput :labelConfig="{ text: 'Normal Password Input' }" placeholder="Enter text"
          data-testid="regular-password-s-input" type="password" name="passwordInput" size="s" />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input' }" placeholder="Enter text" disabled
          data-testid="disabled-s-input" size="s" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Message' }" placeholder="Enter text"
          data-testid="message-s-input" message="Info message" size="s" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="warning-s-input" size="s" required />

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input' }" placeholder="Enter text" messageType="error"
          message="Error message" data-testid="error-s-input" size="s" required />
      </div>

      <div class="inputs">
        <h3>Inputs with Icons</h3>
        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Search Icon' }" placeholder="Enter text"
          data-testid="search-icon-s-input" size="s" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input with Search Icon' }" placeholder="Enter text"
          disabled data-testid="disabled-search-icon-s-input" size="s" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Message and Icon' }"
          placeholder="Enter text" data-testid="search-icon-with-message-s-input" message="Info message" size="s"
          required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input with Search Icon' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="search-icon-warning-s-input" size="s" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input with Search Icon' }" placeholder="Enter text"
          messageType="error" message="Error message" data-testid="search-icon-error-s-input" size="s" required>
          <WppIconSearch slot="icon-start" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Cross Icon' }" placeholder="Enter text"
          data-testid="cross-icon-regular-s-input" size="s" required>
          <WppIconCross slot="icon-end" />
        </WppInput>
      </div>

      <div>
        <h3>Input with Icons</h3>
        <WppInput name="wpp-input" :labelConfig="{ text: 'Disabled Input with Cross Icon' }" placeholder="Enter text"
          disabled data-testid="disabled-cross-icon-s-input" size="s" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Warning Input with Cross Icon' }" placeholder="Enter text"
          messageType="warning" message="Warning message" data-testid="cross-icon-warning-s-input" size="s" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput name="wpp-input" :labelConfig="{ text: 'Error Input with Cross Icon' }" placeholder="Enter text"
          messageType="error" message="Error message" data-testid="cross-icon-error-s-input" size="s" required>
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput :labelConfig="{ text: 'All In Input with Both Icons' }" name="allInSmallInput" value="All In"
          placeholder="Enter text" message="General message" type="password" messageType="warning" size="s"
          data-testid="all-in-s-input">
          <WppIconSearch slot="icon-start" />
          <WppIconCross slot="icon-end" />
        </WppInput>

        <WppInput :labelConfig="{ text: 'All In Input with Both Icons Disabled' }" name="allInSmallInput" value="All In"
          placeholder="Enter text" message="General message" required type="password" messageType="error" size="s"
          disabled data-testid="disabled-all-in-s-input">
          <WppIconSearch slot="icon-start" />
          <WppIconCross slot="icon-end" />
        </WppInput>
      </div>
    </div>

    <div data-testid="search-inputs-container">
      <h1 class="title">Search Inputs</h1>
      <div class="container">
        <div class="form">
          <h2 class="title">Size M</h2>
          <WppInput :labelConfig="{ text: 'Search Input' }" required name="wpp-input" type="search" size="m"
            placeholder="Enter search query" data-testid="search-input" />

          <WppInput name="wpp-input" :labelConfig="{ text: 'Search Input with text' }" class="item" required
            type="search" size="m" placeholder="Enter search query" data-testid="input-with-text" />

          <WppInput :labelConfig="{ text: 'Disabled Search Input' }" required class="item" name="wpp-input"
            type="search" size="m" placeholder="Enter search query" disabled />

          <WppInput :labelConfig="{ text: 'Search Input with info message' }" required class="item" name="wpp-input"
            type="search" size="m" placeholder="Enter search query" message="Info message" />

          <WppInput :labelConfig="{ text: 'Warning Search Input' }" required class="item" name="wpp-input" type="search"
            size="m" placeholder="Enter search query" message="Warning message" messageType="warning" />

          <WppInput :labelConfig="{ text: 'Error Search Input' }" required class="item" name="wpp-input" type="search"
            size="m" placeholder="Enter search query" message="Error message" messageType="error" />

          <WppInput :labelConfig="{ text: 'Disabled Warning Search Input' }" required class="item" name="wpp-input"
            type="search" size="m" placeholder="Enter search query" message="Warning message" messageType="warning"
            disabled />

          <WppInput :labelConfig="{ text: 'Disabled Error Search Input' }" required class="item" name="wpp-input"
            type="search" size="m" placeholder="Enter search query" message="Error message" messageType="error"
            disabled />
        </div>

        <div class="form">
          <h2 class="title">Size S</h2>
          <WppInput :labelConfig="{ text: 'Search Input' }" required name="wpp-input" type="search" size="s"
            placeholder="Enter search query" />

          <WppInput :labelConfig="{ text: 'Disabled Search Input' }" required class="item" name="wpp-input"
            type="search" size="s" placeholder="Enter search query" disabled />

          <WppInput :labelConfig="{ text: 'Search Input with info message' }" required class="item" name="wpp-input"
            type="search" size="s" placeholder="Enter search query" message="Info message" />

          <WppInput :labelConfig="{ text: 'Warning Search Input' }" required class="item" name="wpp-input" type="search"
            size="s" placeholder="Enter search query" message="Warning message" messageType="warning" />

          <WppInput :labelConfig="{ text: 'Error Search Input' }" required class="item" name="wpp-input" type="search"
            size="s" placeholder="Enter search query" message="Error message" messageType="error" />

          <WppInput :labelConfig="{ text: 'Disabled Warning Search Input' }" required class="item" name="wpp-input"
            type="search" size="s" placeholder="Enter search query" message="Warning message" messageType="warning"
            disabled />

          <WppInput :labelConfig="{ text: 'Disabled Error Search Input' }" required class="item" name="wpp-input"
            type="search" size="s" placeholder="Enter search query" message="Error message" messageType="error"
            disabled />
        </div>
      </div>
    </div>

    <div data-testid="number-inputs-container">
      <h1 class="title">Number Inputs</h1>
      <div class="container">
        <div class="form">
          <h2 class="title">Size M</h2>
          <WppLabel class="label" :config="{ text: 'Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" data-testid="number-input" />

          <WppLabel class="label" :config="{ text: 'Disabled Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" disabled />

          <WppLabel class="label" :config="{ text: 'Number Input with info message' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" message="Info message" />

          <WppLabel class="label" :config="{ text: 'Warning Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" message="Warning message"
            messageType="warning" />

          <WppLabel class="label" :config="{ text: 'Error Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" message="Error message"
            messageType="error" />

          <WppLabel class="label" :config="{ text: 'Disabled Warning Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" message="Warning message"
            messageType="warning" disabled />

          <WppLabel class="label" :config="{ text: 'Disabled Error Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="m" placeholder="Enter number" message="Error message"
            messageType="error" disabled />
        </div>

        <div class="form">
          <h2 class="title">Size S</h2>
          <WppLabel class="label" :config="{ text: 'Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" />

          <WppLabel class="label" :config="{ text: 'Disabled Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" disabled />

          <WppLabel class="label" :config="{ text: 'Number Input with info message' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" message="Info message" />

          <WppLabel class="label" :config="{ text: 'Warning Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" message="Warning message"
            messageType="warning" />

          <WppLabel class="label" :config="{ text: 'Error Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" message="Error message"
            messageType="error" />

          <WppLabel class="label" :config="{ text: 'Disabled Warning Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" message="Warning message"
            messageType="warning" disabled />

          <WppLabel class="label" :config="{ text: 'Disabled Error Number Input' }" typography="s-body" />
          <WppInput name="wpp-input" type="number" size="s" placeholder="Enter number" message="Error message"
            messageType="error" disabled />
        </div>
      </div>
    </div>

    <div data-testid="decimal-inputs-container">
      <h1 class="title">Decimal Inputs</h1>
      <div class="container">
        <div class="form">
          <h2 class="title">Size M</h2>

          <DecimalInput size="m" labelText="Decimal Input with minimum and maximum length validations. Default error
          messages. Value must be between [3, 8] to be valid." class="item" />
          <WppInput :labelConfig="{
            text: 'Decimal Input with minimum and maximum length validations. Error messages provided by user.',
          }" required class="item" type="decimal" size="s" placeholder="Enter number" minLength="3" maxLength="8"
            data-testid="diff-separator-input" :locales="{
              minLengthErrorMessage(minLength: number) {
                return `Minimum length must be ${minLength}`
              },
              maxLengthErrorMessage(maxLength: number) {
                return `Maximum length must be ${maxLength}`
              },
            }" />
        </div>
        <div class="form">
          <h2 class="title">Size S</h2>

          <DecimalInput size="s" labelText="Decimal Input with minimum and maximum length validations. Value must be
          between [3, 8] to be valid." class="item" />

          <WppInput :labelConfig="{
            text: 'Decimal Input with minimum and maximum length validations. Error messages provided by user.',
          }" required class="item" type="decimal" size="s" placeholder="12,23" data-testid="number-input" minLength="3"
            maxLength="8" :locales="{
              minLengthErrorMessage(minLength: number) {
                return `Minimum length must be ${minLength}`
              },
              maxLengthErrorMessage(maxLength: number) {
                return `Maximum length must be ${maxLength}`
              },
            }" />
        </div>
      </div>
    </div>

    <div data-testid="masks-inputs-container">
      <h1 class="title">Inputs with Masks</h1>
      <div class="container">
        <div class="form">
          <h2 class="title">Decimal Inputs</h2>

          <WppInput :labelConfig="{
            text: 'Decimal Input with mask pattern',
          }" required class="item" type="decimal" size="m" data-testid="custom-decimal-mask-input"
            placeholder="123.123,12" :maskOptions="{
              decimalPatternOptions: {
                decimalSeparator: ',',
                thousandSeparator: '.',
                precision: 2,
              },
            }" />
          <WppInput :labelConfig="{
            text: 'Decimal Input with currency mask pattern',
          }" required class="item" type="decimal" size="m" data-testid="currency-mask-input" placeholder="$100.12"
            :maskOptions="{
              decimalPatternOptions: {
                precision: 2,
                decimalSeparator: '.',
                min: 0,
                prefix: '$',
              },
            }" />
          <WppInput :labelConfig="{
            text: 'Decimal Input with percentage mask pattern',
          }" required class="item" type="decimal" size="m" data-testid="percentage-mask-input" placeholder="Ex: 97%"
            :maskOptions="{
              decimalPatternOptions: {
                postfix: '%',
                min: 0,
                max: 100,
                precision: 2,
              },
            }" />
        </div>
        <div class="form">
          <h2 class="title">Text Inputs</h2>
          <WppInput :labelConfig="{
            text: 'Text Input with credit card mask pattern ',
          }" required class="item" type="text" size="m" data-testid="credit-card-mask-input"
            placeholder="Enter credit card number: xxxx xxxx xxxx xxxx" :maskOptions="{
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
            }" />
          <WppInput :labelConfig="{
            text: 'Text Input with Time mask pattern',
          }" required class="item" type="text" size="m" data-testid="time-mask-input" placeholder="Enter HH:MM:SS"
            :maskOptions="{
              customPatternOptions: {
                mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
              },
            }" />
          <WppInput :labelConfig="{
            text: 'Text Input with currency and fixed number of digits mask pattern ($xxx.xx)',
          }" required class="item" type="text" size="m" data-testid="fixed-length-currency-mask-input"
            placeholder="Enter $xxx.xx" :maskOptions="{
              customPatternOptions: {
                mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
              },
            }" />

          <h2 class="title">with Mask Placeholder</h2>

          <WppInput :labelConfig="{
            text: 'Text Input with credit card mask pattern',
          }" required class="item" type="text" size="m" data-testid="text-input-custom-mask-4"
            placeholder="Enter credit card number: xxxx xxxx xxxx xxxx" :maskOptions="{
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
            }" />
          <WppInput :labelConfig="{
            text: 'Text Input with Time mask pattern',
          }" required class="item" type="text" size="m" data-testid="text-input-custom-mask-5"
            placeholder="Enter HH:MM:SS" :maskOptions="{
              maskPlaceholder: 'HH:MM:SS',
              customPatternOptions: {
                mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
              },
            }" />
          <WppInput :labelConfig="{
            text: 'Text Input with currency and fixed number of digits mask pattern',
          }" required class="item" type="text" size="m" data-testid="text-input-custom-mask-6"
            placeholder="Enter $xxx.xx" :maskOptions="{
              maskPlaceholder: '$xxx.xx',
              customPatternOptions: {
                mask: ['$', /\d/, /\d/, /\d/, '.', /\d/, /\d/],
              },
            }" />
        </div>
        <div class="form">
          <h2 class="title">Tel Inputs</h2>
          <WppInput :labelConfig="{
            text: 'Phone Input with countryCode = RO. Default phone mask applied when only countryCode provided',
          }" required name="wpp-input" type="tel" size="m" data-testid="phone-input-default-mask"
            placeholder="+40 729 165-805" :maskOptions="{
              telPatternOptions: {
                countryCode: 'RO',
              },
            }" class="item" />
          <WppInput :labelConfig="{ text: 'Phone Input with mask pattern' }" required type="tel" size="m"
            data-testid="phone-mask-input" placeholder="+40 (xxx) xxx-xxx" :maskOptions="{
              telPatternOptions: {
                countryPhoneCode: '+40',
                mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
              },
            }" class="item" />

          <h2 class="title">with Mask Placeholder</h2>
          <WppInput :labelConfig="{ text: 'Phone Input with mask pattern' }" required type="tel" size="m"
            data-testid="phone-input-custom-mask-2" placeholder="+40 (xxx) xxx-xxx" :maskOptions="{
              maskPlaceholder: '+40 (xxx) xxx-xxx',
              telPatternOptions: {
                countryPhoneCode: '+40',
                mask: ['+', '4', '0', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
              },
            }" class="item" />
        </div>
      </div>
    </div>
  </div>
  <div data-testid="search-inputs-container">
    <h1 class="title">Search Inputs</h1>
    <div class="container">
      <div class="form">
        <h2 class="title">Size M</h2>
        <WppInput :labelConfig="{ text: 'Search Input with Loading' }" required name="wpp-input" type="search" size="m"
          placeholder="Type to see the loading state" :loading="isLoadingM" @input="handleInputChangeM"
          data-testid="search-input-loading-m" />
      </div>
      <div class="form">
        <h2 class="title">Size S</h2>
        <WppInput :labelConfig="{ text: 'Search Input with Loading' }" required name="wpp-input" type="search" size="s"
          placeholder="Type to see the loading state" :loading="isLoadingS" @input="handleInputChangeS"
          data-testid="search-input-loading-s" />
      </div>
    </div>
    <div class="container">
      <div class="form">
        <h2 class="title">Size M</h2>
        <WppInput :labelConfig="{ text: 'Search Input with Loading' }" required name="wpp-input" type="search" size="m"
          placeholder="Enter search query" :loading="true" data-testid="search-input-loading-m" />
      </div>
      <div class="form">
        <h2 class="title">Size S</h2>
        <WppInput :labelConfig="{ text: 'Search Input with Loading' }" required name="wpp-input" type="search" size="s"
          placeholder="Enter search query" :loading="true" data-testid="search-input-loading-s" />
      </div>
    </div>
  </div>
  <div>
    <h1 class="title">Input with Message length auto</h1>
    <div class="container">
      <div class="form" style="'max-width': '492px', width: '100%'">
        <WppInput name="wpp-input" :labelConfig="{ text: 'Normal Input with Message' }" placeholder="Enter text"
          message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid" maxMessageLength="auto" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.size {
  display: flex;
  padding: 10px;
}

.inputs {
  margin-right: 10px;
}

.size div {
  width: 400px;
  padding: 10px;
  text-align: left;
  border: 1px solid rgb(0 0 0 / 12%);
  border-radius: 1px;
}

.title {
  text-align: center;
}

.container {
  display: flex;
}

.label .wpp-internal-label {
  margin-top: 10px;
}

.form {
  width: 400px;
  margin-right: 50px;
  padding: 10px;
  text-align: left;
  border: 1px solid rgb(0 0 0 / 12%);
  border-radius: 1px;
  margin-top: 10px;
}

.item {
  margin-top: 10px;
}
</style>
