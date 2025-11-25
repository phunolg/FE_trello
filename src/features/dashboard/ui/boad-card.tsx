import type { Board } from "@/shared/lib/types";
import { Link } from "react-router";
import { Kanban, Users, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useBoardStore } from "@/shared/stores/useBoardStore";
import { useContext } from "react";
import { SetIsEditDialogOpenContext } from "../shared/context";

export function BoardCard({
    board,
}: {
    board: Board;
}) {
    const { deleteBoard } = useBoardStore();

    const handleDelete = () => {
        if (
            confirm(
                `Are you sure you want to delete "${board.title}"? This action cannot be undone.`
            )
        ) {
            deleteBoard(board.id);
        }
    };


    const setIsEditDialogOpen = useContext(SetIsEditDialogOpenContext);

    return (
        <>
            <Card className="cursor-pointer hover:shadow-md transition-shadow group relative">
                {/* Board Actions Dropdown */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsEditDialogOpen(true);
                                }}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Board
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash className="w-4 h-4 mr-2" />
                                Delete Board
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Link to={`/board/${board.id}`}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 pr-8">
                            <Kanban className="h-4 w-4" />
                            {board.title}
                        </CardTitle>
                        {board.description && (
                            <CardDescription className="text-sm">
                                {board.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{board.listIds.length} lists</span>
                            <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{board.members.length}</span>
                            </div>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </>
    );
}
