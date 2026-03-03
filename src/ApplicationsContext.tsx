import { createContext, useContext, useEffect, useState } from "react";
import type { Application } from "./types/Application";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

export type NewApplicationData = {
    company: string;
    position: string;
    location: string;
    dateApplied: string;
    status: string;
};

type ApplicationsContextType = {
    applications: Application[];
    loading: boolean;
    handleAddApplication: (data: NewApplicationData) => Promise<void>;
    handleUpdateApplication: (id: string, data: NewApplicationData) => Promise<void>;
    handleDeleteApplication: (id: string) => Promise<void>;
};

const ApplicationsContext = createContext<ApplicationsContextType | null>(null);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setApplications([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        const applicationsRef = collection(db, "jobApplications");
        const q = query(
            applicationsRef,
            where("userId", "==", user.uid),
            orderBy("dateApplied", "desc")
        );
        getDocs(q)
            .then((snapshot) => {
                const list = snapshot.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                })) as Application[];
                setApplications(list);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const handleAddApplication = async (data: NewApplicationData) => {
        if (!user) return;
        const docRef = await addDoc(collection(db, "jobApplications"), {
            userId: user.uid,
            ...data,
        });
        const newApp: Application = {
            id: docRef.id,
            userId: user.uid,
            company: data.company,
            position: data.position,
            location: data.location,
            dateApplied: data.dateApplied,
            status: data.status as Application["status"],
        };
        setApplications((prev) => [newApp, ...prev]);
    };

    const handleUpdateApplication = async (id: string, data: NewApplicationData) => {
        if (!user) return;
        await updateDoc(doc(db, "jobApplications", id), {
            company: data.company,
            position: data.position,
            location: data.location,
            dateApplied: data.dateApplied,
            status: data.status,
        });
        setApplications((prev) =>
            prev.map((app) =>
                app.id === id
                    ? { ...app, ...data, status: data.status as Application["status"] }
                    : app
            )
        );
    };

    const handleDeleteApplication = async (id: string) => {
        await deleteDoc(doc(db, "jobApplications", id));
        setApplications((prev) => prev.filter((app) => app.id !== id));
    };

    const value: ApplicationsContextType = {
        applications,
        loading,
        handleAddApplication,
        handleUpdateApplication,
        handleDeleteApplication,
    };

    return (
        <ApplicationsContext.Provider value={value}>
            {children}
        </ApplicationsContext.Provider>
    );
}

export function useApplications() {
    const ctx = useContext(ApplicationsContext);
    if (!ctx) throw new Error("useApplications must be used within ApplicationsProvider");
    return ctx;
}
