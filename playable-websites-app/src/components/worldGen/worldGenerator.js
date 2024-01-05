import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { FaMap } from "react-icons/fa";
import TerrainEditor from './terrain/terrainEditorControls';
import useTerrainStore from '@/app/zustand/terrainStore';

const WorldGenerator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleEditorMode = useTerrainStore((state) => state.toggleEditorMode);

  const handleDrawerOpen = () => {
    onOpen();
    toggleEditorMode();
  };

  const handleDrawerClose = () => {
    onClose();
    toggleEditorMode();
  };

  return (
    <>
      <Button onClick={handleDrawerOpen}><FaMap /></Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={handleDrawerClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent maxW="35vw">
          <DrawerCloseButton />
          <DrawerHeader>World Generator</DrawerHeader>
          <DrawerBody>
            <Tabs variant='soft-rounded'>
              <TabList>
                <Tab>Terrain</Tab>
                <Tab isDisabled>Biomes</Tab>
                <Tab isDisabled>Objects</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <TerrainEditor />
                </TabPanel>
                <TabPanel>
                  {/* Biomes Editor */}
                </TabPanel>
                <TabPanel>
                  {/* Objects Editor */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default WorldGenerator;
