// hooks/useUsers.ts

'use client'

import { useState, useEffect } from 'react'
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData: CreateUserRequest): Promise<boolean> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création')
      }

      await fetchUsers()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      return false
    }
  }

  const updateUser = async (userData: UpdateUserRequest): Promise<boolean> => {
    try {
      const response = await fetch(`/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la modification')
      }

      await fetchUsers()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      return false
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la suppression')
      }

      await fetchUsers()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      return false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  }
}