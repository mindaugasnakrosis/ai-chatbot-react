import ReactDOM from "react-dom/client";
import Chat from "./Chat";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("chatty-wine") as HTMLElement);
root.render(<Chat />);
