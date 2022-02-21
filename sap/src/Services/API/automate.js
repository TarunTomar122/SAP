import { autoClient } from './index';

export async function getProjects() {
    try {
        const response = await autoClient.get("/");
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function getFolder(folderName) {
    try {
        const response = await autoClient.post("/getFolder", { folderName });
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function getFileContent(fileName) {
    try {
        const response = await autoClient.post("/getFileContent", { fileName });
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function startSetup(prefix) {
    try {
        const response = await autoClient.post("/startSetup", { prefix });
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

