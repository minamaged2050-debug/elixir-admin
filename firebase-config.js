// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// استبدل هذه الإعدادات ببيانات مشروعك من Firebase Console -> Project Settings
export const firebaseConfig = {
  apiKey: "AIzaSyYOUR_PRODUCTION_API_KEY",
  authDomain: "elixir-pharmacies-prod.firebaseapp.com",
  projectId: "elixir-pharmacies-prod",
  storageBucket: "elixir-pharmacies-prod.appspot.com",
  messagingSenderId: "109876543210",
  appId: "1:109876543210:web:9876543210abcdef"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const ElixirService = {
  // الاستماع اللحظي للطلبات
  listenBranchOrders(branchId, callback) {
    const q = query(collection(db, "orders"), where("branchId", "==", branchId));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  },

  // تعديل مجمع للأصناف في Firestore
  async bulkUpdateProducts(productIds, updates) {
    const promises = productIds.map(id => {
      const ref = doc(db, "products", id);
      return updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
    });
    return Promise.all(promises);
  }
};