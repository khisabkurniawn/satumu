"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings2Icon } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  id: string;
  organisasi: string;
  organisasi_shortname: string | null;
  organisasi_logourl: string | null;
  profil: number;
  anggota: number;
  operator: number;
}

export default function DataTable({ rows }: { rows: IRow[] }) {
  const [rowData] = useState(rows);

  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      headerName: "Organisasi",
      field: "organisasi",
      autoHeight: true,
      filter: true,
      cellRenderer: (params: { data: IRow }) => {
        const { data } = params;
        if (!data) return null;

        return (
          <div className="flex flex-row gap-4 py-2">
            <div className="border p-1 rounded my-auto">
              <Avatar>
                <AvatarImage
                  src={data.organisasi_logourl ?? undefined}
                  alt={data.organisasi}
                />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col leading-normal">
              <span className="font-medium">{data.organisasi}</span>
              <span className="font-light text-muted-foreground">
                {data.organisasi_shortname}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Profil organisasi",
      field: "profil",
      maxWidth: 300,
      filter: true,
      cellRenderer: ({ value }: { value: number }) => {
        return (
          <div className="flex items-center w-full h-full gap-2">
            <Progress value={value} className="w-full" />
            <span className="text-sm font-medium">{value}%</span>
          </div>
        );
      },
    },
    {
      headerName: "Anggota",
      field: "anggota",
      maxWidth: 125,
      filter: true,
      cellRenderer: ({ value }: { value: number }) => {
        return (
          <div className="h-full flex items-center justify-end">{value}</div>
        );
      },
    },
    {
      headerName: "Operator",
      field: "operator",
      maxWidth: 125,
      filter: true,
      cellRenderer: ({ value }: { value: number }) => {
        return (
          <div className="h-full flex items-center justify-end">{value}</div>
        );
      },
    },
    {
      headerName: "",
      field: "id",
      maxWidth: 75,
      cellRenderer: ({ value }: { value: string }) => {
        return (
          <div className="flex items-center w-full h-full justify-end">
            <Link href={`/organisasi/${value}`}>
              <div className="rounded p-2 hover:bg-gray-200 hover:cursor-pointer">
                <Settings2Icon className="w-4 h-4" />
              </div>
            </Link>
          </div>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return { flex: 1 };
  }, []);

  return (
    <AgGridReact
      domLayout="autoHeight"
      rowData={rowData}
      columnDefs={colDefs}
      defaultColDef={defaultColDef}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[10, 20, 50]}
    />
  );
}
