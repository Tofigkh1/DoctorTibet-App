import React, { useState, useEffect } from "react";
import { Box, Text, Stack,useBreakpointValue  } from "@chakra-ui/react";
import ColorLine from '../../../../public/sectionColorLine.svg';
import Image from "next/image";

const testimonials = [
  {
    text: "27 gün sonra uşaq kalsiumu və sink faydası öz təsirini qardaşım uşağının danışması ilə nəticə göstərdi.",
    author: "Nadilə Əliyeva",
  },
  {
    text: "I couldn't believe how fast and reliable their delivery was. Highly recommended!",
    author: "N",
  },
  {
    text: "Great service, friendly staff, and fast delivery. Couldn't ask for more!",
    author: "Michael Johnson",
  },
  {
    text: "She has the best medicines and the medicines are really effective, I have to thank the doctor for that.",
    author: "Tommy Line",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const marginLeft = useBreakpointValue({ base: '30px', md: '0' }); 
  const textMargin = useBreakpointValue({ base: '45px', md: '0' }); 
  const indicatorMargin = useBreakpointValue({ base: '30px', md: '0' });
  const iconMargin = useBreakpointValue({ base: '165px', md: '0' });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlidingOut(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsSlidingOut(false);
      }, 1000); 
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      width="100%"
      height="480px"
      overflow="hidden"
      p={6}
      backgroundColor="white"
    >
    <Text ml={textMargin} fontSize="xl" fontWeight="bold" mb={4}>
    Müştərilərimizin rəyləri
      </Text>
      <div style={{ marginLeft: iconMargin, marginBottom: '20px' }}>
        <Image src={ColorLine} alt="Icon" width={50} height={0} />
      </div>

      <Box
        className={`testimonial-content ${isSlidingOut ? "slide-out" : "slide-in"} `}
        ml={marginLeft} // Shift left by 30px on mobile only
      >
        <Text  mb={4}>"{testimonials[index].text}"</Text>
        <Text fontWeight="bold" className="text-comitColorText">- {testimonials[index].author}</Text>
      </Box>

      <Stack direction="row" justify="center" mt={4} ml={indicatorMargin}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            h={2}
            w={2}
            bg={i === index ? "green.400" : "gray.400"}
            borderRadius="full"
            className="mt-5"
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Testimonial;
