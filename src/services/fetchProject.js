// GET: get project details
export const fetchProject = async (projectId) => {
    try {
        const response = await fetch(`api/Project/${projectId}`); 
        if (!response.ok) {
            throw new Error(`Error fetching project with ID ${projectId}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("fetchProject", data);
        return data;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;  
    }
};
