import { ArrowForwardIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import AccordionSection from "./Layout/AccordionSection";

export default function TodoList() {

  const listBullet = <ListIcon as={ArrowForwardIcon} color='green.500' />;

  let i = 0;

  return <AccordionSection title="Future Enhancements">
    <List spacing={3} p={3}>
      {[
        <>Include line/segment numbers in snapshot data structure</>,
        <>Sort the comparison table by line/segment number</>,
        <>Function to anonymize data</>,
      ].map(eachItem => <ListItem key={`todo-${i++}`}>{listBullet}{eachItem}</ListItem>)}
    </List>
  </AccordionSection>

}