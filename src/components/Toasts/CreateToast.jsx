// import { useToast } from '@chakra-ui/react';

const CreateToast = ({ description, status, toast }) => {
  // const { newToast } = toast;
  toast({
    position: 'bottom-right',
    description: { description },
    status: { status },
    duration: 3000,
    isClosable: true,
  });
};

export default CreateToast;
