import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import keycloak from "@/lib/keycloak.ts";

const StompContext = createContext<Client | null>(null);

export const StompProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${keycloak.token}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("STOMP Connected");
      setActiveClient(client);
    };

    client.onDisconnect = () => {
      console.log("STOMP Disconnected");
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

export const useStomp = () => useContext(StompContext);