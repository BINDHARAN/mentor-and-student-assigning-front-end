import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import { api } from "./student";
import { useFormik } from "formik";
import * as yup from "yup";

export const formValidationSchema = yup.object({
  name: yup
    .string()
    .required("Why not fill this name? 😉")
    .min(1, "Need a longer name 😄"),

  surname: yup
    .string()
    .required("Why not fill this surname? 😉")
    .min(1, "Need a longer surname 😄"),

  email: yup
    .string()
    .required("Why not fill this email? 😉")
    .min(2, "Need a longer email 😄"),
});

export function AddStudents() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newdata) => addstudent(newdata),
  });

  const addstudent = (newdata) => {
    fetch(`${api}`, {
      method: "POST",
      body: JSON.stringify([newdata]),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/students"));
  };

  return (
    <div>
      <h4 className="add-student-centent">Here you can add new student</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="form">
          <TextField
            label="Student Name"
            variant="outlined"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            label="Student Surname"
            id="surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            error={formik.touched.surname && formik.errors.surname}
            helperText={
              formik.touched.surname && formik.errors.surname
                ? formik.errors.surname
                : ""
            }
          />
          <TextField
            label="Student Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          <Button variant="contained" className="button" type="submit">
            Add Student
          </Button>
        </div>
      </form>
    </div>
  );
}
