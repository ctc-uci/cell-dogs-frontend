import { Avatar, Input, Flex, Button } from '@chakra-ui/react';
import { React, useState } from 'react';
import { storage } from '../../firebase'; // Import the Firebase storage module
import './UploadAvatar.css';

function UploadAvatar({ width = '40px', height = '40px', setUrl }) {
  const [avatar, setAvatar] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = async event => {
    const file = event.target.files[0];
    setLoading(true);
    if (file && file.type.includes('image')) {
      try {
        const storageRef = storage.ref();
        const name = new Date().getTime();
        const fileRef = storageRef.child(name);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();
        setAvatar(fileUrl);
        if (setUrl) setUrl(fileUrl);
        setShowInput(false);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Invalid file type. Only images are allowed.');
    }
    setLoading(false);
  };

  return (
    <Flex width="100%" direction="column" alignItems="center" gap={5}>
      <Avatar
        _hover={{ cursor: 'pointer' }}
        src={avatar}
        width={width}
        height={height}
        onClick={() => {
          if (showInput) {
            setShowInput(false);
          } else {
            setShowInput(true);
          }
        }}
      />
      <Flex maxWidth="150px" justifyContent="center">
        <Input type="file" accept="image/*" onChange={handleAvatarChange} />
      </Flex>
      {loading && <Button colorScheme="blue" isLoading loadingText="Uploading" />}
    </Flex>
  );
}

export default UploadAvatar;
