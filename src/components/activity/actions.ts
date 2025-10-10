"use server";

import { revalidateTag } from "next/cache";

export async function revalidateActivityTag(id: number) {
  revalidateTag(`activity:${id}`); 
}
