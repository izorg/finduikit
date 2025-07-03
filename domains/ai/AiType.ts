export const AiType = {
  "LLMs.txt": "LLMs.txt",
  MCP: "MCP",
};

export type AiType = (typeof AiType)[keyof typeof AiType];
