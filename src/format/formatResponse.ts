export default function formatResponse(
    status: "failed" | "error" | "success",
    message: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any = null
  ) {
    return {
      status,
      message,
      data,
    };
  }