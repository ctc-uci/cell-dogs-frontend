import { Avatar, Input } from '@chakra-ui/react';
import { React, useState } from 'react';
import './UploadAvatar.css';

function UploadAvatar({ width = '40px', height = '40px' }) {
  const [avatar, setAvatar] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const handleAvatarChange = event => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
    setShowInput(false);
  };

  // const hiddenFileInput = React.useRef(null);
  // const displayFileUpload = event => {
  //   if (showInput) {

  //   }
  //  };
  return (
    <div>
      <Avatar
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
      {/* <div className="uploadAvatarButton">
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
      </div> */}
      {showInput ? (
        <Input
          type="file"
          onChange={handleAvatarChange}
          // ref={hiddenFileInput}
          // style={{ display: 'none' }}
        />
      ) : null}
      {/* {avatar && <Image src={avatar} boxSize="150px" objectFit="cover" />} */}
    </div>
  );
}

export default UploadAvatar;
