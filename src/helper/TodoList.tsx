import { ArrowForwardIcon } from "@chakra-ui/icons";
import { List, Heading, ListItem, ListIcon } from "@chakra-ui/react";

export default function TodoList() {

  const listBullet = <ListIcon as={ArrowForwardIcon} color='green.500' />;

  let i = 0;
  const todo: JSX.Element[] = [
    <>Function to anonymize data</>,
  ];


  return (<List spacing={3} p={3}>
    <Heading as={'h3'}>Future Enhancements</Heading>
    {todo.map(eachItem => <ListItem key={`todo-${i++}`}>{listBullet}{eachItem}</ListItem>)}
  </List>)
}