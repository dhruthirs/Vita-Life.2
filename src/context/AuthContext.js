import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (name, password, isAdminLogin = false) => {
    // Admin login logic
    if (isAdminLogin) {
      if (name === 'admin' && password === 'admin123') {
        setUser({ name: 'Admin User', email: 'admin@bloodbank.com', id: 'admin1', phone: 'admin' });
        setIsAdmin(true);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify({ name: 'Admin User', email: 'admin@bloodbank.com', id: 'admin1', phone: 'admin' }));
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('isAuthenticated', 'true');
        return { success: true };
      }
      return { success: false, message: 'Invalid admin credentials' };
    } else {
      // Donor login - check by name and phone number (password)
      try {
        const response = await fetch('http://localhost:5000/api/donors');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Find donor by name and phone number (phone is password)
          const donor = data.data.find(d => d.name.toLowerCase() === name.toLowerCase() && d.phone === password);
          
          if (donor) {
            const userData = {
              name: donor.name,
              email: `${donor.phone}@donor.com`,
              id: donor._id,
              phone: donor.phone,
              bloodGroup: donor.bloodGroup,
              city: donor.city,
              age: donor.age
            };
            
            setUser(userData);
            setIsAdmin(false);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('isAuthenticated', 'true');
            return { success: true };
          } else {
            return { success: false, message: 'Invalid name or phone number. Please check your credentials or register first.' };
          }
        }
        return { success: false, message: 'Unable to connect to server. Please try again.' };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Server error. Please ensure backend is running.' };
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isAuthenticated');
  };

  const register = async (donorData) => {
    // Register donor via backend API
    try {
      const response = await fetch('http://localhost:5000/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();

      // Some backends may not set `success: true` even when insert succeeds, so treat any
      // OK/Created response with a returned id as success to avoid false negatives.
      const insertedId = data?.data?._id || data?._id || data?.insertedId;
      const apiSuccess = data?.success !== false && (insertedId || response.ok);

      if (apiSuccess) {
        const userData = {
          name: donorData.name,
          email: `${donorData.phone}@donor.com`,
          id: insertedId || donorData._id,
          phone: donorData.phone,
          bloodGroup: donorData.bloodGroup,
          city: donorData.city,
          age: donorData.age
        };

        setUser(userData);
        setIsAdmin(false);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('isAuthenticated', 'true');
        
        return { success: true, message: data?.message || 'Registration successful! You are now logged in.' };
      }

      return { success: false, message: data?.message || 'Registration failed. Please try again.' };
    } catch (error) {
      console.error('Registration error:', error);
      const friendly = error?.message?.includes('fetch') || error?.message?.includes('Failed to fetch')
        ? 'Cannot connect to backend server. Make sure it is running on http://localhost:5000'
        : 'Server error. Please ensure backend is running on port 5000.';
      return { success: false, message: friendly };
    }
  };

  // Load auth state from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedUser && storedIsAuthenticated === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAdmin(storedIsAdmin === 'true');
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
