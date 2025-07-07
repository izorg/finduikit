import { mdiPlus } from "@mdi/js";
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  TextArea,
  Tooltip,
} from "@radix-ui/themes";
import { captureFeedback } from "@sentry/nextjs";
import { useState } from "react";

import { SvgIcon } from "../../icon";

export const UiKitSuggestIconButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Tooltip content="Suggest a UI kit">
        <Dialog.Trigger>
          <IconButton
            aria-label="Suggest a UI kit"
            radius="full"
            size="4"
            variant="surface"
          >
            <SvgIcon path={mdiPlus} />
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title>Suggest a UI kit</Dialog.Title>
        <Dialog.Description mb="2" size="2">
          Provide details
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
                <Button type="submit">Submit</Button>
              </Box>
            </Flex>
          </form>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
