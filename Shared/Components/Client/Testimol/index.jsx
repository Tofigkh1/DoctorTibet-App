import React, { useState, useEffect } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

const testimonials = [
  {
    text: "The ease of delivery is one that I depended on when I was bedridden and couldn’t even walk. Their service is awesome.",
    author: "Gerald Maldiliene",
  },
  {
    text: "I couldn't believe how fast and reliable their delivery was. Highly recommended!",
    author: "Jessica Williams",
  },
  {
    text: "Great service, friendly staff, and fast delivery. Couldn't ask for more!",
    author: "Michael Johnson",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="lg"
      backgroundColor="white"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        What Our Clients Say
      </Text>
      <Box borderBottomWidth="2px" borderColor="blue.500" mb={4}></Box>
      <Text mb={4}>"{testimonials[index].text}"</Text>
      <Text fontWeight="bold">- {testimonials[index].author}</Text>
      <Stack direction="row" mt={4}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            h={2}
            w={2}
            bg={i === index ? "green.400" : "gray.400"}
            borderRadius="full"
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Testimonial;
