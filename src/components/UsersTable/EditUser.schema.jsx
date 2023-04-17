import * as yup from 'yup';

export default yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),

  facility: yup.number().integer().required('Facility is required'),
});
