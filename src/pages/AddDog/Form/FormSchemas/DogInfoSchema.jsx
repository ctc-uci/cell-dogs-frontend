export default [
  {
    key: 'name',
    type: 'split',
    childrenInputs: [
      {
        key: 'dogname',
        type: 'text',
        placeholder: 'Enter Dog Name',
        title: 'Dog Name',
      },
      {
        key: 'altname',
        type: 'text',
        placeholder: 'Enter Alt Name',
        title: 'Alt Name',
      },
    ],
  },

  {
    type: 'split',
    key: 'nameBreed',
    childrenInputs: [
      {
        key: 'age',
        type: 'number',
        placeholder: 'Enter Age',
        title: 'Age',
      },
      {
        key: 'breed',
        type: 'text',
        placeholder: 'Enter Breed',
        title: 'Breed',
      },
    ],
  },
  {
    type: 'split',
    key: 'nameBreed',
    childrenInputs: [
      {
        key: 'chiptype',
        type: 'select',
        placeholder: 'Enter Chip Type',
        title: 'Chip Type',
        options: [
          'AVID',
          'AKC Reunite',
          '24 PetWatch',
          'Home Again',
          'Micro Chip',
          'Found Animals',
        ],
      },
      {
        key: 'chipnum',
        type: 'text',
        placeholder: 'Enter Chip Number',
        title: 'Chip Number',
      },
    ],
  },

  {
    key: 'gender',
    type: 'select',
    placeholder: 'Enter Gender',
    title: 'Gender',
    options: ['Female-Spayed', 'Male-Neutered', 'Male', 'Female'],
  },
];
