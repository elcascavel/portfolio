declare module "*.mdx" {
  import * as React from "react";
  const MDXComponent: React.FC & {
    metadata?: import("./types/common").ProjectMetadata;
  };
  export default MDXComponent;
}
