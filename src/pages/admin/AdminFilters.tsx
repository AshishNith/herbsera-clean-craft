import { useEffect, useState } from 'react';
import {
  getAllFiltersAdmin,
  createFilter,
  updateFilter,
  deleteFilter,
  FilterItem,
} from '@/services/filterService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sliders, Plus, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminFilters() {
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    searchQuery: '',
    isActive: true,
    sortOrder: 0,
  });

  const { toast } = useToast();

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    try {
      setLoading(true);
      const response = await getAllFiltersAdmin();
      setFilters(response.data);
    } catch (error) {
      console.error('Error loading filters:', error);
      toast({
        title: 'Error',
        description: 'Failed to load filters',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      searchQuery: '',
      isActive: true,
      sortOrder: filters.length + 1,
    });
    setIsEditMode(false);
    setSelectedFilter(null);
    setIsOpen(true);
  };

  const handleOpenEditModal = (filter: FilterItem) => {
    setFormData({
      name: filter.name,
      searchQuery: filter.searchQuery,
      isActive: filter.isActive,
      sortOrder: filter.sortOrder,
    });
    setIsEditMode(true);
    setSelectedFilter(filter);
    setIsOpen(true);
  };

  const handleToggleStatus = async (filter: FilterItem) => {
    try {
      const updatedStatus = !filter.isActive;
      await updateFilter(filter._id, { isActive: updatedStatus });
      toast({
        title: 'Success',
        description: `${filter.name} status updated successfully`,
      });
      loadFilters();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update filter status',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFilter = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete filter "${name}"?`)) {
      return;
    }
    
    try {
      await deleteFilter(id);
      toast({
        title: 'Success',
        description: `Filter "${name}" deleted successfully`,
      });
      loadFilters();
    } catch (error) {
      console.error('Error deleting filter:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete filter',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.searchQuery.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name and search query are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isEditMode && selectedFilter) {
        await updateFilter(selectedFilter._id, formData);
        toast({
          title: 'Success',
          description: 'Filter updated successfully',
        });
      } else {
        await createFilter(formData);
        toast({
          title: 'Success',
          description: 'New filter added successfully',
        });
      }
      setIsOpen(false);
      loadFilters();
    } catch (error) {
      console.error('Error saving filter:', error);
      toast({
        title: 'Error',
        description: 'Failed to save filter',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Page Filters</h2>
          <p className="text-sm text-muted-foreground">
            Manage custom keyword filters and categories displayed on the main shop page.
          </p>
        </div>
        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
          <Plus size={16} /> Add New Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders size={20} className="text-primary" /> Active & Custom Filters
          </CardTitle>
          <CardDescription>
            These custom filters allow users to browse products matching dynamic search terms (e.g., "neem", "charcoal").
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : filters.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50/50">
              <p className="text-gray-500">No dynamic filters configured.</p>
              <Button onClick={handleOpenAddModal} variant="outline" className="mt-4">
                Create First Filter
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Filter Name</TableHead>
                  <TableHead className="w-1/4">Search Term / Query</TableHead>
                  <TableHead className="w-1/6">Sort Order</TableHead>
                  <TableHead className="w-1/6">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filters.map((filter) => (
                  <TableRow key={filter._id}>
                    <TableCell className="font-semibold">{filter.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {filter.searchQuery || 'None'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{filter.sortOrder}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={filter.isActive}
                          onCheckedChange={() => handleToggleStatus(filter)}
                        />
                        <span className="text-xs text-gray-500">
                          {filter.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                        onClick={() => handleOpenEditModal(filter)}
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                        onClick={() => handleDeleteFilter(filter._id, filter.name)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Filter' : 'Add New Filter'}</DialogTitle>
              <DialogDescription>
                Configure the label and the backend search query that this filter maps to.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Lavender Infused"
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="searchQuery" className="text-right">
                  Query Term
                </Label>
                <Input
                  id="searchQuery"
                  value={formData.searchQuery}
                  onChange={(e) => setFormData({ ...formData, searchQuery: e.target.value })}
                  placeholder="e.g. lavender"
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sortOrder" className="text-right">
                  Sort Order
                </Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 1"
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Save Changes' : 'Create Filter'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
