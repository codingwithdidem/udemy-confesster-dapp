import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react";

import getContract from "../utils/getContract";
import { ethers } from "ethers";

const BuyCoffeeModal = ({ isOpen, onClose, author }) => {
  const toast = useToast();

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialRef = useRef();

  const buyCoffee = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        setIsSubmitting(true);

        const contract = getContract();
        const tx = await contract.buyCoffee(author, message, {
          value: ethers.utils.parseEther("0.0001"),
        });

        toast({
          title: "Your coffee is on the way!",
          description: (
            <>
              It may take a few minutes for the transaction to be confirmed.
              <Link
                href={`https://goerli.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                textDecoration={"underline"}
              >
                check the status of your transaction
              </Link>
            </>
          ),
          status: "info",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.log("Error: ", err);
        toast({
          title: "Whoops!",
          description: "Something went wrong. Please try again.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
        setMessage("");
        onClose();
      }
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy me a coffee</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                ref={initialRef}
                size="sm"
                placeholder="Say something nice"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              mr={3}
              isLoading={isSubmitting}
              onClick={buyCoffee}
              loadingText="Submitting"
            >
              Publish
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyCoffeeModal;
