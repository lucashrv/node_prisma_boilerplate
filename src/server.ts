import App from "@/app";
import { env } from "@/schemas/zodSchema";

const PORT = env.PORT || 3000;

const app = new App();

app.start(+PORT);
