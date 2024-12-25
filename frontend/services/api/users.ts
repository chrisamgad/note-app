import axiosInstance from '../../lib/axios';
import axios from 'axios';
import { User } from '../../types';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

// log in user
export async function loginUserApi(credentials: LoginCredentials): Promise<User> {
    try {
        const response = await axiosInstance.post('/users/login', credentials);
        const user = response.data.data.user;
        return user;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'An error occurred during login';
            throw new Error(message);
        } else {
            throw new Error('An unexpected error occurred during login');
        }
    }
}

// register a user
export async function registerUserApi(credentials: RegisterData): Promise<User> {
    try {
        const response = await axiosInstance.post('/users/register', credentials);
        const user = response.data.data.user;
        return user;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'An error occurred during registration';
            throw new Error(message);
        } else {
            throw new Error('An unexpected error occurred during registration');
        }
    }
}

// log out a user
export async function logoutUserApi(): Promise<void> {
    try {
        await axiosInstance.post('/users/logout');
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Failed to log out';
            throw new Error(message);
        } else {
            throw new Error('An unexpected error occurred during logout');
        }
    }
}

// load user profile
export async function loadUserProfileApi(): Promise<User> {
    try {
        const response = await axiosInstance.get('/users/profile');
        const user = response.data.data.user;
        return user;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Failed to load profile';
            throw new Error(message);
        } else {
            throw new Error('An unexpected error occurred while loading the profile');
        }
    }
}