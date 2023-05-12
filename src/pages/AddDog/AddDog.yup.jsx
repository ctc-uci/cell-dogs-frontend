import * as yup from 'yup';

export default yup.object().shape({
  // dogid
  // Dog Info Section
  dogname: yup.string().required('Dog name is required'),
  age: yup.number().required('Age is required'),
  breed: yup.string().required('Breed is required'),
  chiptype: yup.string().required('Chip type is required'),
  chipnum: yup.number().required('Chip number is required'),

  gender: yup.string().required('Gender is required'),

  altname: yup.string(),
  service: yup.boolean(),
  therapy: yup.boolean(),
  staffAdoption: yup.boolean(),
  specialNeeds: yup.boolean(),
  deceased: yup.boolean(),

  shelter: yup.string().required('Shelter is required'),
  groupnum: yup.string().required('Group number is required'),
  graddate: yup.date().required('Graduation date is required'),
  facilityid: yup.string().required('Facility ID is required'),
  facilityUnit: yup.string(),

  // notes
  notes: yup.string(),

  // Adopter Info Section
  adoptername: yup.string().required('Adopter name is required'),
  adopterphone: yup.string().required('Adopter phone number is required'),
  adopteremail: yup.string().email('Invalid email address').required('Adopter email is required'),

  // Adopter Address Section
  adopteraddrline: yup.string().required('Address line is required'),
  adoptercity: yup.string().required('City is required'),
  adopterstate: yup.string().required('State is required'),
  adopterzip: yup.string().required('Zip code is required').max(5, 'Zip code must be 5 digits'),

  // Financial Info Section
  fees: yup.number('Must be a number'),
  revenue: yup.number('Must be a number'),
});
