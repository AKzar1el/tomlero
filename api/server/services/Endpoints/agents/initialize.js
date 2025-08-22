const { logger } = require('@librechat/data-schemas');
const { validateAgentModel } = require('@librechat/api');
const { createContentAggregator } = require('@librechat/agents');
const {
  Constants,
  EModelEndpoint,
  isAgentsEndpoint,
  getResponseSender,
} = require('librechat-data-provider');
const {
  createToolEndCallback,
  getDefaultHandlers,
} = require('~/server/controllers/agents/callbacks');
const { initializeAgent } = require('~/server/services/Endpoints/agents/agent');
const { getModelsConfig } = require('~/server/controllers/ModelController');
const { getCustomEndpointConfig } = require('~/server/services/Config');
const { loadAgentTools } = require('~/server/services/ToolService');
const AgentClient = require('~/server/controllers/agents/client');
const { getAgent } = require('~/models/Agent');
const { logViolation } = require('~/cache');

<<<<<<< HEAD
/**
 * @param {AbortSignal} signal
 */
function createToolLoader(signal) {
=======
function createToolLoader() {
>>>>>>> 294faaa7 (init)
  /**
   * @param {object} params
   * @param {ServerRequest} params.req
   * @param {ServerResponse} params.res
   * @param {string} params.agentId
   * @param {string[]} params.tools
   * @param {string} params.provider
   * @param {string} params.model
   * @param {AgentToolResources} params.tool_resources
<<<<<<< HEAD
   * @returns {Promise<{
   * tools: StructuredTool[],
   * toolContextMap: Record<string, unknown>,
   * userMCPAuthMap?: Record<string, Record<string, string>>
   * } | undefined>}
=======
   * @returns {Promise<{ tools: StructuredTool[], toolContextMap: Record<string, unknown> } | undefined>}
>>>>>>> 294faaa7 (init)
   */
  return async function loadTools({ req, res, agentId, tools, provider, model, tool_resources }) {
    const agent = { id: agentId, tools, provider, model };
    try {
      return await loadAgentTools({
        req,
        res,
        agent,
<<<<<<< HEAD
        signal,
=======
>>>>>>> 294faaa7 (init)
        tool_resources,
      });
    } catch (error) {
      logger.error('Error loading tools for agent ' + agentId, error);
    }
  };
}

<<<<<<< HEAD
const initializeClient = async ({ req, res, signal, endpointOption }) => {
=======
const initializeClient = async ({ req, res, endpointOption }) => {
>>>>>>> 294faaa7 (init)
  if (!endpointOption) {
    throw new Error('Endpoint option not provided');
  }

  // TODO: use endpointOption to determine options/modelOptions
  /** @type {Array<UsageMetadata>} */
  const collectedUsage = [];
  /** @type {ArtifactPromises} */
  const artifactPromises = [];
  const { contentParts, aggregateContent } = createContentAggregator();
  const toolEndCallback = createToolEndCallback({ req, res, artifactPromises });
  const eventHandlers = getDefaultHandlers({
    res,
    aggregateContent,
    toolEndCallback,
    collectedUsage,
  });

  if (!endpointOption.agent) {
    throw new Error('No agent promise provided');
  }

  const primaryAgent = await endpointOption.agent;
  delete endpointOption.agent;
  if (!primaryAgent) {
    throw new Error('Agent not found');
  }

  const modelsConfig = await getModelsConfig(req);
  const validationResult = await validateAgentModel({
    req,
    res,
    modelsConfig,
    logViolation,
    agent: primaryAgent,
  });

  if (!validationResult.isValid) {
    throw new Error(validationResult.error?.message);
  }

  const agentConfigs = new Map();
  /** @type {Set<string>} */
  const allowedProviders = new Set(req?.app?.locals?.[EModelEndpoint.agents]?.allowedProviders);

<<<<<<< HEAD
  const loadTools = createToolLoader(signal);
=======
  const loadTools = createToolLoader();
>>>>>>> 294faaa7 (init)
  /** @type {Array<MongoFile>} */
  const requestFiles = req.body.files ?? [];
  /** @type {string} */
  const conversationId = req.body.conversationId;

  const primaryConfig = await initializeAgent({
    req,
    res,
    loadTools,
    requestFiles,
    conversationId,
    agent: primaryAgent,
    endpointOption,
    allowedProviders,
    isInitialAgent: true,
  });

  const agent_ids = primaryConfig.agent_ids;
<<<<<<< HEAD
  let userMCPAuthMap = primaryConfig.userMCPAuthMap;
=======
>>>>>>> 294faaa7 (init)
  if (agent_ids?.length) {
    for (const agentId of agent_ids) {
      const agent = await getAgent({ id: agentId });
      if (!agent) {
        throw new Error(`Agent ${agentId} not found`);
      }

      const validationResult = await validateAgentModel({
        req,
        res,
        agent,
        modelsConfig,
        logViolation,
      });

      if (!validationResult.isValid) {
        throw new Error(validationResult.error?.message);
      }

      const config = await initializeAgent({
        req,
        res,
        agent,
        loadTools,
        requestFiles,
        conversationId,
        endpointOption,
        allowedProviders,
      });
<<<<<<< HEAD
      Object.assign(userMCPAuthMap, config.userMCPAuthMap ?? {});
=======
>>>>>>> 294faaa7 (init)
      agentConfigs.set(agentId, config);
    }
  }

  let endpointConfig = req.app.locals[primaryConfig.endpoint];
  if (!isAgentsEndpoint(primaryConfig.endpoint) && !endpointConfig) {
    try {
      endpointConfig = await getCustomEndpointConfig(primaryConfig.endpoint);
    } catch (err) {
      logger.error(
        '[api/server/controllers/agents/client.js #titleConvo] Error getting custom endpoint config',
        err,
      );
    }
  }

  const sender =
    primaryAgent.name ??
    getResponseSender({
      ...endpointOption,
      model: endpointOption.model_parameters.model,
      modelDisplayLabel: endpointConfig?.modelDisplayLabel,
      modelLabel: endpointOption.model_parameters.modelLabel,
    });

  const client = new AgentClient({
    req,
    res,
    sender,
    contentParts,
    agentConfigs,
    eventHandlers,
    collectedUsage,
    aggregateContent,
    artifactPromises,
    agent: primaryConfig,
    spec: endpointOption.spec,
    iconURL: endpointOption.iconURL,
    attachments: primaryConfig.attachments,
    endpointType: endpointOption.endpointType,
    resendFiles: primaryConfig.resendFiles ?? true,
    maxContextTokens: primaryConfig.maxContextTokens,
    endpoint:
      primaryConfig.id === Constants.EPHEMERAL_AGENT_ID
        ? primaryConfig.endpoint
        : EModelEndpoint.agents,
  });

<<<<<<< HEAD
  return { client, userMCPAuthMap };
=======
  return { client };
>>>>>>> 294faaa7 (init)
};

module.exports = { initializeClient };
