// components/Footer.tsx
import RightIcon from "../../Svg/RightIcon";
import Search2 from "../Search2/search2";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, Link } from "@chakra-ui/react";
import Styles from "./Footer.module.css";
import QRCodePage from "../../QRCodePage/qr-code";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import { useResize } from "../../../Hooks/useResize";

const Footer = () => {
  const user = useSelector((state: RootState) => state.user);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  let { isMobile } = useResize();
  useEffect(() => {
    const token = localStorage.getItem('user_info');
    setAccessToken(token);
  }, [user]);

  return (
    <div>
    {!isMobile &&
    <Box bg="#043CAA" color="white" py={10} className={Styles.Footerbox}>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="center" mb={10}>
          <Box textAlign={{ base: "center", lg: "left" }} mb={{ base: 6, lg: 0 }}>
            <Heading as="h2" size="lg" mb={2}>Sign up for our Newsletter</Heading>
            <Text fontSize="sm">Get to know updates in the field of medicine and know how often our stores are stocked</Text>
          </Box>
          {/* Şartlı render işlemi: accessToken varsa Search2 bileşeni gösterilecek */}
          {!accessToken && (
            <Box
              width="200px" 
              height="200px" 
              marginLeft="auto" 
              marginRight="500px"
            >
              <Search2 />
            </Box>
          )}
        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="start" mb={10}>
          <Box textAlign={{ base: "center", lg: "left" }} mb={{ base: 6, lg: 0 }}>
            <Heading as="h2" size="lg" mb={2}>Doctor-Tibet</Heading>
            <Text fontSize="sm">Your favourite online pharmacy store. We offer onsite delivery and your health is our priority</Text>
          </Box>
          <Stack direction={{ base: "column", lg: "row" }} spacing={10}>
            <Box>
              <Heading as="h3" size="md" mb={2}>Quick links</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Contact us</Link>
                <Link href="#" fontSize="sm">About Us</Link>
                <Link href="#" fontSize="sm">Careers</Link>
              </Stack>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>Services</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Delivery</Link>
                <Link href="#" fontSize="sm">Purchase</Link>
                <Link href="#" fontSize="sm">Consult Specialist</Link>
              </Stack>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>Social Media</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Facebook</Link>
                <Link href="#" fontSize="sm">Twitter</Link>
                <Link href="#" fontSize="sm">LinkedIn</Link>
              </Stack>
            </Box>
          </Stack>
          <QRCodePage />
        </Flex>
        <Text textAlign="center" fontSize="sm">
          Designed by sophisticateddev. copyright©
        </Text>
      </Container>
    </Box>
     }


     

{isMobile &&
    <Box bg="#043CAA" color="white" py={10} className={Styles.Footerbox}>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="center" mb={10}>
          <Box textAlign={{ base: "center", lg: "left" }} mb={{ base: 6, lg: 0 }}>
            <Heading as="h2" size="lg" mb={2}>Sağlam gələcək üçün qeydiyyatdan keçin.</Heading>
            <Text fontSize="sm">Tibb sahəsindəki yeniliklərlə tanış olun və doctor tibet qəbuluna daha tez sira alın.</Text>
          </Box>
          {/* Şartlı render işlemi: accessToken varsa Search2 bileşeni gösterilecek */}
          {!accessToken && (
            <Box
              width="200px" 
              height="200px" 
              marginLeft="auto" 
              marginRight="500px"
            >
              <Search2 />
            </Box>
          )}
        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="start" mb={10}>
          <Box textAlign={{ base: "center", lg: "left" }} mb={{ base: 6, lg: 0 }}>
            <Heading as="h2" size="lg" mb={2}>Doctor-Tibet</Heading>
            <Text fontSize="sm">Your favourite online pharmacy store. We offer onsite delivery and your health is our priority</Text>
          </Box>
          <Stack direction={{ base: "column", lg: "row" }} spacing={10}>
            <Box>
              <Heading as="h3" size="md" mb={2}>Quick links</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Contact us</Link>
                <Link href="#" fontSize="sm">About Us</Link>
                <Link href="#" fontSize="sm">Careers</Link>
              </Stack>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>Services</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Delivery</Link>
                <Link href="#" fontSize="sm">Purchase</Link>
                <Link href="#" fontSize="sm">Consult Specialist</Link>
              </Stack>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={2}>Social Media</Heading>
              <Stack spacing={1}>
                <Link href="#" fontSize="sm">Facebook</Link>
                <Link href="#" fontSize="sm">Twitter</Link>
                <Link href="#" fontSize="sm">LinkedIn</Link>
              </Stack>
            </Box>
          </Stack>
          <QRCodePage />
        </Flex>
        <Text textAlign="center" fontSize="sm">
          Designed by sophisticateddev. copyright©
        </Text>
      </Container>
    </Box>
}
    </div>
  );
};

export default Footer;
