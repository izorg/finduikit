declare module "emoji-toolkit" {
  const emoji: {
    shortnameToUnicode: (input: string) => string;
  };

  export = emoji;
}
