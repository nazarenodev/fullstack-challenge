'use client';

import BasicPage from "@/components/template/BasicPage";
import { GET_SHOES } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "@/lib/apolloClient";
import { Shoe } from "@/data/model/Shoe";
import ShoeCard from "@/components/shoe/ShoeCard";

export default function Home() {
  const [brand, setBrand] = useState<string>('');

  const { data, loading, refetch } = useQuery(GET_SHOES, {
    client,
    variables: {brand: ''}
  });

  useEffect(() => {
    refetch({ brand });
  }, [brand, refetch]);

  return (
    <BasicPage>
      {loading ? (
        <div className="flex justify-center items-center m-auto">          
          <p>Loading...</p>
        </div>
      ) : (
      <>
        <h1 className="text-2xl font-bold mb-4">Our Shoes</h1>
        <input
          type="text"
          placeholder="Filter by brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex gap-5">
          {data?.getShoes.map((shoe: Shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>      
      </>
      )}
    </BasicPage>
  )
}
