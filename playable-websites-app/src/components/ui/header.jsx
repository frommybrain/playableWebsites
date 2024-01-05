import React from 'react';
import { Box } from '@chakra-ui/react';
import ToggleMenu from './toggleMenu';
import WorldGenerator from '../worldGen/worldGenerator';

const Header = () => {
    return (
        <Box 
            position="absolute" 
            top={0} 
            left={0} 
            right={0} 
            zIndex={10} 
            p={4} 
        >
            <ToggleMenu />
            <WorldGenerator />
        </Box>
    );
};

export default Header;
