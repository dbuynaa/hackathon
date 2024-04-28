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

const productCreate = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  image: yup.string().notRequired(),
  description: yup.string().required(),
  parent: yup.string().required(),
  children: yup.string().required(),
});

const validationCreate = yup.object().shape({
  content: yup.string().required(),
});


export const Yup = { loginEmail, vendorCreate, productCreate,validationCreate };
