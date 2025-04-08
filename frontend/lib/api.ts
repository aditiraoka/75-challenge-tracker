export async function fetchTasks(){
    const res = await fetch('http://localhost:5000/api/tasks');
    if(!res.ok){
        throw new Error('Failed to fetch tasks');
    }
    return res.json();
}