"use server";

import { auth } from "../lib/auth";
import { revalidatePath } from "next/cache";

import revisionService from "../services/revision.service";
import {
  createRevisionSchema,
  CreateRevisionInput,
} from "@/src/zod/revision.schema";

export async function createRevisionAction(
  data: CreateRevisionInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData = createRevisionSchema.parse(data);

  const revision = await revisionService.createRevision(
    validatedData,
    session.user.id
  );

  revalidatePath("/study-tracker/revision");

  return revision;
}

export async function getTodayRevisionsAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return revisionService.getTodayRevisions(
    session.user.id
  );
}

export async function getRevisionByIdAction(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return revisionService.getRevisionById(id);
}

export async function deleteRevisionAction(
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const revision = await revisionService.deleteRevision(id);

  revalidatePath("/study-tracker/revision");

  return revision;
}