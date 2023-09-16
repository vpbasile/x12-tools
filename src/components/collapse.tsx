import { Box, useDisclosure, Button, Collapse } from "@chakra-ui/react"
// import { Box } from "framer-motion"

export default function CollapseEx(props: { children: JSX.Element, buttonText: string }) {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

    return (
        <>
            <Button onClick={onToggle}>{props.buttonText}</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box>
                    {props.children}
                </Box>
            </Collapse>
        </>
    )
}