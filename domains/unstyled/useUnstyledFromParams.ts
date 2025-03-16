"use client";

import { useParams } from "next/navigation";

import { getUnstyledFromParams } from "./getUnstyledFromParams";

export const useUnstyledFromParams = () => getUnstyledFromParams(useParams());
