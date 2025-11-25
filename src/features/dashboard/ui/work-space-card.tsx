import type { Board, Workspace } from "@/shared/lib/types";
import { Plus, Kanban } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { BoardCard } from "./boad-card";


export function WorkSpaceCard({
    workspace,
    workspaceBoards,
    setIsCreateBoardOpen,
    setSelectedWorkspaceForBoard,
}: {
    children?: React.ReactNode;
    workspace: Workspace;
    workspaceBoards: Board[];
    setIsCreateBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedWorkspaceForBoard: React.Dispatch<
        React.SetStateAction<string | null>
    >;
}) {
    return (
            <div className="space-y-4">
                {/* Workspace Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Link to={`/workspace/${workspace.id}`}>
                            <h3 className="text-xl font-semibold flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Kanban className="w-4 h-4 text-white" />
                                </div>
                                {workspace.name}
                            </h3>
                        </Link>
                        {workspace.description && (
                            <p className="text-sm text-muted-foreground">
                                {workspace.description}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {workspaceBoards.length} board
                            {workspaceBoards.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedWorkspaceForBoard(workspace.id);
                            setIsCreateBoardOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Board
                    </Button>
                </div>

                {/* Boards Grid */}
                {workspaceBoards.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Kanban className="h-8 w-8 text-muted-foreground mb-2" />
                            <h4 className="text-sm font-medium mb-1">
                                No boards in this workspace
                            </h4>
                            <p className="text-xs text-muted-foreground text-center mb-3">
                                Create your first board to start organizing your
                                projects
                            </p>
                            <Button
                                size="sm"
                                onClick={() => {
                                    setSelectedWorkspaceForBoard(workspace.id);
                                    setIsCreateBoardOpen(true);
                                }}
                            >
                                <Plus className="mr-2 h-3 w-3" />
                                Create Board
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {workspaceBoards.map((board) => (
                            <BoardCard key={board.id} board={board} />
                        ))}
                    </div>
                )}
            </div>
    );
}
