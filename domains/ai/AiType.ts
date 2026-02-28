export const AiType = {
  "LLMs.txt": "LLMs.txt",
  MCP: "MCP",
  Skill: "Skill",
};

export type AiType = (typeof AiType)[keyof typeof AiType];
