import { useEffect, useRef } from "react";
import { Download, ExternalLink, Eye } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onViewDetails: () => void;
  onOpenWebPage: () => void;
  rowIdentifier?: string;
}

export function ContextMenu({ x, y, onClose, onExportCSV, onExportExcel, onViewDetails, onOpenWebPage, rowIdentifier }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-popover border border-popover-border rounded-lg shadow-lg py-1 z-50 min-w-[180px]"
      style={{ left: x, top: y }}
    >
      <button
        className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
        onClick={() => {
          onViewDetails();
          onClose();
        }}
        data-testid="context-menu-view-details"
      >
        <Eye className="h-4 w-4" />
        View Details
      </button>
      <button
        className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
        onClick={() => {
          onExportCSV();
          onClose();
        }}
        data-testid="context-menu-export-csv"
      >
        <Download className="h-4 w-4" />
        Export as CSV
      </button>
      <button
        className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
        onClick={() => {
          onExportExcel();
          onClose();
        }}
        data-testid="context-menu-export-excel"
      >
        <Download className="h-4 w-4" />
        Export as Excel
      </button>
      <button
        className="w-full text-left px-4 py-2 text-sm hover-elevate flex items-center gap-2"
        onClick={() => {
          onOpenWebPage();
          onClose();
        }}
        data-testid="context-menu-open-webpage"
      >
        <ExternalLink className="h-4 w-4" />
        Open Web Page
      </button>
    </div>
  );
}
