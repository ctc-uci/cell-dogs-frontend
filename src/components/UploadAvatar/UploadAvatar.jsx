import { useState, React } from 'react';
import { Input, Image } from '@chakra-ui/react';

function AvatarUpload() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = event => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <Input type="file" onChange={handleAvatarChange} />
      {avatar && <Image src={avatar} boxSize="150px" objectFit="cover" />}
    </div>
  );
}

export default AvatarUpload;
