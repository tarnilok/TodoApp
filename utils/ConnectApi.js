export const ApiFetcher = async (setTodos) => {
  try {
    const response = await fetch("http://localhost:3000/api/todos");
    const data = await response.json();
    setTodos(data);
  } catch (error) {
    return error.response;
  }
};

export const ApiHandler = async (url, data, method) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
