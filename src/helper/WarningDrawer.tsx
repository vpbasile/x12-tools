import { InfoIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"

export default function WarningDrawer(props: { isOpen: boolean, onClose: () => void, children?: React.ReactNode }) {
    const { isOpen, onClose } = props
    // const btnRef = React.useRef()

    return (
        <>
        {props.children}
            <Card><CardBody>
                <InfoIcon />
                Though this app is published to the web, the data is all parsed and handled locally on the user's machine. No data is saved or transferred anywhere.
            </CardBody></Card>
            <Card><CardBody color={'red'}>
                <WarningTwoIcon color={'red'} />
                Please remember to handle all PII and PHI safely to protect the patients and other parties referenced in message data.</CardBody></Card>
            <Drawer
                isOpen={isOpen}
                placement='top'
                onClose={onClose}
            // finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Notices</DrawerHeader>
                    <DrawerBody>
                    </DrawerBody>
                    <DrawerFooter>
                        <DrawerCloseButton />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}