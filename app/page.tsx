'use client'

import { useState } from 'react'
import { User, CreateUserRequest, UpdateUserRequest } from './types/user'
import { useUsers } from './hooks/useUsers';
import UserForm from './components/UserForm'
import UserList from './components/UserList'

type FormMode = 'create' | 'edit' | null

export default function Home() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const handleCreateUser = async (userData: CreateUserRequest) => {
    setFormLoading(true)
    const success = await createUser(userData)
    setFormLoading(false)
    if (success) {
      setFormMode(null)
    }
  }

  const handleUpdateUser = async (userData: UpdateUserRequest) => {
    setFormLoading(true)
    const success = await updateUser(userData)
    setFormLoading(false)
    if (success) {
      setFormMode(null)
      setSelectedUser(null)
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormMode('edit')
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await deleteUser(id)
    }
  }

  const handleCancel = () => {
    setFormMode(null)
    setSelectedUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600">
            Application CRUD complète avec Next.js, Prisma et PostgreSQL
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {formMode === 'create' ? 'Créer un utilisateur' : 
                 formMode === 'edit' ? 'Modifier l\'utilisateur' : 'Actions'}
              </h2>
              
              {formMode ? (
                <UserForm
                  user={selectedUser || undefined}
                  onSubmit={formMode === 'create' ? handleCreateUser : handleUpdateUser}
                  onCancel={handleCancel}
                  isLoading={formLoading}
                />
              ) : (
                <button
                  onClick={() => setFormMode('create')}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Ajouter un utilisateur
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <UserList
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}