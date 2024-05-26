import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Heading, List, ListIcon, ListItem } from "@chakra-ui/react";

export default function TodoList() {

  const listBullet = <ListIcon as={ArrowForwardIcon} color='green.500' />;

  let i = 0;
  const todo: JSX.Element[] = [
    <>Include line/segment numbers in snapshot data structure</>,
    <>Sort the comparison table by line/segment number</>,
    <>Function to anonymize data</>,

  ];


  return (<List spacing={3} p={3}>
    <Heading as={'h3'}>Future Enhancements</Heading>
    {todo.map(eachItem => <ListItem key={`todo-${i++}`}>{listBullet}{eachItem}</ListItem>)}
  </List>)
}