import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile, updateProfile, addAddress, updateAddress, deleteAddress, User, Address } from '@/services/userService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Loader2, MapPin, Edit, Trash2, Plus, User as UserIcon, Mail, Phone } from 'lucide-react';

const Profile = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    displayName: '',
    phoneNumber: '',
  });

  const [addressForm, setAddressForm] = useState<Address>({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [authUser, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response.data);
      setProfileForm({
        displayName: response.data.displayName || '',
        phoneNumber: response.data.phoneNumber || '',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(profileForm);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
      });
      setEditingProfile(false);
      fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingAddress?._id) {
        await updateAddress(editingAddress._id, addressForm);
        toast({
          title: 'Address Updated',
          description: 'Address has been updated successfully',
        });
      } else {
        await addAddress(addressForm);
        toast({
          title: 'Address Added',
          description: 'New address has been added successfully',
        });
      }
      setIsAddressDialogOpen(false);
      setEditingAddress(null);
      resetAddressForm();
      fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save address',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    try {
      setLoading(true);
      await deleteAddress(addressId);
      toast({
        title: 'Address Deleted',
        description: 'Address has been removed successfully',
      });
      fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete address',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setIsAddressDialogOpen(true);
  };

  const resetAddressForm = () => {
    setAddressForm({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    });
  };

  if (!authUser) return null;

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-serif text-center mt-10 text-4xl font-medium text-charcoal mb-8">My Account</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-cream-dark rounded-lg">
                  <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center">
                    {profile?.photoURL ? (
  <img
    src={profile.photoURL}
    alt="Profile"
    referrerPolicy="no-referrer"
    className="w-full h-full rounded-full object-cover"
  />
) : (
  <UserIcon className="w-8 h-8 text-white" />
)}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{profile?.displayName || 'User'}</h3>
                    <p className="text-sm text-charcoal-light flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {authUser.email}
                    </p>
                  </div>
                </div>

                <Separator />

                {!editingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-charcoal-light">Display Name</Label>
                      <p className="text-lg">{profile?.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <Label className="text-charcoal-light">Phone Number</Label>
                      <p className="text-lg">{profile?.phoneNumber || 'Not set'}</p>
                    </div>
                    <Button onClick={() => setEditingProfile(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profileForm.displayName}
                        onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={profileForm.phoneNumber}
                        onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setEditingProfile(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </div>
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetAddressForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                      <DialogDescription>
                        {editingAddress ? 'Update your address details' : 'Add a new delivery address'}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input
                          id="addressLine1"
                          value={addressForm.addressLine1}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                        <Input
                          id="addressLine2"
                          value={addressForm.addressLine2}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={addressForm.pincode}
                            onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        />
                        <Label htmlFor="isDefault" className="cursor-pointer">Set as default address</Label>
                      </div>
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        {editingAddress ? 'Update Address' : 'Add Address'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {profile?.addresses && profile.addresses.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.addresses.map((address) => (
                      <div key={address._id} className="p-4 border rounded-lg relative">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 text-xs bg-forest text-white px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        <div className="flex items-start gap-3 mb-3">
                          <MapPin className="w-5 h-5 text-forest mt-1" />
                          <div className="flex-1">
                            <h4 className="font-medium">{address.name}</h4>
                            <p className="text-sm text-charcoal-light">{address.phone}</p>
                          </div>
                        </div>
                        <p className="text-sm text-charcoal-light mb-3">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                          <br />
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditAddress(address)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteAddress(address._id!)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-charcoal-light mx-auto mb-3" />
                    <p className="text-charcoal-light mb-4">No saved addresses yet</p>
                    <Button onClick={() => setIsAddressDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
