import type { NextConfig } from "next";

import * as path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  turbopack: {
        root: path.join(__dirname, '') // package.json is on the same level as next config
    }
};

export default nextConfig;
