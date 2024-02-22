"use client";
import { ColumnDef } from "@tanstack/react-table";
import { HighScores } from "@/constants/data";

export const columns: ColumnDef<HighScores>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "typingSpeed",
    header: "Typing Speed (wpm)",
  },
  {
    accessorKey: "characters",
    header: "Characters (cpm)",
  },
  {
    accessorKey: "position",
    header: "Position",
  }
];