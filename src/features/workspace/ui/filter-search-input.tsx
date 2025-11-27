import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { useContext } from 'react';
import { WorkspaceDisplayContext } from '../shared/context';

export default function FilterSearchInput() {
    const dispatch = useContext(WorkspaceDisplayContext);

    console.log("%cFilterSearchInput rendered", "color: blue");

    return (
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search boards..."
                onChange={(e) => dispatch({ type: 'setSearchQuery', payload: e.target.value })}
                className="pl-10"
            />
        </div>
    )
}