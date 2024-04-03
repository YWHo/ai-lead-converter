import { createRouteHandler } from "uploadthing/next";

import { uploadThingFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadThingFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
