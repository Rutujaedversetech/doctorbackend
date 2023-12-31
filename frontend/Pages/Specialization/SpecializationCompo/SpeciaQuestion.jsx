import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Flex,
    useColorModeValue,
    Text,
    Container,
  } from '@chakra-ui/react';
  
  import { ChevronDownIcon } from '@chakra-ui/icons';
  
  export default function SimpleAccordion() {
    return (
      <Flex
        minH={'auto'}
        // align={'center'}
        // justify={'center'}
        padding={'20px'}
        bg={useColorModeValue('', 'gray.800')}>
        <Container bg='' >
          <Accordion allowMultiple  maxW="100%" bg="blue" rounded="">
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                width={'100%'}
                justifyContent="space-between"
                bg='pink'
                p={4}
                _hover={{ bg: 'gray.100' }}>
                <Text fontSize="md">What is Chakra UI?</Text>
                <ChevronDownIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  Chakra UI is a simple and modular component library that gives
                  developers the building blocks they need to create web
                  applications.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: 'gray.100' }}>
                <Text fontSize="md">What advantages to use?</Text>
                <ChevronDownIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  Chakra UI offers a variety of advantages including ease of use,
                  accessibility, and customization options. It also provides a
                  comprehensive set of UI components and is fully compatible with
                  React.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: 'gray.100' }}>
                <Text fontSize="md">How to start using Chakra UI?</Text>
                <ChevronDownIcon fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  To get started with Chakra UI, you can install it via npm or
                  yarn, and then import the components you need in your project.
                  The Chakra UI documentation is also a great resource for getting
                  started and learning more about the library.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Flex>
    );
  }