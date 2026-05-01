"use client";

import { useState, useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestore<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const result: any[] = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setData(result);
        setLoading(false);
      }, (err) => {
        console.error("Firestore Error:", err);
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err: any) {
      console.error("Firestore Setup Error:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [collectionName]);

  const addItem = async (item: any) => {
    await addDoc(collection(db, collectionName), {
      ...item,
      createdAt: new Date(),
    });
  };

  const updateItem = async (id: string, item: any) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...item,
      updatedAt: new Date(),
    });
  };

  const removeItem = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  };

  return { data, loading, error, addItem, updateItem, removeItem };
}
