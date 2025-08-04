

import { useMutation } from '@tanstack/react-query'
import authService from '../services/authService'

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }) => authService.login(email, password),
    })
}



