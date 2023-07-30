import React, { useEffect, useRef, useState } from 'react';

function useFetch<T = any | undefined>(method : string, url: string, body ?: string): T | undefined {

  const [records, setRecords] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch(url, {
      method,
      next: {revalidate: 20},
      body
      })).json();
      
      setRecords(data);
    };

    fetchData();
  },[]);

  return records;
}

export default useFetch;