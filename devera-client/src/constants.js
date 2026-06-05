const rawHost = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;

const isBadDeployHost =
  !rawHost ||
  rawHost.includes("API_URL=") ||
  (isProduction && rawHost.includes("localhost"));

const HOST = isBadDeployHost ? "/api" : rawHost;
 
export default {
  HOST,
};
