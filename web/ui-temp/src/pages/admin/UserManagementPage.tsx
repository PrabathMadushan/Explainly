import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Shield,
  Ban,
  CheckCircle2 } from
'lucide-react';
// Mock Data
const initialUsers = [
{
  id: 'u-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'Student',
  status: 'Active',
  lastActive: '2 hours ago',
  joined: 'Jan 15, 2023'
},
{
  id: 'u-2',
  name: 'Sarah Miller',
  email: 'sarah@explainly.com',
  role: 'Admin',
  status: 'Active',
  lastActive: '5 mins ago',
  joined: 'Dec 10, 2022'
},
{
  id: 'u-3',
  name: 'James Wilson',
  email: 'james@explainly.com',
  role: 'Author',
  status: 'Active',
  lastActive: 'Yesterday',
  joined: 'Feb 20, 2023'
},
{
  id: 'u-4',
  name: 'Emily Chen',
  email: 'emily@example.com',
  role: 'Student',
  status: 'Suspended',
  lastActive: '3 days ago',
  joined: 'Mar 05, 2023'
}];

export function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const filteredUsers = users.filter(
    (u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users & Roles</h2>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Invite User
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* User List */}
        <Card className="lg:col-span-2 flex flex-col min-h-0">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Active</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) =>
                <tr
                  key={user.id}
                  className={`hover:bg-muted/50 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedUser(user)}>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {user.name.
                        split(' ').
                        map((n) => n[0]).
                        join('')}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                      variant="outline"
                      className={
                      user.role === 'Admin' ?
                      'border-purple-500 text-purple-500' :
                      user.role === 'Author' ?
                      'border-blue-500 text-blue-500' :
                      ''
                      }>

                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                      variant={
                      user.status === 'Active' ? 'secondary' : 'destructive'
                      }
                      className={
                      user.status === 'Active' ?
                      'bg-green-100 text-green-700 hover:bg-green-100' :
                      ''
                      }>

                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.lastActive}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* User Details Panel */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          {selectedUser ?
          <>
              <CardHeader className="border-b bg-muted/10 py-6 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-medium text-primary mx-auto mb-4">
                  {selectedUser.name.
                split(' ').
                map((n: string) => n[0]).
                join('')}
                </div>
                <CardTitle>{selectedUser.name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
                <div className="flex justify-center gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Mail className="mr-2 h-3 w-3" /> Email
                  </Button>
                  <Button size="sm" variant="outline">
                    Reset Password
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Role & Permissions
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">
                          Administrator
                        </span>
                      </div>
                      <input
                      type="radio"
                      name="role"
                      checked={selectedUser.role === 'Admin'}
                      onChange={() => {}} />

                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Author</span>
                      </div>
                      <input
                      type="radio"
                      name="role"
                      checked={selectedUser.role === 'Author'}
                      onChange={() => {}} />

                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Student</span>
                      </div>
                      <input
                      type="radio"
                      name="role"
                      checked={selectedUser.role === 'Student'}
                      onChange={() => {}} />

                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Account Status
                  </h3>
                  <div className="flex gap-2">
                    {selectedUser.status === 'Active' ?
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {}}>

                        <Ban className="mr-2 h-4 w-4" /> Suspend Account
                      </Button> :

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {}}>

                        <CheckCircle2 className="mr-2 h-4 w-4" /> Reactivate
                        Account
                      </Button>
                  }
                  </div>
                </div>
              </CardContent>
            </> :

          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium">No User Selected</h3>
              <p className="text-sm text-center max-w-xs mt-2">
                Select a user from the list to manage their profile and
                permissions.
              </p>
            </div>
          }
        </Card>
      </div>
    </div>);

}