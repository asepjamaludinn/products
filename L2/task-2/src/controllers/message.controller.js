import * as messageService from "../services/message.service.js";

export const getConversations = async (req, res) => {
  const conversations = await messageService.getUserConversations(req.user.id);
  res.status(200).json({ success: true, data: conversations });
};

export const startDirectConversation = async (req, res) => {
  const conversation = await messageService.getOrCreateDirectConversation(
    req.user.id,
    req.body.userId,
  );
  res.status(200).json({ success: true, data: conversation });
};

export const startSupportConversation = async (req, res) => {
  const conversation = await messageService.getOrCreateSupportConversation(
    req.user.id,
  );
  res.status(200).json({ success: true, data: conversation });
};

export const getMessages = async (req, res) => {
  const messages = await messageService.getMessages(
    req.user.id,
    Number(req.params.conversationId),
    req.query,
  );
  res.status(200).json({ success: true, data: messages });
};
