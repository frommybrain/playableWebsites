import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    Image,
    Stack,
    StackDivider,
    Text,
    VStack,
    Box,
    Heading,
    useToast,
    Divider
} from '@chakra-ui/react';
import { FaSpotify, FaGoogle, FaEllipsisH, FaSignOutAlt } from "react-icons/fa";

import useUserStore from '@/app/zustand/userStore';
import updateUserScore from '../../../utils/updateUserScore';

const ToggleMenu = () => {
    const { user, isLoggedIn, logout, setUser } = useUserStore(state => state);
    const [isOpen, setIsOpen] = useState(false);
    const [spotifyButtonText, setSpotifyButtonText] = useState('Connect Spotify');
    const btnRef = useRef();
    const toast = useToast();

    const toggleDrawer = () => setIsOpen(!isOpen);

    const handleAddScore = async () => {
        if (user) {
            const newScore = await updateUserScore(user.id, 100);
            if (newScore !== null) {
                setUser({ ...user, score: newScore });
                toast({ title: "Score added", status: "success" });
            }
        }
    };

    const handleSpotifyConnect = () => {
        window.location.href = '/api/auth/spotify';
    };

    useEffect(() => {
        const checkSpotifyConnection = async () => {
            if (user) {
                const response = await fetch('/api/auth/spotify/checkSpotifyConnection');
                if (response.ok) {
                    const { isConnected } = await response.json();
                    setSpotifyButtonText(isConnected ? 'Recheck Spotify' : 'Connect Spotify');
                }
            }
        };

        checkSpotifyConnection();
    }, [user]);

    return (
        <>
            <IconButton
                ref={btnRef}
                colorScheme="blue"
                icon={<FaEllipsisH />}
                onClick={toggleDrawer}
                aria-label="Open Menu"
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={toggleDrawer}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    {isLoggedIn && user ? (
                        <VStack spacing={4} align="start" p={4}>
                            <Image
                                borderRadius="full"
                                boxSize="50px"
                                src="/images/fmbFace.png"
                                alt="Profile Image"
                            />
                            <Heading size="md" mb={4}>Welcome, {user.first_name}</Heading>



                            <Card>
                                <CardHeader>
                                    <Heading size='md'>Tasks</Heading>
                                </CardHeader>

                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Add Points
                                            </Heading>
                                            <Text pt='2' pb='4' fontSize='sm'>
                                                Add 100 points
                                            </Text>
                                            <Button width="full" mt={2} onClick={handleAddScore}>Add 100 Points</Button>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Spotify
                                            </Heading>
                                            <Text pt='2' pb='4' fontSize='sm'>
                                                Follow xx on spotify to earn 1000 points.
                                            </Text>
                                            <Button width="full" leftIcon={<FaSpotify />} colorScheme="green" onClick={handleSpotifyConnect}>{spotifyButtonText}</Button>

                                        </Box>

                                    </Stack>
                                </CardBody>
                            </Card>

                            <Divider my={4} />

                            <Button leftIcon={<FaSignOutAlt />} onClick={logout} width="full">
                                Logout
                            </Button>
                        </VStack>
                    ) : (
                        <VStack spacing={4} align="start" p={4}>
                            <Button leftIcon={<FaGoogle />} onClick={() => window.location.href = '/api/auth/google'} colorScheme="red" width="full">
                                Login with Google
                            </Button>
                        </VStack>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ToggleMenu;
