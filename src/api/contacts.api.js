import { get, post } from "../services";

export const getContactList = () => get("contacts/list");

export const getHeadOffice = () => get("contact/cape-town-head-office/slug");

export const sendMessage = message => post("send/message", message);

export const getQueryTypes = () => get("querytypes/all");
