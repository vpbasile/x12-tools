import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export default function AppRow(props: { children: React.ReactNode, id?: string, headingText?: string }): React.ReactNode {
    return (
        <Flex id={props.id || "defaultID"} w='100%' p={4} borderTop="3px solid black">
            {props.headingText && <Heading as='h2' size='xl'>{props.headingText}</Heading>}
            {props.children}
        </Flex>
    )
}