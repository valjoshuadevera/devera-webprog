export const readApiResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {
      message: `Request failed with status ${response.status}. Please check the API deployment.`,
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
    };
  }
};

export const createApiError = (data, fallback) => {
  const message =
    typeof data?.message === "string" && data.message.trim()
      ? data.message
      : fallback;

  return new Error(message);
};
