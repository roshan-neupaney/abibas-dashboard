import axios from "axios";
import { NextResponse } from "next/server";
import { CRUD_CATEGORY } from "../../../../config/endPoints";
import { FormdataPost } from "../../../../utilities/apiCall";
import { cookies } from "next/headers";

async function postData(form: any) {
  const token = cookies().get('access_token')?.value;
  try {
    const res = await FormdataPost(CRUD_CATEGORY, form, token);
    return res;
  } catch (e) {}
}

export async function POST(request: Request) {
  const form = await request.json()
  const data = await postData(form);
  return Response.json(data);
}
