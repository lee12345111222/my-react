import authService from "../components/api-authorization/AuthorizeService";


export async function fetchCurrentUser() {
    const response = await fetch('api/UserInfo');
    const user = await response.json();
    // console.log("current user:", user);
    return user;  
}

// check if user has appropriate role
// 1 for student, 2 for academic supervisor, 3 for industry partner
export async function checkAuth(role) {
    const isAuthenticated = await authService.isAuthenticated();
    if (isAuthenticated) {
        const user = await fetchCurrentUser();
        return user.roles === role;
    }
}
    
// query other user's data
export async function fetchUserData(userId) {
    const response = await fetch(`api/UserInfo/${userId}`);
    const user = await response.json();
    console.log("fetch user data:", user);
    return user;
}
    