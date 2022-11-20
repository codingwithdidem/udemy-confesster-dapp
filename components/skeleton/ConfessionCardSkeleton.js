import { Box, Stack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const ConfessionCardSkeleton = () => {
  return (
    <Box padding="7" boxShadow="lg" bg="gray.500" rounded="2xl">
      <Stack>
        <SkeletonCircle width={"full"} height={"14"} mb="4" />
        <Skeleton height="20px" width={"100%"} rounded="2xl" />
        <Skeleton height="20px" width={"80%"} rounded="2xl" />
        <Skeleton height="20px" width={"80%"} rounded="2xl" />
        <Skeleton height="20px" width={"30%"} rounded="2xl" />
      </Stack>
    </Box>
  );
};

export default ConfessionCardSkeleton;
