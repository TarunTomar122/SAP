import { articleClient } from './index';

export async function getArticles() {
    try {
        const response = await articleClient.get("/get_articles");
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function getArticle(title) {
    try {
        const response = await articleClient.post("/get_article", { title });
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function getBookmarked(title) {
    try {
        const response = await articleClient.post("/get_bookmarked", { title });
        return response.data;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function addBookMark(title) {
    try {
        const response = await articleClient.post("/save_bookmark", { title });
        return true;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}

export async function reduceScore(){
    try {
        const response = await articleClient.get("/reduce_score");
        return true;
    } catch (e) {
        console.error("Error: ", e);
        return false;
    }
}