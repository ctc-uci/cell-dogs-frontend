import * as yup from 'yup';

export default yup.object().shape({
  dogname: yup.string(),
  age: yup.number(),
  breed: yup.string(),
  chiptype: yup.string(),
  chipnum: yup.number(),

  gender: yup.string(),

  altname: yup.string(),
  service: yup.boolean(),
  therapy: yup.boolean(),
  staffAdoption: yup.boolean(),
  specialNeeds: yup.boolean(),
  deceased: yup.boolean(),

  shelter: yup.string(),
  groupnum: yup.string(),
  graddate: yup.date(),
  facilityid: yup.string(),
  facilityUnit: yup.string(),

  // notes
  notes: yup.string(),

  // Adopter Info Section
  adoptername: yup.string(),
  adopterphone: yup
    .string()

    .length(10, 'Phone number must be 10 digits'),
  adopteremail: yup.string().email('Invalid email address'),

  // Adopter Address Section
  adopteraddrline: yup.string(),
  adoptercity: yup.string(),
  adopterstate: yup.string(),
  adopterzip: yup.string().max(5, 'Zip code must be 5 digits'),

  // Financial Info Section
  fees: yup.number('Must be a number'),
  revenue: yup.number('Must be a number'),
});
