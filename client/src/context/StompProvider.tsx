// StompProvider.tsx
import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import keycloak from "@/lib/keycloak.ts";
import { StompContext } from "./StompContext"; // Импортируем созданный контекст

export const StompProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => {
        const domain = import.meta.env.VITE_DOMAIN_NAME || "localhost:8080";
        const protocol = import.meta.env.VITE_PROTOCOL || "http";

        return new SockJS(`${protocol}://${domain}/ws`);
      },
      connectHeaders: {
        Authorization: `Bearer ${keycloak.token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setActiveClient(client);
    };

    client.onDisconnect = () => {
      setActiveClient(null);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  return (
    <StompContext.Provider value={activeClient}>
      {children}
    </StompContext.Provider>
  );
};