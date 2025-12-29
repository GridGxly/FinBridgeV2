import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccountPath = path.join(__dirname, "../service-account.json");

let app;

if (!admin.apps.length) {
    try {
        if (fs.existsSync(serviceAccountPath)) {
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));


            const projectId = serviceAccount.project_id;
            const storageBucket = `${projectId}.firebasestorage.app`;

            app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: storageBucket
            });
            console.log(`Firebase initialized successfully. Storage Bucket: ${storageBucket}`);
        } else {
            console.error("CRITICAL: service-account.json not found at:", serviceAccountPath);
        }
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
} else {
    app = admin.app();
}

export const db = getFirestore(app);
export const bucket = getStorage(app).bucket(); 
