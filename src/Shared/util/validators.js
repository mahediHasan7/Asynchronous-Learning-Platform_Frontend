const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PHONE = 'PHONE';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_QUILL = 'QUILL';
const VALIDATOR_TYPE_QUIZ = 'QUIZ';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PHONE = () => ({ type: VALIDATOR_TYPE_PHONE });
export const VALIDATOR_QUILL = () => ({ type: VALIDATOR_TYPE_QUILL });
export const VALIDATOR_QUIZ = () => ({ type: VALIDATOR_TYPE_QUIZ });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PHONE) {
      isValid = isValid && /(\+)?\d{8}$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_QUILL) {
      // console.log('-----START------');
      // value.ops.forEach((content) => {
      //   console.log(content);
      // });
      // console.log('-----END------');
      isValid =
        (isValid && value.ops[0].insert.length > 1) ||
        (isValid && value.ops.length > 1);
    }
    if (validator.type === VALIDATOR_TYPE_QUIZ) {
      //! console.log(value);
      // console.log('-----START------');
      // for (const item in value) {
      //   if (item !== 'solution') {
      //     console.log(value[item].isValid);
      //   }
      // }
      // console.log('-----END------');
      for (const item in value) {
        if (item !== 'solution') {
          isValid = isValid && value[item].isValid;
        }
      }
      // console.log(isValid);
    }
  }
  return isValid;
};
