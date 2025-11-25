import { WorkspaceContext, WorkspaceDisplayContext } from "../shared/context";
import type { SortOption, ViewMode } from "@/features/workspace/shared/types";
import { useParams } from "react-router";
import { useBoardStore } from "@/shared/stores/useBoardStore";
import { useMemo, useState } from "react";

export function WorkspaceContextProvider({ children }: { children: React.ReactNode }) {
    console.log("%cWorkspaceContextProvider rendered", "color: green");
    
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { boards } = useBoardStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("recent");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    // Get boards for this workspace
    const workspaceBoards = boards.filter(
        (board) => board.workspaceId === workspaceId
    );

    // Filter and sort boards
    const filteredAndSortedBoards = useMemo(() => {
        const filtered = workspaceBoards.filter(
            (board) =>
                board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                board.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );

        switch (sortBy) {
            case "az":
                return filtered.sort((a, b) => a.title.localeCompare(b.title));
            case "za":
                return filtered.sort((a, b) => b.title.localeCompare(a.title));
            case "recent":
                return filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            case "oldest":
                return filtered.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
            default:
                return filtered;
        }
    }, [workspaceBoards, searchQuery, sortBy]);

    const state = useMemo(() => ({
        searchQuery,
        sortBy,
        viewMode,
        boards: filteredAndSortedBoards
    }), [searchQuery, sortBy, viewMode, filteredAndSortedBoards]);

    const dispatch = useMemo(() => ({
        setSearchQuery,
        setSortBy,
        setViewMode
    }), []);

    return (
        <WorkspaceContext value={state}>
            <WorkspaceDisplayContext value={dispatch}>
            {children}
            </WorkspaceDisplayContext>
        </WorkspaceContext>
    )
}