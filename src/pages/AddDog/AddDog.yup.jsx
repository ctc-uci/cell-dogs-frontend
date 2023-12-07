import * as yup from 'yup';

export default yup.object().shape({
  dogname: yup.string(),
  age: yup.number().notRequired(),
  breed: yup.string().notRequired(),
  chiptype: yup.string().notRequired(),
  chipnum: yup.number().notRequired(),

  gender: yup.string().notRequired(),

  altname: yup.string().notRequired(),
  service: yup.boolean().notRequired(),
  therapy: yup.boolean().notRequired(),
  staffAdoption: yup.boolean().notRequired(),
  specialNeeds: yup.boolean().notRequired(),
  deceased: yup.boolean().notRequired(),

  shelter: yup.string().notRequired(),
  groupnum: yup.string().notRequired(),
  graddate: yup.date().notRequired(),
  facilityid: yup.string().notRequired(),
  facilityUnit: yup.string().notRequired(),

  // notes
  notes: yup.string().notRequired(),

  // Adopter Info Section
  adoptername: yup.string().notRequired(),
  adopterphone: yup.string().notRequired(),

  // .length(10, 'Phone number must be 10 digits'),
  adopteremail: yup.string().email('Invalid email address').notRequired(),

  // Adopter Address Section
  adopteraddrline: yup.string().notRequired(),
  adoptercity: yup.string().notRequired(),
  adopterstate: yup.string().notRequired(),
  adopterzip: yup.string().max(5, 'Zip code must be 5 digits').notRequired(),

  // Financial Info Section
  fees: yup.number('Must be a number').notRequired(),
  revenue: yup.number('Must be a number').notRequired(),
});
