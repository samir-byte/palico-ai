'use client';

import {
  ConversationContext as ConversationContextType,
  ConversationRequestContent,
  ConversationResponse,
} from '@palico-ai/common';
import React, { useEffect, useState } from 'react';
import { ConversationHistoryItem } from '../app/chat/__components__/chat_history';
import { ConversationalEntity } from '../types/common';
import { newConversation, replyToConversation } from '../services/conversation';

export type ConversationContextParams = {
  loading: boolean;
  history: ConversationHistoryItem[];
  conversationEntity?: ConversationalEntity;
  setConversationalEntity: (entity: ConversationalEntity) => void;
  sendMessage: (
    content: ConversationRequestContent,
    featureFlag: ConversationContextType['featureFlags']
  ) => Promise<void>;
};

export const ConversationContext =
  React.createContext<ConversationContextParams>(
    {} as ConversationContextParams
  );

export interface ConversationContextProviderProps {
  children: React.ReactNode;
  conversationEntity?: ConversationalEntity;
}

export const ConversationContextProvider: React.FC<
  ConversationContextProviderProps
> = ({ children, conversationEntity: initialConversationalEntity }) => {
  const [loading, setLoading] = React.useState(false);
  const [conversationEntity, setConversationEntity] = useState<
    ConversationalEntity | undefined
  >(initialConversationalEntity);
  const [history, setHistory] = React.useState<ConversationHistoryItem[]>([]);
  const [conversationId, setConversationId] = useState<string>();

  useEffect(() => {
    setHistory([]);
    setConversationId(undefined);
  }, [conversationEntity]);

  const agentResponseToHistoryItem = (
    response: ConversationResponse
  ): ConversationHistoryItem => {
    if (!response.message) {
      throw new Error('Message is required -- we only support conversations');
    }
    return {
      role: response.message ? 'assistant' : 'tool',
      message: response.message,
    };
  };

  const sendMessage = async (
    content: ConversationRequestContent,
    featureFlag: ConversationContextType['featureFlags']
  ): Promise<void> => {
    // TODO: This this as an input
    if (!conversationEntity) {
      throw new Error('AgentID not set');
    }
    setLoading(true);
    setHistory([
      ...history,
      {
        role: 'user',
        message: content.userMessage ?? '',
      },
    ]);
    try {
      let response: ConversationResponse;
      if (conversationId) {
        response = await replyToConversation(conversationEntity, {
          conversationId,
          userMessage: content.userMessage,
          payload: content.payload,
          featureFlags: featureFlag,
        });
      } else {
        response = await newConversation(conversationEntity, {
          userMessage: content.userMessage,
          payload: content.payload,
          featureFlags: featureFlag,
        });
        setConversationId(response.conversationId);
      }
      setHistory((current) => [
        ...current,
        agentResponseToHistoryItem(response),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        loading,
        history,
        sendMessage,
        conversationEntity: conversationEntity,
        setConversationalEntity: setConversationEntity,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
