import * as Yup from "yup";

export const signupFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters long.")
    .required("Must include the username"),
  email: Yup.string()
    .email("Must use a valid email address")
    .required("Email is a required field"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charatercs long.")
    .required("Should be a mix of letters and numbers"),
  // phoneNo: Yup
  //     .number()
  //     .typeError("That doesn't look like a phone number")
  //     .positive("A phone number can't start with a minus")
  //     .integer("A phone number can't include a decimal point")
  //     .min(10, 'Phonenumber must be at least 10 numbers')
  //     .required('A phone number is required'),
});

export const loginFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 charatercs long.")
    .required("Should be a mix of letters and numbers"),
  name: Yup.string()
    .min(6, "Name must be at least 6 charatercs long.")
    .required("Must include Name."),
});
