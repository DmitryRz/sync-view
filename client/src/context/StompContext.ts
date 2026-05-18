import { createContext, useContext } from "react";
import { Client } from "@stomp/stompjs";

export const StompContext = createContext<Client | null>(null);

export const useStomp = () => useContext(StompContext);