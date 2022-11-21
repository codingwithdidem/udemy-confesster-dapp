import { useState } from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  Badge,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import { SiBuymeacoffee } from "react-icons/si";

import { useAccount } from "@web3modal/react";
import BuyCoffeeModal from "./BuyCoffeeModal";

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];

const ConfessionCard = ({
  confession: { hash, message, author, category, timestamp },
  index,
}) => {
  const { account } = useAccount();

  const [showBuyCoffeeModal, setShowBuyCoffeeModal] = useState(false);

  const fotmatDate = (blockTimestamp) => {
    const date = new Date(blockTimestamp * 1000);
    return formatRelative(date, new Date());
  };

  return (
    <>
      <Flex
        boxShadow={"lg"}
        maxW={"2xl"}
        direction={{ base: "column-reverse", md: "row" }}
        width={"full"}
        rounded={"xl"}
        p={[6, 10]}
        justifyContent={"space-between"}
        position={"relative"}
        bg={useColorModeValue("white", "gray.800")}
        _before={{
          content: '""',
          position: "absolute",
          zIndex: "-1",
          height: "full",
          maxW: "640px",
          width: "full",
          filter: "blur(40px)",
          transform: "scale(0.98)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          backgroundImage: backgrounds[index % 4],
        }}
      >
        <Flex
          direction={"column"}
          textAlign={"left"}
          justifyContent={"space-between"}
        >
          <chakra.div pb="4">
            <audio controls>
              <source src={`https://ipfs.io/ipfs/${hash}`} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </chakra.div>
          <chakra.p fontWeight={"medium"} fontSize={"17px"} pb={4}>
            {message}
          </chakra.p>
          <chakra.p fontWeight={"bold"} fontSize={14}>
            {author.substring(0, 6)}...{author.substring(author.length - 4)}
            <chakra.span fontWeight={"medium"} color={"gray.500"}>
              {" "}
              - {fotmatDate(timestamp)}
            </chakra.span>
          </chakra.p>

          <Badge colorScheme="yellow" mt={4} width="fit-content">
            {category}
          </Badge>
        </Flex>

        {account.isConnected &&
          account.address.toLowerCase() !== author.toLowerCase() && (
            <Tooltip label="Buy me a coffee" bg="blackAlpha.400" color="white">
              <span>
                <Icon
                  as={SiBuymeacoffee}
                  w={8}
                  h={8}
                  mt={4}
                  cursor="pointer"
                  position="absolute"
                  bottom={5}
                  right={5}
                  _hover={{
                    color: "#6F4E37",
                    transform: "scale(1.1)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => setShowBuyCoffeeModal(true)}
                />
              </span>
            </Tooltip>
          )}
      </Flex>

      <BuyCoffeeModal
        isOpen={showBuyCoffeeModal}
        onClose={() => setShowBuyCoffeeModal(false)}
        author={author}
      />
    </>
  );
};

export default ConfessionCard;
