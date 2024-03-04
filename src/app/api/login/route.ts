import axios from "axios";
import { NextResponse } from "next/server";
import { LOGIN } from "../../../../config/endPoints";
import { Login_Post } from "../../../../utilities/apiCall";

async function postData(form: any) {
  try {
    const res = await Login_Post(LOGIN, form);
    return res;
  } catch (e) {}
}

export async function POST(request: Request) {
  const form = await request.json()
  const data = await postData(form);
  return Response.json(data);
}
