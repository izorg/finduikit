"use client";

import {
  Box,
  Button,
  type ButtonProps,
  Dialog,
  Flex,
  TextArea,
} from "@radix-ui/themes";
import { captureFeedback } from "@sentry/nextjs";
import { useState } from "react";

export const SupportButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger>
        <Button {...rest}>{children}</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Support request</Dialog.Title>
        <Dialog.Description mb="2" size="2">
          Contact me if you need any support with UI ket selection or have any
          other questions
        </Dialog.Description>
        <Flex asChild direction="column" gap="4">
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);

              const formValues = Object.fromEntries(formData) as {
                message: string;
              };

              captureFeedback(formValues);

              setOpen(false);
            }}
          >
            <Box asChild flexGrow="1">
              <TextArea aria-label="Provide details" name="message" required />
            </Box>
            <Flex gap="4">
              <Dialog.Close>
                <Button color="gray" type="button" variant="soft">
                  Cancel
                </Button>
              </Dialog.Close>
              <Box asChild flexGrow="1">
                <Button type="submit">Send Request</Button>
              </Box>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
