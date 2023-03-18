/* eslint-disable object-shorthand */

const CreateToast = ({ description, status, toast }) => {
  toast({
    position: 'bottom-right',
    description: description,
    status: status,
    duration: 3000,
    isClosable: true,
  });
};

export default CreateToast;
