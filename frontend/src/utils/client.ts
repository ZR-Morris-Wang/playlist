import type {
  CreateCardPayload,
  CreateCardResponse,
  CreateListPayload,
  CreateListResponse,
  GetCardsResponse,
  FindCardsByListIdPayload,
  FindListByIdPayload,
  GetListsResponse,
  GetListResponse,
  UpdateCardPayload,
  UpdateCardResponse,
  DeleteCardResponse,
  DeleteListResponse,
  UpdateListPayload,
  UpdateListResponse,
  GetCardResponse,
  FindCardByIdPayload,
} from "@lib/shared_types";
import axios from "axios";

import { env } from "./env";

const client = axios.create({
  baseURL: env.VITE_API_URL,
});

export function getLists() {
  return client.get<GetListsResponse>("/lists");
}

export function getListByListId(id: FindListByIdPayload) {
  return client.get<GetListResponse>(`/lists/${id}`);
}

export function getCard(input: FindCardByIdPayload) {
  return client.get<GetCardResponse>(`/cards/${input}`);
}

export function getCards(input?: FindCardsByListIdPayload) {
  return client.get<GetCardsResponse>("/cards", { params: { input } });
}

export function getCardsByListId(input: FindCardsByListIdPayload) {
  return client.get<GetCardsResponse>("/cards", { params: { input } });
}

export function createList(input: CreateListPayload) {
  return client.post<CreateListResponse>("/lists", input);
}

export function createCard(input: CreateCardPayload) {
  return client.post<CreateCardResponse>("/cards", input);
}

export function updateCard(id: string, input: UpdateCardPayload) {
  return client.put<UpdateCardResponse>(`/cards/${id}`, input);
}

export function updateList(id: string, input: UpdateListPayload) {
  return client.put<UpdateListResponse>(`/lists/${id}`, input);
}

export function deleteCard(id: string) {
  return client.delete<DeleteCardResponse>(`/cards/${id}`);
}

export function deleteList(id: string) {
  return client.delete<DeleteListResponse>(`/lists/${id}`);
}
