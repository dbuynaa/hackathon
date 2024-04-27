import * as yup from "yup";

const loginEmail = yup.object().shape({
  email: yup.string().nullable().email().required(""),
  password: yup.string().nullable().min(8, "").required(""),
});

export const Yup = { loginEmail }