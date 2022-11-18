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
} from "@chakra-ui/react";

const ConfessionModal = ({ isOpen, onClose }) => {
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialRef = useRef();
  const audioRef = useRef();

  const makeConfession = () => {};

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
