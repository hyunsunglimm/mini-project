import { QueryClient } from "@tanstack/react-query";
import { categoryMap } from "../pages/HomePage";

export const queryClient = new QueryClient();

const getConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export async function getAccommodations(
  pageParam: number,
  category: string | null
) {
  let url;

  if (!category) {
    url = `${import.meta.env.VITE_API_URL}/api/accommodations`;
  } else {
    const categoryCode = categoryMap[category];
    url = `${
      import.meta.env.VITE_API_URL
    }/api/accommodations/category/${categoryCode}`;
  }

  try {
    const res = await fetch(url + `?page=${pageParam}`);
    const data = await res.json();

    return data.body;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getAccommodation(accommodationId: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/accommodations/${accommodationId}`
    );
    const data = await res.json();

    return data.body;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getCarts() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/carts`,
      getConfig
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getReservation(contentid: string) {
  try {
    const res = await fetch(`/api/reservations/${contentid}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getReservations() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reservations/history`,
      getConfig
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function removeCartItem(contentid: string) {
  try {
    await fetch(`/api/carts/${contentid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error:", err);
  }
}
