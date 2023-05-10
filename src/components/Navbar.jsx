import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Collapse,
  Flex,
  Hide,
  IconButton,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import cellDogsLogoHorizontal2 from '../assets/CellDogs_logo_horizontal 2.png';
import AddNewUserModal from './AddNewUserModal';
import ProfileMenuModal from './ProfileMenuModal';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const {
    isOpen: accountModalisOpen,
    onOpen: accountModalonOpen,
    onClose: accountModalonClose,
  } = useDisclosure();
  // const { currentUser } = useAuth();

  const icons = { false: <HamburgerIcon />, true: <CloseIcon /> };
  return (
    <>
      <Flex
        width="100%"
        height="80px"
        bg="#21307a"
        justifyContent="space-between"
        alignItems="center"
        pl={3}
      >
        <Hide above="md">
          <IconButton
            icon={icons[isOpen]}
            onClick={onToggle}
            bg="transparent"
            variant="noHover"
            color="white"
          />
        </Hide>
        <Flex direction="row" height="100%" alignItems="center">
          <NavLink to="/">
            <Image
              // have a ml of 45 above md
              // ml={[0, 0, 0, 0, 45]}
              src={cellDogsLogoHorizontal2}
              alt="Cell Dogs Logo Horizontal 2"
              // width={150}
              // height="100%"
            />
          </NavLink>
          <Hide below="md">
            <Flex ml={58} direction="row" height="100%">
              {[
                {
                  name: 'Adoption Log',
                  path: '/adoption-log',
                },
                {
                  name: 'Facilities',
                  path: '/facilities',
                },
                {
                  name: 'Users',
                  path: '/users',
                },
              ].map(({ name, path }) => {
                const selected = window.location.pathname === path;
                return (
                  <LinkBox
                    as={Flex}
                    _hover={{
                      bg: 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                    }}
                    bg={selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent'}
                    key={name}
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    height="100%"
                    px={10}
                    outlineBorder={selected}
                    boxSizing="border-box"
                    // add a thick white border to the bottom of the selected link
                    borderBottom={selected ? '4px solid #E2E8F0' : 'none'}
                  >
                    <LinkOverlay as={NavLink} to={path}>
                      {name}
                    </LinkOverlay>
                  </LinkBox>
                );
              })}
            </Flex>
          </Hide>
        </Flex>
        <Flex direction="row" height="100%" alignItems="center">
          <Button
            // make bg #C3CBDB with alpha 0.1
            bg="rgba(195, 203, 219, 0.1)"
            borderRadius="15px"
            height="44px"
            color="white"
            _hover={{
              bg: 'rgba(195, 203, 219, 0.2)',
            }}
            onClick={accountModalonOpen}
          >
            <BsFillPersonPlusFill size={28} />

            <Hide below="md">
              <Text ml={3}>Add Users</Text>
            </Hide>
          </Button>
          <AddNewUserModal isOpen={accountModalisOpen} onClose={accountModalonClose} />
          <Flex ml={3} alignItems="center" height="100%">
            <ProfileMenuModal />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} padding="0" zIndex="1">
        <Stack boxShadow="lg">
          <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
            <Link href="/">Adoption Log</Link>
          </Button>
          <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
            <Link href="/facilities">Facilities</Link>
          </Button>
          <Button borderRadius={0} bg="white" justifyContent="left" w="100%" marginLeft={0}>
            <Link href="/">Users</Link>
          </Button>
        </Stack>
      </Collapse>
    </>
  );
};

export default Navbar;
