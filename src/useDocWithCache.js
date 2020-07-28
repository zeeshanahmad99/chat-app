import { useState, useEffect } from 'react';
import { db } from './firebase';

const cache = {};
const pendingCache = {};

export default function useDocWithCache(path) {
  const [doc, setDoc] = useState(cache[path]);

  useEffect(() => {
    if (doc) return;

    let stillMounted = true;

    const promise =
      pendingCache[path] || (pendingCache[path] = db.doc(path).get());

    promise.then((snapshot) => {
      if (stillMounted) {
        const user = { ...snapshot.data(), id: snapshot.id };
        setDoc(user);
        cache[path] = user;
      }
    });

    return () => {
      stillMounted = false;
    };
  }, [path, doc]);

  return doc;
}
