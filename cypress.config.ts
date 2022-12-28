import { defineConfig } from "cypress";
import { environment } from "src/environments/environment";

export default defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,

  e2e: {
    env: {
      apiUrl: `${environment.API_URL}`
    },
    specPattern: "**/*.cy.ts",
  },
});
