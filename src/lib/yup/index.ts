import * as yup from "yup";

export const phoneRegExp =
  // eslint-disable-next-line no-useless-escape
  /^(?=([0-9\s-]*[0-9]){8})((\\+[1-9]{1,4}[ \-]*)|(\\([0-9]{2,3}\\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

const loginEmail = yup.object().shape({
  email: yup.string().nullable().email().required(""),
  password: yup.string().nullable().min(8, "").required(""),
});

export const Yup = { loginEmail }