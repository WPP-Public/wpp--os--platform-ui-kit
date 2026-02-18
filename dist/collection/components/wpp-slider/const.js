export const DEFAULT_INPUT_WIDTH = '68px';
export const getDefaultMaskOptions = (step) => ({
  decimalSeparator: '.',
  thousandSeparator: '',
  minimumFractionDigits: 0,
  maximumFractionDigits: String(step).split('.')[1]?.length || 0,
});
export const parseMaskedInput = (input, options) => {
  const { prefix = '', postfix = '', decimalSeparator = '.', thousandSeparator = '' } = options;
  let cleanedInput = input;
  if (prefix && cleanedInput.startsWith(prefix)) {
    cleanedInput = cleanedInput.slice(prefix.length);
  }
  if (postfix && cleanedInput.endsWith(postfix)) {
    cleanedInput = cleanedInput.slice(0, -postfix.length);
  }
  if (thousandSeparator) {
    const thousandSeparatorRegex = new RegExp(`\\${thousandSeparator}`, 'g');
    cleanedInput = cleanedInput.replace(thousandSeparatorRegex, '');
  }
  if (decimalSeparator !== '.') {
    const decimalSeparatorRegex = new RegExp(`\\${decimalSeparator}`);
    cleanedInput = cleanedInput.replace(decimalSeparatorRegex, '.');
  }
  const parsedNumber = Number(cleanedInput);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};
export const getMaskOptionsForInput = (sliderType, inputType, maskOptions) => {
  if (sliderType === 'single') {
    const options = maskOptions;
    return options ? options : { decimalSeparator: '.' };
  }
  else {
    if (inputType === 'min') {
      const options = maskOptions;
      if (!options)
        return { decimalSeparator: '.' };
      return options[0] ? options[0] : { decimalSeparator: '.' };
    }
    else {
      const options = maskOptions;
      if (!options)
        return { decimalSeparator: '.' };
      return options[1] ? options[1] : { decimalSeparator: '.' };
    }
  }
};
