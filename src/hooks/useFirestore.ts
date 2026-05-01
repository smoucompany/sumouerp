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
    try {
      await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: new Date(),
      });
    } catch (err: any) {
      console.error("Error adding document: ", err);
      alert("حدث خطأ أثناء الحفظ: " + err.message);
    }
  };

  const updateItem = async (id: string, item: any) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...item,
        updatedAt: new Date(),
      });
    } catch (err: any) {
      console.error("Error updating document: ", err);
      alert("حدث خطأ أثناء التعديل: " + err.message);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err: any) {
      console.error("Error removing document: ", err);
      alert("حدث خطأ أثناء الحذف: " + err.message);
    }
  };

  return { data, loading, error, addItem, updateItem, removeItem };
}
