import {
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Header,
  Heading,
  Image,
  Text,
} from "@adobe/react-spectrum";
import { useCallback, useEffect, useState } from "react";

import { type UiKit } from "../../getUiKits";

type UiKitDialogProps = {
  uiKits: UiKit[];
};

export const UiKitDialog = (props: UiKitDialogProps) => {
  const { uiKits } = props;

  const [key, setKey] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onHashChange = (event: HashChangeEvent) => {
      const hashKey = new URL(event.newURL).hash.slice(1);

      setKey(new URL(event.newURL).hash.slice(1));
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const onClose = useCallback(() => {
    window.location.hash = "";
  }, []);

  const uiKit = uiKits.find((item) => item.key === key);

  return (
    <DialogContainer isDismissable onDismiss={onClose}>
      {uiKit && (
        <Dialog>
          <Heading>{uiKit.name}</Heading>
          <Divider />
          <Content>
            <Text>{uiKit.description}</Text>
          </Content>
        </Dialog>
      )}
    </DialogContainer>
  );
};
