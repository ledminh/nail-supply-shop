import { SummaryType } from "../../types";
import clientPromise from "./mongodb";



async function getDatabase(dbName:string) {
    const client = await clientPromise;
    return client.db(dbName);
}


async function getCollection(dbName:string, collectionName:string) {
    const db = await getDatabase(dbName);
    return db.collection(collectionName);
}   

export async function getPlans(userId:string):Promise<SummaryType[]> {
    const plansCollection = await getCollection("coffee_roaster", "user_plans");

    if(!plansCollection) {
        return [];
    }

    const plans = await plansCollection.findOne({userId});

    if(!plans) {
        return [];
    }



    return plans.plans as SummaryType[];

}
