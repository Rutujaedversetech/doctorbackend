import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Center,
  Avatar,
  Box,
  Button,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  PinInputField,
  HStack,
  PinInput,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement, useEffect, useState } from 'react';
import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getautherblog } from '../../Redux/blogs/action';
import { isExpired, decodeToken } from "react-jwt";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPModal from '../../Dates';
import CountdownTimer from './CountdownTimer';




const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {

  const dispatch = useDispatch();
    const details = useSelector((state)=>state.patient.data)
    const token=localStorage.getItem('token')
    const [timerExpired, setTimerExpired] = useState(false);
    const toast=useToast()
    const navigate=useNavigate()
  
  console.log('details',details);
  const myDecodedToken = decodeToken(token);
  console.log('myDecodedToken',myDecodedToken)
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  useEffect(()=>{
  dispatch(getautherblog())
  },[])
  const currentDate = new Date();

  const handleOtp=async(mobileNo)=>{
    console.log('mobileno',mobileNo);
    
   // setIsOpen(true);

    try {
      const response = await axios.post('http://localhost:8080/blogs/sendotp', {  mobileNo});
      // Handle success (e.g., display a success message)
      console.log(response.data);
      if(response.data=='OTP sent successfully'){
        setIsOpen(true);

        console.log('hello');
      //const otp=  prompt("Please enter your otp", "");
     // console.log('otp',otp);
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error(error);
      toast({
        title: "something went wrong while sending the otp",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      }); 
    }
  }
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [otp, setOtp] = useState("");
  
  const handlePinChange = (value) => {
    setOtp(value);
  };
  const handleTimeout = () => {
    setTimerExpired(true);
    setIsOpen(false);

    // You can handle what happens when the timer expires (e.g., show a message or allow the user to request a new OTP).
  };


  const handleSubmit = async(mobileNo,otp2,id) => {
    console.log("Entered PIN:", mobileNo,otp2,typeof otp2);
    // Add your logic to handle the PIN here
    const otp=parseInt(otp2)
    console.log("Entered PIN23:", mobileNo,otp,typeof otp);

    handleCloseModal();

    try {
      const response = await axios.post('http://localhost:8080/blogs/validate-otp', { mobileNo, otp });
      // Handle success (e.g., display a success message)
      console.log(response.data);
      if(response.data=='OTP validated successfully'){
        setTimeout(()=>{
        
          navigate(`/mypatientdocs/${id}`)
           },1000)
         
         
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.log(error.message);
      toast({
        title: "Please enter valid OTP",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });  
    }

  };

  return (
    <Container maxW={'8xl'} py={12} bg='' marginTop={''}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} >
        {/* <a href='http://40.71.182.245:8081/?whiteboardid=myNewWhiteboard' target='_blank'>jbdfjsdbn</a> */}
      <Center py={6}>
      <Box
        maxW={'lg'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={''}            
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {myDecodedToken.name}
            </Heading>
            <Text color={'gray.500'}>{myDecodedToken.email}</Text>
            <Text color={'gray.500'}>{myDecodedToken.isLoggedinTime}</Text>

          </Stack>

<HStack>
<Link to='/oppointment'>
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
Book Appointment
              
          </Button></Link>
          <Button  w={'full'}
            mt={8}
            variant={'blue'}
            bg={useColorModeValue('blue.700', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>Add Your family members</Button>
          
</HStack>
         
        </Box>
      </Box>
    </Center>
        <Flex>
        <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
      <Th>Name</Th>
        <Th>Appointment Date</Th>
        <Th>Appointment Time</Th>

        {/* <Th >Email</Th> */}
        <Th >docs</Th>

        
        <Th>Status</Th>
        <Th>Delete</Th>



      </Tr>
    </Thead>
    {details.map((item)=>{
      const dateString = item.date;
      const dateParts = dateString && dateString.split('-');
      const year =dateParts && parseInt(dateParts[0]);
      const month =dateParts && parseInt(dateParts[1]) - 1; // Month is zero-based
      const day = dateParts&& parseInt(dateParts[2]);
      const dateToCheck = new Date(year, month, day);
            return(
    <Tbody>
      <Tr>
       <Td>{item.name}</Td>
        <Td>{item.date}</Td>
        <Td>{item.time}</Td>
        
        {/* <Td>{item.oemail}</Td> */}
        <Td>
          {
            (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString())  && !item.visited ?(<Text >Not visited</Text>)
            :
           (!item.visited ? item.status ?(<Text backgroundColor={''}>Not Visited</Text>):
            (<Text backgroundColor={''}>pending</Text>)       
               :(
              //  <Link to={`/mypatientdocs/${item._id}`}>
              <Button bg={'gray'} onClick={()=>handleOtp(item.mobileNo)}>Documents</Button>
              /* </Link> */
            ))
            
          }
                        </Td>

<Td  >
          {
          (dateToCheck < currentDate && dateToCheck.toDateString() !== currentDate.toDateString())  && !item.visited ?(<Button backgroundColor={'red'}>Not visited</Button>)
          :
          (!item.visited ?item.status ?(<Button backgroundColor={'#2a9df4'} >confirmed</Button>):
          //  :appointmentDate < currentDate ?(<Button backgroundColor={'red'}>Not visited</Button>):
          (<Button backgroundColor={'orange'} >pending</Button>)
          
          :(<Button bg='green'>Visited</Button>))}
          
          </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="sm">
      <ModalOverlay />
      <ModalContent position="" top="0" >
        <ModalHeader textAlign={'center'}>OTP Verification</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
           <VStack spacing={4}>
            {/* <Input
              type="password"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOTPChange}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>  */}
            <HStack>
            <PinInput size="lg" onComplete={handlePinChange}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />

      </PinInput>
</HStack>
<Button onClick={()=>handleSubmit(item.mobileNo,otp,item._id)} colorScheme="blue">Verify & Proceed</Button>
{/* {timerExpired && <Box onClick={()=>handleOtp(item.mobileNo)} cursor={'pointer'}>Time expired. Request a new OTP</Box>} */}
      {!timerExpired && <CountdownTimer initialTime={60} onTimeout={handleTimeout} />}
           </VStack> 
        </ModalBody>
      </ModalContent>
    </Modal>
    </Tbody>
    
    ) })}

  </Table>
</TableContainer>   
        </Flex>
      </SimpleGrid>
     
    </Container>
  );
}







// const dispatch = useDispatch();
//   const details = useSelector((state)=>state.patient.data)
// console.log('details',details);
// useEffect(()=>{
// dispatch(getautherblog())
// },[])
