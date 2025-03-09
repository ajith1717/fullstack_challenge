const authService = {
    login: async (email, password) => {
        // Mock API call
        if (email === 'admin@example.com' && password === 'password') {
            return { success: true, user: { name: 'Admin', email, role: 'admin' } };
        }
        return { success: false, message: 'Invalid credentials' };
    },
    register: async (name, email, password) => {
        // Mock API call
        return { success: true };
    }
};

export default authService;