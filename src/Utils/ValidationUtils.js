/* eslint-disable no-useless-escape */
export const validation = {
  mobile: {
    pattern: /^[0]?[6789]\d{9}$/, //                /^([0-9'-\s]){10}$/         previos validation
    message: 'Invalid mobile number',
  },
  mobile2: {
    pattern: /^[^!-\/:-@\[-`{-~]+$/, //                /^([0-9'-\s]){10}$/         previos validation
    message: 'Invalid mobile number',
  },
  upiPattern: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/,
    message: 'Invalid UPI Id',
  },
  email: {
    pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    ///^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: 'Invalid email Id',
  },
  pan: {
    pattern: /^([A-Z]){5}(\d){4}([A-Z]){1}$/,
    message: 'Invalid pan number',
  },
  aadhar: {
    pattern: /^([0-9-\s]){12}$/,
    message: 'Invalid aadhar number /virtual ID',
  },
  virtualID: {
    pattern: /^([0-9-\s]){16}$/,
    message: 'Invalid aadhar number /virtual ID',
  },
  isNumberField: {
    pattern: /^\d+$/,
    message: 'Invalid gross annual income',
  },
  isOnlyTextField: {
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Invalid gross annual income',
  },
  TIN: {
    pattern: /^\d{9}$/,
    messege: 'Invalid TIN',
  },
  pinCode: {
    pattern: /[1-9]{1}[0-9]{6}/,
    messege: 'Invalid PinCode',
  },
  pinCodeReplace: {
    pattern: /[^0-9]+/g,
    messege: 'Invalid PinCode',
  },
  address: {
    pattern: /[^A-Za-z 0-9/,]+/g,
    messege: 'Invalid Address',
  },
  accountNumber: {
    pattern: /^[0-9]*$/g,
    messege: 'Invalid Account Number',
  },
  searchResume: {
    pattern: /^[a-zA-Z0-9]*$/g,
    messege: 'Invalid Address',
  },
};

export const isValidMobileNo = value => {
  if (validation.mobile.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
export const isValidEmailId = value => {
  if (validation.email.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
export const isValidPan = value => {
  if (validation.pan.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
export const isValidAadhar = value => {
  if (
    validation.aadhar.pattern.test(value) ||
    validation.virtualID.pattern.test(value)
  ) {
    return true;
  } else {
    return false;
  }
};
export const isValidField = value => {
  if (validation.isNumberField.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};
export const isValidNameField = value => {
  if (validation.isOnlyTextField.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const isValidTIN = value => {
  if (validation.TIN.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const isValidPinCode = value => {
  if (validation.pinCode.pattern.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const removeNumberFromString = value => {
  return value.replace(/[^A-Za-z ]+/g, '');
};

export const isEmptyValue = value => {
  if (
    value == null ||
    value == undefined ||
    value == '' ||
    value == [] ||
    value == {}
  )
    return true;
  else return false;
};
export const getValueIfNonEmpty = value => {
  if (value && value != null && value != undefined) {
    return value;
  } else {
    return '';
  }
};

export const validateUPI = (upiId) => {
  if (validation.upiPattern.pattern.test(upiId)) {
    return true;
  } else {
    return false;
  }
}
