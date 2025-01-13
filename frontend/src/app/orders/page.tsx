'use client'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import client from '../../lib/apolloClient';
import { CREATE_ORDER } from '../../lib/graphql/mutations';

export default function Orders() {
  const [formData, setFormData] = useState({
    client: '',
    shoeRef: '',
    size: '',
    shippingInfo: '',
  });
  const [createOrder] = useMutation(CREATE_ORDER, { client });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({ variables: { ...formData, size: parseInt(formData.size) } });
      alert('Order created successfully!');
      setFormData({ client: '', shoeRef: '', size: '', shippingInfo: '' });
    } catch (error: any) {
      alert(`Error creating order: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Place an Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Client Name"
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Shoe ID"
          value={formData.shoeRef}
          onChange={(e) => setFormData({ ...formData, shoeRef: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Size"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Shipping Info"
          value={formData.shippingInfo}
          onChange={(e) => setFormData({ ...formData, shippingInfo: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}