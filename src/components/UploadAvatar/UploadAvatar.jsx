import { useState, React } from 'react';
import { Avatar, Input } from '@chakra-ui/react';
import { AddIcon, Icon } from '@chakra-ui/icons';
import './UploadAvatar.css';

function UploadAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const handleAvatarChange = event => {
    console.log('it worked');
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  // const hiddenFileInput = React.useRef(null);
  // const displayFileUpload = event => {
  //   if (showInput) {

  //   }
  //  };
  return (
    <div>
      <div className="uploadAvatarButton">
        <Icon
          as={AddIcon}
          // onClick={() => {
          //   hiddenFileInput.current.click();
          // }}
          onClick={() => {
            if (showInput) {
              setShowInput(false);
            } else {
              setShowInput(true);
            }
          }}
        />
      </div>
      {showInput ? (
        <Input
          type="file"
          onChange={handleAvatarChange}
          // ref={hiddenFileInput}
          // style={{ display: 'none' }}
        />
      ) : null}
      {/* {avatar && <Image src={avatar} boxSize="150px" objectFit="cover" />} */}
      <Avatar src={avatar} onClick={() => {}} />
    </div>
  );
}

export default UploadAvatar;
