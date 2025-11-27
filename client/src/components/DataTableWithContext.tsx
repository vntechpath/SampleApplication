import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { ContextMenu } from "./ContextMenu";
import { exportToCSV } from "@/lib/csvExport";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableWithContextProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  onExportRow?: (row: T, format: 'csv' | 'excel') => void;
  onViewDetails?: (row: T) => void;
  onOpenWebPage?: (row: T) => void;
  hasError?: boolean;
}

export function DataTableWithContext<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  onExportRow,
  onViewDetails,
  onOpenWebPage,
  hasError = false,
}: DataTableWithContextProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; row: T } | null>(null);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleContextMenu = (e: React.MouseEvent, row: T) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, row });
  };

  const renderEmptyState = () => {
    if (hasError) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 opacity-50 flex items-center justify-center">
              <Filter className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Search Failed</h3>
            <p className="text-sm text-muted-foreground">Unable to search for the SKU. Please check your input and try again.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 opacity-50 flex items-center justify-center">
            <Filter className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No Data Found</h3>
          <p className="text-sm text-muted-foreground">No records match your search criteria. Please try a different search.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead key={column.key} className="font-semibold">
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="hover-elevate rounded p-1"
                        data-testid={`button-sort-${column.key}`}
                      >
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronDown className="h-4 w-4 opacity-30" />
                        )}
                      </button>
                    )}
                    {column.filterable && (
                      <button className="hover-elevate rounded p-1" data-testid={`button-filter-${column.key}`}>
                        <Filter className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {renderEmptyState()}
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover-elevate"
                  onClick={() => onRowClick?.(row)}
                  onContextMenu={(e) => handleContextMenu(e, row)}
                  data-testid={`row-data-${index}`}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="font-mono text-sm">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onExportCSV={() => {
            const identifier = Object.values(contextMenu.row)[0] || 'export';
            exportToCSV(contextMenu.row, `data-${identifier}`);
            setContextMenu(null);
          }}
          onExportExcel={() => {
            console.log('Exporting row to Excel:', contextMenu.row);
            onExportRow?.(contextMenu.row, 'excel');
          }}
          onViewDetails={() => {
            console.log('Viewing details:', contextMenu.row);
            onViewDetails?.(contextMenu.row);
          }}
          onOpenWebPage={() => {
            console.log('Opening web page for:', contextMenu.row);
            onOpenWebPage?.(contextMenu.row);
          }}
        />
      )}
    </div>
  );
}
