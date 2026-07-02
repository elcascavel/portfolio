import { metadata as helloWorldMetadata } from "@/app/blog/hello-world/metadata";

export const posts = [helloWorldMetadata].filter((p) => p.published);
