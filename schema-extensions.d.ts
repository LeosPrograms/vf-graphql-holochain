declare const associateMyAgentExtension = "\ntype Mutation  {\n    \"Associates the Agent identified by agentId with the currently authenticated user. Can only be used once.\"\n    associateMyAgent(agentId: ID!): Boolean!\n}\n";
export { associateMyAgentExtension };
