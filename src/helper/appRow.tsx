import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function AppRow(props: { children: React.ReactNode, id?: string, headingText?: string }): React.ReactNode {


    const foregroundColor = useColorModeValue('black', 'white')
    return (
        <Flex id={props.id || "defaultID"} w='100%' p={4} borderTop={"3px solid " + foregroundColor}>
            {props.headingText && <Heading as='h2' size='xl'>{props.headingText}</Heading>}
            {props.children}
        </Flex>
    )
}