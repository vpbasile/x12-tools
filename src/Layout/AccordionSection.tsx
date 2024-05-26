import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading } from "@chakra-ui/react";

export default function AccordionSection(props: { title: string, children: React.ReactNode }) {
    const { title, children } = props;
    return <AccordionItem>
        <h2>
            <AccordionButton>
                <Heading as={'h2'}>{title}</Heading>
                <AccordionIcon />
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>

}