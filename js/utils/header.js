import { Header } from "../components/Header.js";

const { firstName, lastName, email, image } = JSON.parse(
  localStorage.getItem("curr-user")
);
const headerHTML = Header(firstName + " " + lastName, email, image);

document.body.insertAdjacentHTML("afterbegin", headerHTML);
