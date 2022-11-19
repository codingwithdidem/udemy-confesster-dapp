import React, { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Select,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react";

import saveToIPFS from "../utils/saveToIPFS";
import getContract from "../utils/getContract";

const ConfessionModal = ({ isOpen, onClose }) => {
  const toast = useToast();

  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialRef = useRef();
  const audioRef = useRef();

  const makeConfession = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        setIsSubmitting(true);
        // Save audio to IPFS
        const audioCid = await saveToIPFS(audio);

        const contract = getContract();
        const tx = await contract.createConfession(message, audioCid, category);

        toast({
          title: "Hurrah!",
          description: (
            <>
              <p>It may take a few minutes for your confession to show up.</p>

              <Link
                href={`https://goerli.etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                textDecoration={"underline"}
              >
                check the status of your confession on Etherscan
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
          description: "Something went wrong.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
        onClose();
      }
    }
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make your confession!</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <Input
                type="file"
                ref={audioRef}
                accept="audio/*"
                onChange={(e) => setAudio(e.target.files[0])}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confession</FormLabel>
              <Textarea
                ref={initialRef}
                value={message}
                placeholder="I have to confess that..."
                size="sm"
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="love">Love</option>
                <option value="hate">Hate</option>
                <option value="happiness">Happiness</option>
                <option value="sadness">Sadness</option>
                <option value="anger">Anger</option>
                <option value="fear">Fear</option>
                <option value="explicit">Explicit</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              mr={3}
              isLoading={isSubmitting}
              onClick={makeConfession}
              loadingText="Publishing"
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

export default ConfessionModal;
