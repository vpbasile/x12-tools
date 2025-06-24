import { Accordion, Box, Heading, VStack } from '@chakra-ui/react';
import ColorModeButton from '../helper/colorModeButton';

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <Box id="appContainer">
            <Accordion allowMultiple marginBottom={'2xl'}>
                {props.children}
            </Accordion>
            <VStack borderRadius={'2xl'} id='footer' p={2} textAlign='right' position='fixed' bottom='0' w='min-content' right='0' zIndex='1000'
                bgColor={'blackAlpha.700'}>
                <Heading as="h1">X12 Tools</Heading>
                <Box p={3} ><ColorModeButton /></Box>
            </VStack>
        </Box>
    )
}