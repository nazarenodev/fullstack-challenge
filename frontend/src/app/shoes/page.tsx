'use client'
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import client from '../../lib/apolloClient';
import { GET_SHOES } from '../../lib/graphql/queries';
import ShoeCard from '../../components/shoe/ShoeCard';

export default function Shoes() {
  const [brand, setBrand] = useState<string>('');
  const { data, loading, error, refetch } = useQuery(GET_SHOES, {
    client,
    variables: { brand: '' }, // Initially fetch all shoes
  });

  // Refetch data when the brand changes
  useEffect(() => {
    refetch({ brand });
  }, [brand, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Our Shoes</h2>
      <input
        type="text"
        placeholder="Filter by brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.getShoes.map((shoe: any) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}