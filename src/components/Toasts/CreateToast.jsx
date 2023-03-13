import { useToast } from '@chakra-ui/react';

const CreateToast = (description, status) => {
  const toast = useToast();
  return toast({
    position: 'bottom-right',
    description: { description },
    status: { status },
    duration: 3000,
    isClosable: true,
  });
};

export default CreateToast;
