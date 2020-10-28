import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is a required field")
    .matches(/^\D+$/, "Field should not contain numbers"),
  email: Yup.string()
    .email("Email Should be valid")
    .required("This is a required field"),
  telephone: Yup.string().matches(
    /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/,
    "Phone should be valid"
  ),
  message: Yup.string().required("This is a required field"),
});

export default contactSchema;
