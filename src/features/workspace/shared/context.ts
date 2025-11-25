import { createContext } from "react";
import type { SortOption, ViewMode } from "./types";
import type { Board } from "@/shared/lib/types";

export type WorkspaceContextType = {
    searchQuery: string;
    sortBy: SortOption;
    viewMode: ViewMode;
    boards: Board[]
};

export type WorkspaceDisplayContextType = {
    setSearchQuery: (query: string) => void;
    setSortBy: (option: SortOption) => void;
    setViewMode: (mode: ViewMode) => void;
};

export const WorkspaceContext = createContext<WorkspaceContextType>({
    searchQuery: '',
    sortBy: 'az',
    viewMode: 'grid',
    boards: [],
})

export const WorkspaceDisplayContext = createContext<WorkspaceDisplayContextType>({
    setSearchQuery: () => {},
    setSortBy: () => {},
    setViewMode: () => {},
})