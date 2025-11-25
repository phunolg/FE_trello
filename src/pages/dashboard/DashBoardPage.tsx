import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useBoardStore } from "@/shared/stores/useBoardStore";
import { CreateBoardDialog } from "@/shared/components/CreateBoardDialog";
import { CreateWorkspaceDialog } from "@/shared/components/CreateWorkspaceDialog";
import { WorkSpaceCard } from "@/features/dashboard/ui/work-space-card";
import { EditBoardDialog } from "@/features/dashboard/ui/edit-board-dialog";
import {
    SetIsEditDialogOpenContext,
    SelectedBoardIdContext,
} from "@/features/dashboard/shared/context";

export default function DashBoardPage() {
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
    const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
    const [selectedWorkspaceForBoard, setSelectedWorkspaceForBoard] = useState<
        string | null
    >(null);
    const { boards, workspaces } = useBoardStore();

    // Get all workspaces as array
    const allWorkspaces = Object.values(workspaces);

    const selectedBoardId = useContext(SelectedBoardIdContext);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Get boards for each workspace
    const getWorkspaceBoards = (workspaceId: string) =>
        boards.filter((board) => board.workspaceId === workspaceId);

    const selectedBoard =
        boards.find((board) => board.id === selectedBoardId) || null;

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your workspaces and boards
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Workspace
                    </Button>
                </div>
            </div>

            {allWorkspaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold">
                            No workspaces yet
                        </h3>
                        <p className="text-muted-foreground">
                            Create your first workspace to get started
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateWorkspaceOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Workspace
                    </Button>
                </div>
            ) : (
                <div className="space-y-8">
                    <SetIsEditDialogOpenContext value={setIsEditDialogOpen}>
                        {allWorkspaces.map((workspace) => {
                            const workspaceBoards = getWorkspaceBoards(
                                workspace.id
                            );

                            return (
                                <WorkSpaceCard
                                    key={workspace.id}
                                    workspace={workspace}
                                    workspaceBoards={workspaceBoards}
                                    setIsCreateBoardOpen={setIsCreateBoardOpen}
                                    setSelectedWorkspaceForBoard={
                                        setSelectedWorkspaceForBoard
                                    }
                                />
                            );
                        })}
                    </SetIsEditDialogOpenContext>
                </div>
            )}

            <EditBoardDialog board={selectedBoard} open={isEditDialogOpen} onOpenChange={
              (value) => setIsEditDialogOpen(value)
            } />

            <CreateBoardDialog
                open={isCreateBoardOpen}
                onOpenChange={(open) => {
                    setIsCreateBoardOpen(open);
                    if (!open) setSelectedWorkspaceForBoard(null);
                }}
                workspaceId={selectedWorkspaceForBoard}
            />

            <CreateWorkspaceDialog
                open={isCreateWorkspaceOpen}
                onOpenChange={setIsCreateWorkspaceOpen}
            />
        </div>
    );
}
