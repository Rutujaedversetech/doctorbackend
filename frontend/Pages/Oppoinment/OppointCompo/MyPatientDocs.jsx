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
    HStack,
    ListItem,
    List,
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { ReactElement, useEffect } from 'react';
  import { Table, TableCaption, TableContainer, Td, Thead, Tr ,Th,Tbody,Tfoot} from '@chakra-ui/react';
  import { useDispatch, useSelector } from 'react-redux';
  //import { getautherblog } from '../../Redux/blogs/action';
  import { isExpired, decodeToken } from "react-jwt";
  import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, getautherblog, getperticulaPatientDocs } from '../../../Redux/blogs/action';
import { BsDownload } from "react-icons/bs";
import axios from 'axios';

  
  
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
     // const details = useSelector((state)=>state.patient.data)
      const token=localStorage.getItem('token')
      const  data = useSelector((store) => store.patient.data);
      const  data1 = useSelector((store) => store.patient.singleData);

    console.log('details',data,data1);
    const myDecodedToken = decodeToken(token);
    console.log('myDecodedToken',myDecodedToken)
  
    useEffect(()=>{
    //dispatch(getautherblog())
    dispatch(getperticulaPatientDocs(id))
    dispatch(getSingleProduct(id))
    },[])

    const downloadFile = async (id,name) => {
        try {
console.log('name',name);
          const res = await axios.get(
            `http://localhost:8080/application/download/${id}`,
            { responseType: "blob" }
          );
          const blob = new Blob([res.data], { type: res.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${name}.pdf`;
          // link.download = res.headers["content-disposition"].split("filename=")[1];
          link.click();
        } catch (error) {
          console.log(error);
        }
      };

      const { id } = useParams();

        //   useEffect(() => {
        //     dispatch(getperticulaPatientDocs(id))
        //     // dispatch(getSingleProduct(id))
        //   }, []);
    const currentDate = new Date();
  
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
            </Stack>
  
  
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
          </Box>
        </Box>
      </Center>
          <Flex>
          <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                // color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Patient Details
              </Text>
              <HStack>
              {/* {data1.status ?(<Button backgroundColor={'orange'}>Booked</Button>):
              (<Button backgroundColor={'red'}> pending</Button>)} */}

{!data1.visited ?data1.status ?(<Button backgroundColor={'green'}>confirmed</Button>):
          (<Button backgroundColor={'red'}>pending</Button>)
          
          :(<Button bg='orange'>Visited</Button>)}





              </HStack>

              <List spacing={2}>


                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Name:
                  </Text>{' '}
                  {data1.name}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Email:
                  </Text>{' '}
                  {data1.oemail}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Oppointment Date:
                  </Text>{' '}
                  {data1.date}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Oppointment Time:
                  </Text>{' '}
                  {data1.time}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Age:
                  </Text>{' '}
                  {data1.age}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                  Mobile Number
                  </Text>{' '}
                  {data1.mobileNo}
                </ListItem>

               
               </List>
<Stack>
  {data && data.map((item)=>{
    return(
      <HStack>
                    <Button colorScheme='facebook' leftIcon={<BsDownload />} onClick={() => downloadFile(item._id,item.name)}>
    {item.name }
  </Button>
      </HStack>

  

  )
  })}


</Stack>
            </Box>   
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
  