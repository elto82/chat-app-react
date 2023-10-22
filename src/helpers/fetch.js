const baseUrl = import.meta.env.VITE_APP_API_URL;

export const fetchSinToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  try {
    if (method === "GET") {
      const res = await fetch(url);
      const result = await res.json();
      return result;
    } else {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchConToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token");
  try {
    if (method === "GET") {
      const res = await fetch(url, {
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    } else {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
