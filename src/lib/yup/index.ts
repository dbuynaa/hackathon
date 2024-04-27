import * as yup from "yup";

const loginEmail = yup.object().shape({
  email: yup.string().nullable().email().required(""),
  password: yup.string().nullable().min(8, "").required(""),
});

const vendorCreate = yup.object().shape({
  email: yup.string().nullable().email().required(),
  name: yup.string().nullable().required(),
  contact: yup.string().nullable().required(),
});

export const Yup = { loginEmail, vendorCreate };
